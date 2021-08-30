//
//  Todo+CoreDataProperties.swift
//  
//
//  Created by Xiah Lee on 2021/08/27.
//
//

import Foundation
import CoreData


extension Todo {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Todo> {
        return NSFetchRequest<Todo>(entityName: "Todo")
    }

    @NSManaged public var date: String?
    @NSManaged public var id: UUID?
    @NSManaged public var priority: String?
    @NSManaged public var title: String?
    @NSManaged public var checked: Bool

}
