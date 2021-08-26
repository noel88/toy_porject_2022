//
//  ViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/19.
//

import UIKit
import FSCalendar


class MainViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UIGestureRecognizerDelegate, FSCalendarDelegate {
    var delegate: DataDelegate?
    var seletedDate: String?
    let dismissModal: Notification.Name = Notification.Name("DismissModal")
    
    
    static var memoList: [Todo] = [
        Todo(date: "2020.08.11", category: "icn_like", priority: 2, description: "프로젝트 마무리 하기1"),
        Todo(date: "2020.08.12", category: "icn_like", priority: 1, description: "프로젝트 마무리 하기2"),
        Todo(date: "2020.08.13", category: "icn_like", priority: 5, description: "프로젝트 마무리 하기3"),
        Todo(date: "2020.08.14", category: "icn_like", priority: 2, description: "프로젝트 마무리 하기4"),
        Todo(date: "2020.08.15", category: "icn_like", priority: 3, description: "프로젝트 마무리 하기5")
    ]
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return MainViewController.memoList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "\(TodoCell.self)", for: indexPath) as? TodoCell
        else { fatalError("Could not create BookCell") }
        
        cell.memoDescription.text = MainViewController.memoList[indexPath.row].description
        cell.priority.text = MainViewController.memoList[indexPath.row].priority?.description
        
        return cell
    }
    
    @IBOutlet weak var toggleButton: UIBarButtonItem!
    @IBAction func toggle(_ sender: Any) {
        if self.calendar.scope == .month {
            self.calendarHeightConstraint.constant = 100.0
            toggleButton.title = "Month"
            self.calendar.setScope(.week, animated: false)
        } else {
            toggleButton.title = "Week"
            self.calendarHeightConstraint.constant = 300.0
            self.calendar.setScope(.month, animated: false)
        }
    }
    
    @IBOutlet weak var calendar: FSCalendar!
    @IBOutlet weak var tableview: UITableView!
    
    @IBOutlet weak var calendarHeightConstraint: NSLayoutConstraint!
    
    fileprivate lazy var dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy.MM.dd"
        return formatter
    }()
    fileprivate lazy var scopeGesture: UIPanGestureRecognizer = {
        [unowned self] in
        let panGesture = UIPanGestureRecognizer(target: self.calendar, action: #selector(self.calendar.handleScopeGesture(_:)))
        panGesture.delegate = self
        panGesture.minimumNumberOfTouches = 1
        panGesture.maximumNumberOfTouches = 2
        return panGesture
    }()
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        NotificationCenter.default.addObserver(self, selector: #selector(self.didDismissPostCommentNotification(_:)), name: dismissModal, object: nil)
    }
    
    @objc func didDismissPostCommentNotification(_ noti: Notification) {
        DispatchQueue.main.async {
            self.tableview.reloadData()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.view.addGestureRecognizer(self.scopeGesture)
        self.tableview.panGestureRecognizer.require(toFail: self.scopeGesture)
        self.calendar.scope = .month
        self.calendar.appearance.headerMinimumDissolvedAlpha = 0.0
        self.calendar.locale = Locale(identifier: "ko_KR")
        self.calendar.appearance.caseOptions = .weekdayUsesSingleUpperCase
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        guard let vc = segue.destination as? MemoViewController else { return }
        vc.selectedDateToString(date: seletedDate ?? Date().description)
    }

    func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        let shouldBegin = self.tableview.contentOffset.y <= -self.tableview.contentInset.top
        if shouldBegin {
            let velocity = self.scopeGesture.velocity(in: self.view)
            switch self.calendar.scope {
            case .month:
                return velocity.y < 0
            case .week:
                return velocity.y > 0
            }
        }
        return shouldBegin
    }
    
    func calendar(_ calendar: FSCalendar, boundingRectWillChange bounds: CGRect, animated: Bool) {
        self.calendarHeightConstraint.constant = bounds.height
        self.view.layoutIfNeeded()
    }
    
    func calendar(_ calendar: FSCalendar, didSelect date: Date, at monthPosition: FSCalendarMonthPosition) {
        print("did select date \(self.dateFormatter.string(from: date))")
        let selectedDates = calendar.selectedDates.map({self.dateFormatter.string(from: $0)})
        print("selected dates is \(selectedDates)")
        
        seletedDate = selectedDates[0]
        
        if monthPosition == .next || monthPosition == .previous {
            calendar.setCurrentPage(date, animated: true)
        }
    }

    func calendarCurrentPageDidChange(_ calendar: FSCalendar) {
        print("\(self.dateFormatter.string(from: calendar.currentPage))")
    }
}
