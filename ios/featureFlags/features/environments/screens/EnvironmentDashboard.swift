//
//  EnvironmentDashboard.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component EnvironmentDashboard
 * @description Placeholder for the environments dashboard
 */

// == View ==
struct EnvironmentDashboard: View {
    // == Body ==
    var body: some View {
        NavigationView {
            ZStack {
                Color.appBackground.edgesIgnoringSafeArea(.all)

                VStack {
                    Spacer()

                    EmptyStateView(
                        title: "Environments Coming Soon",
                        message: "The environments feature will be implemented in a future update.",
                        iconName: "server.rack"
                    )

                    Spacer()
                }
            }
            .navigationTitle("Environments")
        }
    }
}

// == Preview ==
#Preview {
    EnvironmentDashboard()
}
