//
//  EnvironmentConfig.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Environment types supported by the app
enum ServiceEnvironment: String {
    case development
    case staging
    case production
}

/// Configuration for the app environment
struct EnvironmentConfig {
    /// The current environment
    let environment: ServiceEnvironment

    /// The base URL for API requests
    let apiBaseURL: URL

    /// Default timeout for network requests in seconds
    let defaultTimeout: TimeInterval

    /// Whether the app is running in development mode
    var isDevelopment: Bool {
        environment == .development
    }

    /// Whether the app is running in production mode
    var isProduction: Bool {
        environment == .production
    }

    /// Default configuration for development
    static let development = EnvironmentConfig(
        environment: .development,
        apiBaseURL: URL(string: "http://localhost:3002/api")!,
        defaultTimeout: 30.0
    )

    /// Default configuration for staging
    static let staging = EnvironmentConfig(
        environment: .staging,
        apiBaseURL: URL(string: "https://api-staging.example.com/api")!,
        defaultTimeout: 30.0
    )

    /// Default configuration for production
    static let production = EnvironmentConfig(
        environment: .production,
        apiBaseURL: URL(string: "https://api.example.com/api")!,
        defaultTimeout: 30.0
    )

    /// The current configuration based on the build configuration
    static var current: EnvironmentConfig {
        #if DEBUG
        return development
        #else
        return production
        #endif
    }
}
