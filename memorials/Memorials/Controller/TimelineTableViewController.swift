//
//  TimelineTableViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit
import TimelineTableViewCell

class TimelineTableViewController: UITableViewController {

    func getTodos() -> Dictionary<String?, [Todo]> {
        print("dicionray : \(Dictionary(grouping: CoreDataManager.shared.getTodos(), by: { $0.date }).count)")
        return Dictionary(grouping: CoreDataManager.shared.getTodos(), by: { $0.date })
    }
    
    func removeDuplicateKeys (_ array: [String]) -> [String] {
        var removeDuplicateKeysArray = [String]()
        for i in array {
            if removeDuplicateKeysArray.contains(i) == false {
                removeDuplicateKeysArray.append(i)
            }
        }
        return removeDuplicateKeysArray
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        tableView.reloadData()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let bundle = Bundle(for: TimelineTableViewCell.self)
        let nibUrl = bundle.url(forResource: "TimelineTableViewCell", withExtension: "bundle")
        let timelineTableViewCellNib = UINib(nibName: "TimelineTableViewCell",
            bundle: Bundle(url: nibUrl!)!)
        tableView.register(timelineTableViewCellNib, forCellReuseIdentifier: "TimelineTableViewCell")
    }

    // MARK: - Table view data source
    override func numberOfSections(in tableView: UITableView) -> Int {
        return getTodos().keys.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return getTodos()[section].value.count
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        let header = self.removeDuplicateKeys(getTodos().map{ $0.key! })
        return header[section]
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TimelineTableViewCell", for: indexPath) as! TimelineTableViewCell
        let todo = getTodos()[indexPath.row].value
        
        for i in 0...todo.count - 1 {
            cell.timelinePoint = TimelinePoint()
            cell.timeline.frontColor = .clear
            cell.timeline.backColor = .clear
            cell.descriptionLabel.text = todo[i].value(forKey: "title") as? String
    
            if (todo[i].value(forKey: "checked") as? Bool)! {
                cell.bubbleColor = .brown
                cell.titleLabel.text = "할일 완료"
            } else {
                cell.bubbleColor = .darkGray
                cell.titleLabel.text = "할일 미완료"
            }
        }
        return cell
    }
}


extension Dictionary {
    subscript(row: Int) -> (key: Key, value: Value) {
        get {
            print("i : \(startIndex)")
            return self[index(startIndex, offsetBy: row + 1)]
        }
    }
}
