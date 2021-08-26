//
//  TimelineTableViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/26.
//

import UIKit
import TimelineTableViewCell

class TimelineTableViewController: UITableViewController {

    
    let data:[Int: [(TimelinePoint, UIColor, String, String, String?, [String]?, String?)]] = [0:[
            (TimelinePoint(), UIColor.black, "프로젝트 마감1", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", nil, nil, "Sun"),
            (TimelinePoint(), UIColor.black, "프로젝트 마감2", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", nil, nil, "Sun"),
            (TimelinePoint(), UIColor.green, "프로젝트 마감3", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", nil, nil, "Sun")
        ]]

    
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
        // #warning Incomplete implementation, return the number of sections
        return data.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        guard let sectionData = data[section] else {
            return 0
        }
        return sectionData.count
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return "2021.08.26"
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TimelineTableViewCell", for: indexPath) as! TimelineTableViewCell
        
        guard let sectionData = data[indexPath.section] else {
            return cell
        }
        
        let (timelinePoint, timelineBackColor, title, description, lineInfo, thumbnails, illustration) = sectionData[indexPath.row]
        var timelineFrontColor = UIColor.clear
        if (indexPath.row > 0) {
            timelineFrontColor = sectionData[indexPath.row - 1].1
        }
        cell.timelinePoint = timelinePoint
        cell.timeline.frontColor = timelineFrontColor
        cell.timeline.backColor = timelineBackColor
        cell.titleLabel.text = title
        cell.descriptionLabel.text = description
        cell.lineInfoLabel.text = lineInfo
        
        if let thumbnails = thumbnails {
            cell.viewsInStackView = thumbnails.map { thumbnail in
                return UIImageView(image: UIImage(named: thumbnail))
            }
        }
        else {
            cell.viewsInStackView = []
        }

        if let illustration = illustration {
            cell.illustrationImageView.image = UIImage(named: illustration)
        }
        else {
            cell.illustrationImageView.image = nil
        }
        
        
        return cell
    }
}
