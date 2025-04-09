//
//  featureFlagsApp.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

@main
struct featureFlagsApp: App {
    // == State ==
    @State private var selectedTab = "flags"

    // == Computed ==
    private var tabs: [TabItem] {
        [
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
    }

    var body: some Scene {
        WindowGroup {
            AppTabView(tabs: tabs, selectedTab: $selectedTab) {
                ZStack {
                    if selectedTab == "flags" {
                        FeatureFlagDashboard()
                    } else {
                        EnvironmentDashboard()
                    }
                }
            }
        }
    }
}
