//
//  NetworkService.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Protocol defining the network service capabilities
protocol NetworkService {
    /// Performs a GET request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - queryItems: Optional query parameters
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func get<T: Decodable>(
        endpoint: String,
        queryItems: [URLQueryItem]?,
        headers: [String: String]?
    ) async throws -> T
    
    /// Performs a POST request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - body: The request body
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func post<T: Decodable, U: Encodable>(
        endpoint: String,
        body: U,
        headers: [String: String]?
    ) async throws -> T
    
    /// Performs a PUT request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - body: The request body
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func put<T: Decodable, U: Encodable>(
        endpoint: String,
        body: U,
        headers: [String: String]?
    ) async throws -> T
    
    /// Performs a PATCH request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - body: The request body
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func patch<T: Decodable, U: Encodable>(
        endpoint: String,
        body: U,
        headers: [String: String]?
    ) async throws -> T
    
    /// Performs a DELETE request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func delete<T: Decodable>(
        endpoint: String,
        headers: [String: String]?
    ) async throws -> T
}
