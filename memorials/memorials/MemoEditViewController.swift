//
//  MemoEditViewController.swift
//  memorials
//
//  Created by Xiah Lee on 2021/08/19.
//

import UIKit
import FacebookLikeReaction

class MemoEditViewController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate, UIToolbarDelegate {
    
    let salutations = ["1", "2", "3", "4", "5"]
    let pickerView = UIPickerView()
    
    var btnReaction: UIButton!
    var reactionView: ReactionView?
    @IBOutlet weak var priorityField: UITextField!
    @IBOutlet weak var todoField: UITextField!
    @IBOutlet weak var categoryBtn: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        btnReaction = UIButton(frame: CGRect(x: 100, y: 100, width: 200, height: 30))
//        btnReaction.setTitle("Long Press here", for: .normal)
//        btnReaction.setTitleColor(UIColor.red, for: .normal)
//        view.addSubview(btnReaction)
        
       reactionView = ReactionView()
       let reactions: [Reaction] = [Reaction(title: "Laugh", imageName: "icn_laugh"),
                            Reaction(title: "Like", imageName: "icn_like"),
                            Reaction(title: "Angry", imageName: "icn_angry"),
                            Reaction(title: "Love", imageName: "icn_love"),
                            Reaction(title: "Sad", imageName: "icn_sad")]

        reactionView?.initialize(delegate: self , reactionsArray: reactions, sourceView: self.view, gestureView: categoryBtn)
        
        
        
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
        
//        NotificationCenter.default.addObserver(self, selector: #selector(updateStoryPrompt), name: UIResponder.keyboardDidHideNotification, object: nil)
        
    }
    
//    @objc func updateStoryPrompt() {
//        priorityField.text ?? ""
////        adjectiveTextField.text ?? ""
//    }
    
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

extension MemoEditViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}


extension MemoEditViewController: FacebookLikeReactionDelegate {

    func selectedReaction(reaction: Reaction) {
        let img = UIImage(named: reaction.imageName)
        categoryBtn.setImage(img, for: .normal)
    }
    
}
