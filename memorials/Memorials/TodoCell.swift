//
//  TodoCell.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit
import SimpleCheckbox

class TodoCell: UITableViewCell {
    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var priority: UILabel!
    @IBOutlet weak var checked: Checkbox!
}
