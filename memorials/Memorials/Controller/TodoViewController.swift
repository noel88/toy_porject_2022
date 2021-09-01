//
//  MemoViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/19.
//

import UIKit
import FacebookLikeReaction

protocol DataDelegate {
    func selectedDateToString(date: String)
}

class TodoViewController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate, UIToolbarDelegate {
    
    let salutations = ["1", "2", "3", "4", "5"]
    let pickerView = UIPickerView()
    var date: String?
    var btnReaction: UIButton!
    var reactionView: ReactionView?
    
    @IBOutlet weak var saveTodoBtn: UIButton!
    @IBOutlet weak var seletedDate: UILabel!
    @IBOutlet weak var priorityField: UITextField!
    @IBOutlet weak var todoField: UITextField!
//    @IBOutlet weak var categoryBtn: UIButton!
    
    @IBAction func save() {
        let newTodo = TodoViewModel(date: seletedDate.text!, priority: priorityField.text!, title: todoField.text!)
        self.saveTodo(todo: newTodo)
        NotificationCenter.default.post(name: Notification.Name("DismissModal"), object: nil, userInfo: nil)
        dismiss(animated: true)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        seletedDate.text = self.date
    }
    
    override func viewDidLoad() {
       super.viewDidLoad()
        
//       reactionView = ReactionView()
//       let reactions: [Reaction] = [Reaction(title: "Laugh", imageName: "icn_laugh"),
//                            Reaction(title: "Like", imageName: "icn_like"),
//                            Reaction(title: "Angry", imageName: "icn_angry"),
//                            Reaction(title: "Love", imageName: "icn_love"),
//                            Reaction(title: "Sad", imageName: "icn_sad")]
//
//        reactionView?.initialize(delegate: self , reactionsArray: reactions, sourceView: self.view, gestureView: categoryBtn)
        
        pickerView.delegate = self
        pickerView.dataSource = self
 
        self.todoField.delegate = self
        priorityField.inputView = pickerView
        
        let toolBar = UIToolbar()
        toolBar.sizeToFit()
        let doneBtn = UIBarButtonItem(title: "Done", style: .plain, target: self, action: #selector(didTapDone))
        let flexibleSpace = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
        toolBar.setItems([flexibleSpace,doneBtn], animated: false)
        priorityField.inputAccessoryView = toolBar
        
        saveTodoBtn.isEnabled = false
        saveTodoBtn.backgroundColor = UIColor(red: 247/255, green: 234/255, blue: 129/255, alpha: 1)
        
        NotificationCenter.default.addObserver(self, selector: #selector(textFieldDidEmpty(_:)), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    @objc func textFieldDidEmpty(_ notification: Notification) {
        if priorityField.text != "" && todoField.text != "" {
            saveTodoBtn.isEnabled = true
            saveTodoBtn.backgroundColor = UIColor(red: 247/255, green: 178/255, blue: 38/255, alpha: 1)
        } else {
            saveTodoBtn.isEnabled = false
            saveTodoBtn.backgroundColor = UIColor(red: 247/255, green: 234/255, blue: 129/255, alpha: 1)
        }
    }

    func saveTodo(todo: TodoViewModel) {
        CoreDataManager.shared.saveTodo(date: todo.date, priority: todo.priority, title: todo.title) { value in
            print("Todo 항목이 저장되었습니다, \(value)")
        }
    }
    
    
    @objc func didTapDone() {
        let row = self.pickerView.selectedRow(inComponent: 0)
        self.pickerView.selectRow(row, inComponent: 0, animated: false)
        self.priorityField.text = self.salutations[row]
        self.priorityField.resignFirstResponder()
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return salutations.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
       return salutations[row]
   }

    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        priorityField.text = salutations[row]
   }

}

extension TodoViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let currentText = textField.text ?? ""
            guard let stringRange = Range(range, in: currentText) else { return false }
         
            let updatedText = currentText.replacingCharacters(in: stringRange, with: string)
         
            return updatedText.count <= 20
    }
}


//extension TodoViewController: FacebookLikeReactionDelegate {
//    func selectedReaction(reaction: Reaction) {
//        let img = UIImage(named: reaction.imageName)
//        categoryBtn.setImage(img, for: .normal)
//    }
//}

extension TodoViewController: DataDelegate {
    func selectedDateToString(date: String) {
        self.date = date
    }
}
