//
//  ViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/19.
//

import UIKit
import FSCalendar

class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UIGestureRecognizerDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableview.dequeueReusableCell(withIdentifier: "Cell")!
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
        formatter.dateFormat = "yyyy/MM/dd"
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
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.view.addGestureRecognizer(self.scopeGesture)
        self.tableview.panGestureRecognizer.require(toFail: self.scopeGesture)
        self.calendar.scope = .month
        self.calendar.appearance.headerMinimumDissolvedAlpha = 0.0
        self.calendar.locale = Locale(identifier: "ko_KR")
        self.calendar.appearance.caseOptions = .weekdayUsesSingleUpperCase
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
        if monthPosition == .next || monthPosition == .previous {
            calendar.setCurrentPage(date, animated: true)
        }
    }

    func calendarCurrentPageDidChange(_ calendar: FSCalendar) {
        print("\(self.dateFormatter.string(from: calendar.currentPage))")
    }
}
