//
//  TimelineTableViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit
import TimelineTableViewCell

class TimelineTableViewController: UITableViewController {

    func getTodos() -> Dictionary<String, [Todo]> {
        return Dictionary(grouping: CoreDataManager.shared.getTodos(), by: { $0.date! })
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
        return self.getTodos().keys.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
      
        let descDic = self.getTodos().sorted { $0.key > $1.key }
        guard descDic[section].value.count > 0 else { return 0 }
        
        return descDic[section].value.count
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        let descDic = self.getTodos().sorted { $0.key > $1.key }
        
        if section < descDic[section].key.count {
            return descDic[section].key
        }
        return nil
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TimelineTableViewCell", for: indexPath) as! TimelineTableViewCell

        let descDic = self.getTodos().sorted { $0.key > $1.key }
            
        cell.timelinePoint = TimelinePoint()
        cell.descriptionLabel.text = descDic[indexPath.section].value[indexPath.row].title
        cell.backgroundColor = UIColor.black
        
        if descDic[indexPath.section].value[indexPath.row].checked {
            cell.bubbleColor = .darkGray
            cell.titleLabel.text = "완료"
        } else {
            cell.bubbleColor = .systemYellow
            cell.titleLabel.textColor = .black
            cell.titleLabel.text = "미완료"
        }
        return cell
    }
}


extension Dictionary {
    subscript(row: Int) -> (key: Key, value: Value) {
        get {
            return self[index(startIndex, offsetBy: row)]
        }
    }
}
