//
//  Todo.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit

class TodoViewModel {
    var date: String
    var priority: String
    var title: String?

    init(date: String, priority: String, title: String) {
        self.date = date
        self.priority = priority
        self.title = title
    }
}
