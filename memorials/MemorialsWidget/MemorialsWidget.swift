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
    
    
    func dateFormatter() -> String {
        let dateformatter = DateFormatter()
        dateformatter.dateFormat = "yyyy.MM.dd"
        return dateformatter.string(from: Date())
    }
    
    var body: some View {
     
        if entry.todos != nil {

            switch widgetFamily {
            case .systemSmall:
                VStack(alignment: .center) {
                    Text(verbatim: "\(dateFormatter())").font(.system(size: 15)).bold()
                    Text("미완료 Todo").font(.system(size: 13))
                    Text(verbatim: "\(entry.todos!.count)건").font(.system(size: 18))
                }
            case .systemMedium, .systemLarge:
                HStack(alignment: .center) {
                    Text(verbatim: "\(dateFormatter())").font(.system(size: 16)).bold()
                    Text(verbatim: "미완료 Todo \(entry.todos!.count)건").font(.system(size: 15))
                }
                VStack(alignment: .center, spacing: 10) {
                    Text("미완료 Todo는 최대 3개까지 볼수 있습니다.").font(.system(size: 11))
                }
                Divider()
                VStack(alignment: .leading, spacing: 10){
                    ForEach(entry.todos!.prefix(3), id:\.id){ todo in
                        Text(verbatim: "* \(todo.title)").font(.system(size: 12)).alignmentGuide(.leading) { _ in -20 }
                        Divider()
                    }
                }
            @unknown default:
                VStack(alignment: .center) {
                    Text(verbatim: "\(dateFormatter())").font(.system(size: 15)).bold()
                    Text("미완료 Todo").font(.system(size: 13))
                    Text(verbatim: "\(entry.todos!.count)건").font(.system(size: 18))
                }
            }
        } else {
            switch widgetFamily {
            case .systemSmall:
                VStack(alignment: .center) {
                    Text(verbatim: "\(dateFormatter())").font(.system(size: 15)).bold()
                    Text("미완료 Todo").font(.system(size: 13))
                    Text("0건").font(.system(size: 18))
                }
            case .systemMedium, .systemLarge:
                VStack(alignment: .center) {
                    Text(verbatim: "\(dateFormatter())").font(.system(size: 18)).bold()
                    Text("미완료 Todo").font(.system(size: 16))
                    Text("0건").font(.system(size: 18))
                }
            @unknown default:
                VStack(alignment: .center) {
                    Text(verbatim: "\(dateFormatter())").font(.system(size: 15)).bold()
                    Text("미완료 Todo").font(.system(size: 13))
                    Text("0건").font(.system(size: 18))
                }
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
