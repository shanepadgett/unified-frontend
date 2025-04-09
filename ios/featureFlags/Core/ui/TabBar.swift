//
//  TabBar.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component TabBar
 * @description A tab bar component for iOS-style tab navigation
 */

// == Types ==
public struct TabItem {
    let id: String
    let title: String
    let icon: Image
    let selectedIcon: Image?

    public init(
        id: String,
        title: String,
        icon: Image,
        selectedIcon: Image? = nil
    ) {
        self.id = id
        self.title = title
        self.icon = icon
        self.selectedIcon = selectedIcon
    }
}

// == View ==
public struct AppTabBar: View {
    // == Properties ==
    let tabs: [TabItem]
    @Binding var selectedTab: String

    // == Body ==
    public var body: some View {
        HStack(spacing: 0) {
            ForEach(tabs, id: \.id) { tab in
                Button(action: {
                    selectedTab = tab.id
                }) {
                    VStack(spacing: 4) {
                        (selectedTab == tab.id ? (tab.selectedIcon ?? tab.icon) : tab.icon)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 24, height: 24)

                        Text(tab.title)
                            .font(.caption2)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
                    .foregroundColor(selectedTab == tab.id ? .appPrimary : .appSecondaryText)
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
    }

    // == Initializers ==
    public init(
        tabs: [TabItem],
        selectedTab: Binding<String>
    ) {
        self.tabs = tabs
        self._selectedTab = selectedTab
    }
}

// == TabView Container ==
public struct AppTabView<Content: View>: View {
    // == Properties ==
    let tabs: [TabItem]
    @Binding var selectedTab: String
    let content: Content

    // == Body ==
    public var body: some View {
        ZStack(alignment: .bottom) {
            content
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .padding(.bottom, 49) // Height of tab bar

            VStack(spacing: 0) {
                Divider()
                    .background(Color.appBorder)
                AppTabBar(tabs: tabs, selectedTab: $selectedTab)
                    .background(Color.appSecondaryBackground)
            }
            .background(Color.appSecondaryBackground)
            .shadow(color: Color.black.opacity(0.1), radius: 3, x: 0, y: -2)
        }
        .edgesIgnoringSafeArea(.bottom)
    }

    // == Initializers ==
    public init(
        tabs: [TabItem],
        selectedTab: Binding<String>,
        @ViewBuilder content: () -> Content
    ) {
        self.tabs = tabs
        self._selectedTab = selectedTab
        self.content = content()
    }
}

// == Preview ==
#Preview {
    @Previewable @State var selectedTab = "flags"

    let tabs = [
        TabItem(
            id: "flags",
            title: "Flags",
            icon: Image(systemName: "flag"),
            selectedIcon: Image(systemName: "flag.fill")
        ),
        TabItem(
            id: "environments",
            title: "Environments",
            icon: Image(systemName: "server.rack"),
            selectedIcon: Image(systemName: "server.rack.fill")
        )
    ]

    return AppTabView(tabs: tabs, selectedTab: $selectedTab) {
        ZStack {
            if selectedTab == "flags" {
                Color.blue.opacity(0.2)
                Text("Feature Flags Tab")
            } else {
                Color.green.opacity(0.2)
                Text("Environments Tab")
            }
        }
    }
}
