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
    var title: String
    var checked: Bool = false

    init(date: String, priority: String, title: String, checked: Bool = false) {
        self.date = date
        self.priority = priority
        self.title = title
        self.checked = checked
    }
}
