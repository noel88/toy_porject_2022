//
//  MainViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/19.
//

import UIKit
import FSCalendar

class MainViewController: UIViewController {
    var delegate: DataDelegate?
    var seletedDate: String?
    let dismissModal: Notification.Name = Notification.Name("DismissModal")
    
    @IBOutlet weak var calendar: FSCalendar!
    @IBOutlet weak var tableview: UITableView!
    @IBOutlet weak var calendarHeightConstraint: NSLayoutConstraint!
    @IBOutlet weak var toggleButton: UIBarButtonItem!
    
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
        self.setupCalendar()
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        guard let vc = segue.destination as? TodoViewController else { return }
        vc.selectedDateToString(date: seletedDate ?? Date().description)
    }
    
    func setupCalendar() {
        self.view.addGestureRecognizer(self.scopeGesture)
        self.tableview.panGestureRecognizer.require(toFail: self.scopeGesture)
        self.calendar.scope = .month
        self.calendar.appearance.headerMinimumDissolvedAlpha = 0.0
        self.calendar.locale = Locale(identifier: "ko_KR")
        self.calendar.appearance.caseOptions = .weekdayUsesSingleUpperCase
    }
}

//MARK:- Custom TableView Extension
extension MainViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return Todo.todos.count
    }
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let edit = UIContextualAction(style: .normal, title: "수정") { (UIContextualAction, UIView, success: @escaping (Bool) -> Void) in
              print("수정 Action 확인")
              success(true)
        }
        edit.backgroundColor = .systemPink
              
              
       let delete = UIContextualAction(style: .normal, title: "삭제") { (UIContextualAction, UIView, success: @escaping (Bool) -> Void) in
            print("삭제 Action 확인")
            success(true)
       }
        delete.backgroundColor = .systemTeal
      
      //actions배열 인덱스 0이 왼쪽에 붙어서 나옴
      return UISwipeActionsConfiguration(actions:[edit, delete])
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "\(TodoCell.self)", for: indexPath) as? TodoCell
        else { fatalError("TodoCell을 찾을 수 없습니다.") }
        
        cell.memoDescription.text = Todo.todos[indexPath.row].description
        cell.priority.text = Todo.todos[indexPath.row].priority?.description
        
        return cell
    }
}


//MARK:- Custom FSCalendar Extension
extension MainViewController: FSCalendarDelegate, UIGestureRecognizerDelegate {
    
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
}
