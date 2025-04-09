//
//  EnvironmentService.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Protocol defining the environment service capabilities
protocol EnvironmentService {
    /// Get all environments
    /// - Returns: Array of environments
    func getEnvironments() async throws -> [Environment]
    
    /// Get a specific environment by ID
    /// - Parameter id: The environment ID
    /// - Returns: The environment
    func getEnvironment(id: String) async throws -> Environment
    
    /// Get environment by name
    /// - Parameter name: The environment name
    /// - Returns: The environment
    func getEnvironmentByName(name: String) async throws -> Environment
    
    /// Get default environment
    /// - Returns: The default environment
    func getDefaultEnvironment() async throws -> Environment
    
    /// Create a new environment
    /// - Parameter data: The environment data
    /// - Returns: The created environment
    func createEnvironment(data: CreateEnvironment) async throws -> Environment
    
    /// Update an environment
    /// - Parameters:
    ///   - id: The environment ID
    ///   - data: The updated environment data
    /// - Returns: The updated environment
    func updateEnvironment(id: String, data: UpdateEnvironment) async throws -> Environment
    
    /// Delete an environment
    /// - Parameter id: The environment ID
    /// - Returns: Success indicator
    func deleteEnvironment(id: String) async throws -> Bool
}

/// Default implementation of the environment service
final class DefaultEnvironmentService: EnvironmentService {
    private let networkService: NetworkService
    
    /// Initialize a new environment service
    /// - Parameter networkService: The network service to use
    init(networkService: NetworkService = DefaultNetworkService()) {
        self.networkService = networkService
    }
    
    /// Get all environments
    /// - Returns: Array of environments
    func getEnvironments() async throws -> [Environment] {
        return try await networkService.get(endpoint: "/environments")
    }
    
    /// Get a specific environment by ID
    /// - Parameter id: The environment ID
    /// - Returns: The environment
    func getEnvironment(id: String) async throws -> Environment {
        return try await networkService.get(endpoint: "/environments/\(id)")
    }
    
    /// Get environment by name
    /// - Parameter name: The environment name
    /// - Returns: The environment
    func getEnvironmentByName(name: String) async throws -> Environment {
        return try await networkService.get(endpoint: "/environments/name/\(name)")
    }
    
    /// Get default environment
    /// - Returns: The default environment
    func getDefaultEnvironment() async throws -> Environment {
        return try await networkService.get(endpoint: "/environments/default")
    }
    
    /// Create a new environment
    /// - Parameter data: The environment data
    /// - Returns: The created environment
    func createEnvironment(data: CreateEnvironment) async throws -> Environment {
        return try await networkService.post(endpoint: "/environments", body: data)
    }
    
    /// Update an environment
    /// - Parameters:
    ///   - id: The environment ID
    ///   - data: The updated environment data
    /// - Returns: The updated environment
    func updateEnvironment(id: String, data: UpdateEnvironment) async throws -> Environment {
        return try await networkService.patch(endpoint: "/environments/\(id)", body: data)
    }
    
    /// Delete an environment
    /// - Parameter id: The environment ID
    /// - Returns: Success indicator
    func deleteEnvironment(id: String) async throws -> Bool {
        return try await networkService.delete(endpoint: "/environments/\(id)")
    }
}
