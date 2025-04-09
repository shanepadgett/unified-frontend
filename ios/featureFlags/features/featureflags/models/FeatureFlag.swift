//
//  FeatureFlag.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Feature Flag model matching the server model
struct FeatureFlag: Codable, Identifiable, Equatable {
    let id: String
    let name: String
    let description: String
    let enabled: Bool
    let environment: String
    let lastModified: Date?
    let owner: String?
    let rolloutPercentage: Int?
    let dependencies: [String]?
    let expiresAt: Date?
    
    /// Create a mock feature flag for previews
    static func mock() -> FeatureFlag {
        FeatureFlag(
            id: UUID().uuidString,
            name: "Dark Mode",
            description: "Enable dark mode across the application",
            enabled: true,
            environment: "development",
            lastModified: Date(),
            owner: "UI Team",
            rolloutPercentage: 100,
            dependencies: nil,
            expiresAt: nil
        )
    }
    
    /// Create a list of mock feature flags for previews
    static func mockList() -> [FeatureFlag] {
        [
            FeatureFlag(
                id: UUID().uuidString,
                name: "Dark Mode",
                description: "Enable dark mode across the application",
                enabled: true,
                environment: "development",
                lastModified: Date(),
                owner: "UI Team",
                rolloutPercentage: 100,
                dependencies: nil,
                expiresAt: nil
            ),
            FeatureFlag(
                id: UUID().uuidString,
                name: "New Dashboard",
                description: "Enable the new dashboard experience",
                enabled: false,
                environment: "development",
                lastModified: Date(),
                owner: "Product Team",
                rolloutPercentage: 0,
                dependencies: nil,
                expiresAt: nil
            ),
            FeatureFlag(
                id: UUID().uuidString,
                name: "Analytics",
                description: "Enable analytics tracking",
                enabled: true,
                environment: "development",
                lastModified: Date(),
                owner: "Data Team",
                rolloutPercentage: 100,
                dependencies: nil,
                expiresAt: nil
            )
        ]
    }
}
