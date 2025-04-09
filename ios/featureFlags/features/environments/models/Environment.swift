//
//  Environment.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Environment model matching the server model
struct AppEnvironment: Codable, Identifiable, Equatable {
    let id: String
    let name: String
    let description: String
    let isDefault: Bool
    let createdAt: Date
    let updatedAt: Date

    /// Create a mock environment for previews
    static func mock() -> AppEnvironment {
        AppEnvironment(
            id: UUID().uuidString,
            name: "Development",
            description: "Development environment for testing",
            isDefault: true,
            createdAt: Date(),
            updatedAt: Date()
        )
    }

    /// Create a list of mock environments for previews
    static func mockList() -> [AppEnvironment] {
        [
            AppEnvironment(
                id: UUID().uuidString,
                name: "Development",
                description: "Development environment for testing",
                isDefault: true,
                createdAt: Date(),
                updatedAt: Date()
            ),
            AppEnvironment(
                id: UUID().uuidString,
                name: "Staging",
                description: "Staging environment for pre-production testing",
                isDefault: false,
                createdAt: Date(),
                updatedAt: Date()
            ),
            AppEnvironment(
                id: UUID().uuidString,
                name: "Production",
                description: "Production environment for live users",
                isDefault: false,
                createdAt: Date(),
                updatedAt: Date()
            )
        ]
    }
}
