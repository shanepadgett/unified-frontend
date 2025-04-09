//
//  CreateEnvironment.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Data Transfer Object for creating a new environment
struct CreateEnvironment: Codable {
    let name: String
    let description: String
    let isDefault: Bool?
}
