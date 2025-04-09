//
//  FeatureFlagService.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Protocol defining the feature flag service capabilities
protocol FeatureFlagService {
    /// Get all feature flags
    /// - Returns: Array of feature flags
    func getFeatureFlags() async throws -> [FeatureFlag]
    
    /// Get feature flags by environment
    /// - Parameter environment: The environment name
    /// - Returns: Array of feature flags for the specified environment
    func getFeatureFlagsByEnvironment(environment: String) async throws -> [FeatureFlag]
    
    /// Get a specific feature flag by ID
    /// - Parameter id: The feature flag ID
    /// - Returns: The feature flag
    func getFeatureFlag(id: String) async throws -> FeatureFlag
    
    /// Toggle a feature flag
    /// - Parameter id: The feature flag ID
    /// - Returns: The updated feature flag
    func toggleFeatureFlag(id: String) async throws -> FeatureFlag
    
    /// Create a new feature flag
    /// - Parameter data: The feature flag data
    /// - Returns: The created feature flag
    func createFeatureFlag(data: CreateFeatureFlag) async throws -> FeatureFlag
    
    /// Update a feature flag
    /// - Parameters:
    ///   - id: The feature flag ID
    ///   - data: The updated feature flag data
    /// - Returns: The updated feature flag
    func updateFeatureFlag(id: String, data: UpdateFeatureFlag) async throws -> FeatureFlag
    
    /// Delete a feature flag
    /// - Parameter id: The feature flag ID
    /// - Returns: Success indicator
    func deleteFeatureFlag(id: String) async throws -> Bool
}

/// Default implementation of the feature flag service
final class DefaultFeatureFlagService: FeatureFlagService {
    private let networkService: NetworkService
    
    /// Initialize a new feature flag service
    /// - Parameter networkService: The network service to use
    init(networkService: NetworkService = DefaultNetworkService()) {
        self.networkService = networkService
    }
    
    /// Get all feature flags
    /// - Returns: Array of feature flags
    func getFeatureFlags() async throws -> [FeatureFlag] {
        return try await networkService.get(endpoint: "/feature-flags")
    }
    
    /// Get feature flags by environment
    /// - Parameter environment: The environment name
    /// - Returns: Array of feature flags for the specified environment
    func getFeatureFlagsByEnvironment(environment: String) async throws -> [FeatureFlag] {
        return try await networkService.get(endpoint: "/feature-flags/env/\(environment)")
    }
    
    /// Get a specific feature flag by ID
    /// - Parameter id: The feature flag ID
    /// - Returns: The feature flag
    func getFeatureFlag(id: String) async throws -> FeatureFlag {
        return try await networkService.get(endpoint: "/feature-flags/\(id)")
    }
    
    /// Toggle a feature flag
    /// - Parameter id: The feature flag ID
    /// - Returns: The updated feature flag
    func toggleFeatureFlag(id: String) async throws -> FeatureFlag {
        // The toggle endpoint expects an empty body
        return try await networkService.patch(endpoint: "/feature-flags/\(id)/toggle", body: EmptyBody())
    }
    
    /// Create a new feature flag
    /// - Parameter data: The feature flag data
    /// - Returns: The created feature flag
    func createFeatureFlag(data: CreateFeatureFlag) async throws -> FeatureFlag {
        return try await networkService.post(endpoint: "/feature-flags", body: data)
    }
    
    /// Update a feature flag
    /// - Parameters:
    ///   - id: The feature flag ID
    ///   - data: The updated feature flag data
    /// - Returns: The updated feature flag
    func updateFeatureFlag(id: String, data: UpdateFeatureFlag) async throws -> FeatureFlag {
        return try await networkService.patch(endpoint: "/feature-flags/\(id)", body: data)
    }
    
    /// Delete a feature flag
    /// - Parameter id: The feature flag ID
    /// - Returns: Success indicator
    func deleteFeatureFlag(id: String) async throws -> Bool {
        return try await networkService.delete(endpoint: "/feature-flags/\(id)")
    }
}

/// Empty body for requests that don't need a body
private struct EmptyBody: Codable {}
