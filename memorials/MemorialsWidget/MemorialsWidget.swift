//
//  MemorialsWidget.swift
//  MemorialsWidget
//
//  Created by Xiah Lee on 2021/08/31.
//

import WidgetKit
import SwiftUI
import CoreData



struct Provider: TimelineProvider {

//    let coreDataManager: CoreDataManager

    init() {
//        coreDataManager = CoreDataManager(dataController)
    }
    
    func placeholder(in context: Context) -> MemorialsEntry {
        let todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
        if todos == nil {
           return MemorialsEntry(todos: nil, todoDataEmptyDescription: "오늘 해야할 Todo가 없습니다.", date: Date())
        } else {
            return MemorialsEntry(todos: todos, todoDataEmptyDescription: nil, date: Date())
        }
    }

    func getSnapshot(in context: Context, completion: @escaping (MemorialsEntry) -> ()) {
        let todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
        let entry: MemorialsEntry!
        
        print("todos \(todos)")
        
        if todos == nil {
            entry = MemorialsEntry(todos: nil, todoDataEmptyDescription: "오늘 해야할 Todo가 없습니다.", date: Date())
        } else {
            entry = MemorialsEntry(todos: todos, todoDataEmptyDescription: nil, date: Date())
        }
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [MemorialsEntry] = []
        let todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
        var entry: MemorialsEntry?
        
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            
            if todos == nil {
                entry = MemorialsEntry(todos: nil, todoDataEmptyDescription: "오늘 해야할 Todo가 없습니다.", date: entryDate)
            } else {
                entry = MemorialsEntry(todos: todos, todoDataEmptyDescription: nil, date: entryDate)
            }
            
//            let entry = MemorialsEntry(todos: nil, todoDataEmptyDescription: "오늘 해야할 Todo가 없습니다.", date: entryDate)
            entries.append(entry!)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct MemorialsEntry: TimelineEntry {
    let todos: [TodoEntity]?
    let todoDataEmptyDescription: String?
    let date: Date
}

struct TodoListCell: View {
    var body: some View {
        HStack {
            Text("완료되지 않은 항목")
        }
    }
}




struct MemorialsWidgetEntryView : View {
    @Environment(\.widgetFamily) private var widgetFamily
    var entry: Provider.Entry
    var body: some View {
        HStack(alignment: .center) {
            Text("오늘의 할일").font(.system(size: 15))
        }
        Divider()
        VStack(alignment: .center, spacing: 10){
            ForEach(entry.todos!, id:\.id){ todo in
                Text(todo.title).font(.system(size: 12)).alignmentGuide(.leading) { _ in -20 }
                Divider()
            }
        }
    }
}




@main
struct MemorialsWidget: Widget {
    let kind: String = "kr.ntoday.memorials"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            MemorialsWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("오늘 미완료된 Todo")
        .description("현재 날짜의 미완료된 Todo 목록을 확인할 수 있습니다.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct MemorialsWidget_Previews: PreviewProvider {
//    let dataController = DataController()
//    @State static var dataController = DataController()
    @State static var todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
    
  
    static var previews: some View {
        MemorialsWidgetEntryView(entry: MemorialsEntry(todos: todos, todoDataEmptyDescription: nil, date: Date()))
            .previewContext(WidgetPreviewContext(family: .systemMedium))

//        if todos.count == 0 {
//            MemorialsWidgetEntryView(entry: MemorialsEntry(todos: nil, todoDataEmptyDescription: "오늘 해야할 Todo가 없습니다.", date: Date()))
//                .previewContext(WidgetPreviewContext(family: .systemMedium))
//        } else {
//            MemorialsWidgetEntryView(entry: MemorialsEntry(todos: todos, todoDataEmptyDescription: nil, date: Date()))
//                .previewContext(WidgetPreviewContext(family: .systemMedium))
//        }

    }
}
//
//struct TodoList {
//    func getCurrentTodos() ->[Todo] {
//        return CoreDataManager.shared.getSeletedDateUncheckedTodos()
//    }
//}
//


