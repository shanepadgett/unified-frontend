//
//  UpdateFeatureFlag.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Data Transfer Object for updating an existing feature flag
struct UpdateFeatureFlag: Codable {
    let name: String?
    let description: String?
    let enabled: Bool?
    let environment: String?
    let owner: String?
    let rolloutPercentage: Int?
    let dependencies: [String]?
    let expiresAt: String?
}
