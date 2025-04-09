//
//  UpdateEnvironment.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Data Transfer Object for updating an existing environment
struct UpdateEnvironment: Codable {
    let name: String?
    let description: String?
    let isDefault: Bool?
}
