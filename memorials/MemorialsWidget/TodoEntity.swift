//
//  TodoEntity.swift
//  Memorials
//
//  Created by Xiah Lee on 2021/08/31.
//

import Foundation
struct TodoEntity : Identifiable {
    var id: UUID
    var date: String
    var priority: String
    var title: String
    var checked: Bool
}
