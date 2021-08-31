//
//  CoreDataStack.swift
//  Memorials
//
//  Created by Xiah Lee on 2021/08/31.
//


import CoreData

class CoreDataStack {
    static let shared = CoreDataStack()

    private init() {}

    private let persistentContainer: NSPersistentContainer = {
        let storeURL = FileManager.appGroupContainerURL.appendingPathComponent("Todo.sqlite")
        let container = NSPersistentContainer(name: "Todo")
        container.persistentStoreDescriptions = [NSPersistentStoreDescription(url: storeURL)]
        container.loadPersistentStores(completionHandler: { storeDescription, error in
            if let error = error as NSError? {
                print(error.localizedDescription)
            }
        })
        return container
    }()
}

// MARK: - Main context

extension CoreDataStack {
    var managedObjectContext: NSManagedObjectContext {
        persistentContainer.viewContext
    }

    func saveContext() {
        managedObjectContext.performAndWait {
            if managedObjectContext.hasChanges {
                do {
                    try managedObjectContext.save()
                } catch {
                    print(error.localizedDescription)
                }
            }
        }
    }
}

// MARK: - Working context

extension CoreDataStack {
    var workingContext: NSManagedObjectContext {
        let context = NSManagedObjectContext(concurrencyType: .privateQueueConcurrencyType)
        context.parent = managedObjectContext
        return context
    }

    func saveWorkingContext(context: NSManagedObjectContext) {
        do {
            try context.save()
            saveContext()
        } catch {
            print(error.localizedDescription)
        }
    }
    
    func getSeletedDateUncheckedTodos() -> [Todo]? {
        var model : [Todo]?
//
//        dataController.persistentContainer.managedObjectModel
//
//        dataController.container.viewContext.refreshAllObjects()
        let fetchRequest = NSFetchRequest<NSFetchRequestResult>(entityName: "Todo")
        let idSort: NSSortDescriptor = NSSortDescriptor(key: "priority", ascending: false)
        fetchRequest.sortDescriptors = [idSort]
        
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy.MM.dd"
        let currentDateToString = formatter.string(from: Date())

        do {
            if let todosArr = try persistentContainer.viewContext.fetch(fetchRequest) as? [Todo] {
                print("TodosArr \(todosArr)")
                model = todosArr.filter( {(todo: Todo) -> Bool in return ( todo.date == currentDateToString && todo.checked == false ) })
            }
        } catch let error as NSError {
                print("Could not fetch🥺: \(error), \(error.userInfo)")
        }
        return model
       
    }
}

/// Taken from: https://stackoverflow.com/a/60266079/8697793
extension NSManagedObjectContext {
    /// Executes the given `NSBatchDeleteRequest` and directly merges the changes to bring the given managed object context up to date.
    ///
    /// - Parameter batchDeleteRequest: The `NSBatchDeleteRequest` to execute.
    /// - Throws: An error if anything went wrong executing the batch deletion.
    public func executeAndMergeChanges(_ batchDeleteRequest: NSBatchDeleteRequest) throws {
        batchDeleteRequest.resultType = .resultTypeObjectIDs
        let result = try execute(batchDeleteRequest) as? NSBatchDeleteResult
        let changes: [AnyHashable: Any] = [NSDeletedObjectsKey: result?.result as? [NSManagedObjectID] ?? []]
        NSManagedObjectContext.mergeChanges(fromRemoteContextSave: changes, into: [self])
    }
}


extension FileManager {
    static let appGroupContainerURL = FileManager.default
        .containerURL(forSecurityApplicationGroupIdentifier: "group.kr.ntoday.memorials")!
}
