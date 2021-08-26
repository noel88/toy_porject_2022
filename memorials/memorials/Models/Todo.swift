//
//  Todo.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit

class Todo {
    var date: String
    var category: UIImage?
    var priority: Int?
    var description: String?
    
    init(date: String, category: String?, priority: Int?, description: String?) {
        self.date = date
        self.category = UIImage(named: category ?? "icn_angry")
        self.priority = priority
        self.description = description
    }
    
    static var todos: [Todo] = [
        Todo(date: "2020.08.11", category: "icn_like", priority: 2, description: "프로젝트 마무리 하기1"),
        Todo(date: "2020.08.12", category: "icn_like", priority: 1, description: "프로젝트 마무리 하기2"),
        Todo(date: "2020.08.13", category: "icn_like", priority: 5, description: "프로젝트 마무리 하기3"),
        Todo(date: "2020.08.14", category: "icn_like", priority: 2, description: "프로젝트 마무리 하기4"),
        Todo(date: "2020.08.15", category: "icn_like", priority: 3, description: "프로젝트 마무리 하기5")
    ]
    
//    private static func loadTodos() -> [Todo] {
//        let decoder = JSONDecoder()
//
//        guard let booksData = try? Data(contentsOf: booksJSONURL) else {
//          return
//        }
//
//        do {
//          let books = try decoder.decode([Todo].self, from: booksData)
//          return books.map { libraryBook in
//            Book(
//              title: libraryBook.title,
//              author: libraryBook.author,
//              review: libraryBook.review,
//              readMe: libraryBook.readMe,
//              image: loadImage(forBook: libraryBook)
//            )
//          }
//
//        } catch let error {
//          print(error)
//        }
//    }
    
//    static func addTodo(todo: Todo) {
//        todos.insert(todo, at: 0)
//    }
    
}
