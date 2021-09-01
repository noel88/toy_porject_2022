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

    func placeholder(in context: Context) -> MemorialsEntry {
        let todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
        
        if todos?.count == 0 {
           return MemorialsEntry(todos: nil, date: Date())
        } else {
            return MemorialsEntry(todos: todos, date: Date())
        }
    }

    func getSnapshot(in context: Context, completion: @escaping (MemorialsEntry) -> ()) {
        let todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
        let entry: MemorialsEntry!
        
        if todos?.count == 0 {
            entry = MemorialsEntry(todos: nil, date: Date())
        } else {
            entry = MemorialsEntry(todos: todos, date: Date())
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
            
            if todos?.count == 0 {
                entry = MemorialsEntry(todos: nil, date: entryDate)
            } else {
                entry = MemorialsEntry(todos: todos, date: entryDate)
            }
            entries.append(entry!)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct MemorialsEntry: TimelineEntry {
    let todos: [TodoEntity]?
    let date: Date
}


struct EmptySmallWidgetView : View {
    var body: some View {
        HStack(alignment: .center) {
            Text("미완료된 항목없음.").font(.system(size: 13))
        }
    }
}



struct EmptyMediumWidgetView : View {
    var body: some View {
        HStack(alignment: .center) {
            Text("오늘 미완료된 항목이 없습니다.").font(.system(size: 15))
        }
    }
}

struct MemorialsWidgetEntryView : View {
    @Environment(\.widgetFamily) private var widgetFamily
    var entry: Provider.Entry
    var body: some View {
        if entry.todos?.count != 0 {
            
            switch widgetFamily {
            case .systemSmall:
                HStack(alignment: .center) {
                    Text("Todo").font(.system(size: 13))
                }
                Divider()
                VStack(alignment: .leading, spacing: 10){
                    ForEach(entry.todos!.prefix(2), id:\.id){ todo in
                        Text(todo.title).font(.system(size: 10)).alignmentGuide(.leading) { _ in -20 }
                        Divider()
                    }
                }
            case .systemMedium:
                HStack(alignment: .center) {
                    Text("Todo").font(.system(size: 15))
                }
                Divider()
                VStack(alignment: .leading, spacing: 10){
                    ForEach(entry.todos!.prefix(3), id:\.id){ todo in
                        Text(todo.title).font(.system(size: 12)).alignmentGuide(.leading) { _ in -20 }
                        Divider()
                    }
                }
            case .systemLarge:
                HStack(alignment: .center) {
                    Text("Todo").font(.system(size: 15))
                }
                Divider()
                VStack(alignment: .leading, spacing: 10){
                    ForEach(entry.todos!.prefix(3), id:\.id){ todo in
                        Text(todo.title).font(.system(size: 12)).alignmentGuide(.leading) { _ in -20 }
                        Divider()
                    }
                }
            @unknown default:
                HStack(alignment: .center) {
                    Text("Todo").font(.system(size: 13))
                }
                Divider()
                VStack(alignment: .leading, spacing: 10){
                    ForEach(entry.todos!.prefix(2), id:\.id){ todo in
                        Text(todo.title).font(.system(size: 10)).alignmentGuide(.leading) { _ in -20 }
                        Divider()
                    }
                }
            }
        } else {
            
            switch widgetFamily {
            case .systemSmall:
                EmptySmallWidgetView()
            case .systemMedium:
                EmptyMediumWidgetView()
            case .systemLarge:
                EmptyMediumWidgetView()
            @unknown default:
                EmptySmallWidgetView()
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
        .configurationDisplayName("미완료된 Todo")
        .description("오늘 미완료된 Todo 목록을 확인할 수 있습니다.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct MemorialsWidget_Previews: PreviewProvider {
    @State static var todos = CoreDataStack.shared.getSeletedDateUncheckedTodos()
    
    static var previews: some View {
        MemorialsWidgetEntryView(entry: MemorialsEntry(todos: todos, date: Date()))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
