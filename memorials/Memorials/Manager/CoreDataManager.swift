//
//  CoreDataManager.swift
//  Memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit
import CoreData


class CoreDataManager {
    static let shared: CoreDataManager = CoreDataManager()
    
    let appDelegate: AppDelegate? = UIApplication.shared.delegate as? AppDelegate
    lazy var context = appDelegate?.persistentContainer.viewContext
    
    let modelName: String = "Todo"
        
    func getTodos(ascending: Bool = false) -> [Todo] {
        var models: [Todo] = [Todo]()
        
        if let context = context {
            let idSort: NSSortDescriptor = NSSortDescriptor(key: "id", ascending: ascending)
            let fetchRequest: NSFetchRequest<NSManagedObject>
                = NSFetchRequest<NSManagedObject>(entityName: modelName)
            fetchRequest.sortDescriptors = [idSort]
            
            do {
                if let fetchResult: [Todo] = try context.fetch(fetchRequest) as? [Todo] {
                    models = fetchResult
                }
            } catch let error as NSError {
                print("Could not fetch🥺: \(error), \(error.userInfo)")
            }
        }
        return models
    }
    
    func getSeletedDateTodos(ascending: Bool = false, seletedDate: String) -> [Todo] {
        var models: [Todo] = [Todo]()
        
        if let context = context {
            let idSort: NSSortDescriptor = NSSortDescriptor(key: "priority", ascending: ascending)
            let fetchRequest: NSFetchRequest<NSManagedObject>
                = NSFetchRequest<NSManagedObject>(entityName: modelName)
            fetchRequest.sortDescriptors = [idSort]
            
            do {
                if let fetchResult: [Todo] = try context.fetch(fetchRequest) as? [Todo] {
                    models = fetchResult.filter( {(todo: Todo) -> Bool in return ( todo.date == seletedDate) })
                }
            } catch let error as NSError {
                print("Could not fetch🥺: \(error), \(error.userInfo)")
            }
        }
        return models
    }
    
    func saveTodo(date: String, priority: String, title: String, onSuccess: @escaping ((Bool) -> Void)) {
        if let context = context,
            let entity: NSEntityDescription
            = NSEntityDescription.entity(forEntityName: modelName, in: context) {
            
            if let todo: Todo = NSManagedObject(entity: entity, insertInto: context) as? Todo {
                todo.id = UUID()
                todo.date = date
                todo.priority = priority
                todo.title = title
                todo.checked = false
                
                saveContext { success in
                    onSuccess(success)
                }
            }
        }
    }
    
    func updateTodo(id: UUID, priority: String, title: String, checked: Bool, onSuccess: @escaping ((Bool) -> Void)) {
        let fetchRequest: NSFetchRequest<NSFetchRequestResult> = resultFilterById(id: id)
        
        do {
            if let results: [Todo] = try context?.fetch(fetchRequest) as? [Todo] {
                if results.count != 0 {
                    let objectUpdate = results[0]
                    objectUpdate.setValue(priority, forKey: "priority")
                    objectUpdate.setValue(title, forKey: "title")
                    objectUpdate.setValue(checked, forKey: "checked")
                }
            }
        } catch let error as NSError {
            print("Could not fatch🥺: \(error), \(error.userInfo)")
            onSuccess(false)
        }
        
        saveContext { success in
            onSuccess(success)
        }
    }
    
    func deleteTodo(id: UUID, onSuccess: @escaping ((Bool) -> Void)) {
        let fetchRequest: NSFetchRequest<NSFetchRequestResult> = resultFilterById(id: id)
        
        do {
            if let results: [Todo] = try context?.fetch(fetchRequest) as? [Todo] {
                if results.count != 0 {
                    context?.delete(results[0])
                }
            }
        } catch let error as NSError {
            print("Could not fatch🥺: \(error), \(error.userInfo)")
            onSuccess(false)
        }
        
        saveContext { success in
            onSuccess(success)
        }
    }
}



extension CoreDataManager {
    fileprivate func resultFilterById(id: UUID) -> NSFetchRequest<NSFetchRequestResult> {
        let fetchRequest: NSFetchRequest<NSFetchRequestResult>
            = NSFetchRequest<NSFetchRequestResult>(entityName: modelName)
        fetchRequest.predicate = NSPredicate(format: "id = %@", id as CVarArg)
        return fetchRequest
    }
    
    fileprivate func saveContext(onSuccess: ((Bool) -> Void)) {
        do {
            try context?.save()
            onSuccess(true)
        } catch let error as NSError {
            print("Could not save🥶: \(error), \(error.userInfo)")
            onSuccess(false)
        }
    }
}
