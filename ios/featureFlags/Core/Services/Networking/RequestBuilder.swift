//
//  RequestBuilder.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Utility for building URLRequests
struct RequestBuilder {
    private let baseURL: URL
    private let endpoint: String
    private let method: HTTPMethod
    private var queryItems: [URLQueryItem]?
    private var headers: [String: String]?
    private var body: Data?
    
    /// Initialize a new request builder
    /// - Parameters:
    ///   - baseURL: The base URL for the API
    ///   - endpoint: The API endpoint
    ///   - method: The HTTP method
    init(baseURL: URL, endpoint: String, method: HTTPMethod) {
        self.baseURL = baseURL
        self.endpoint = endpoint
        self.method = method
    }
    
    /// Add query parameters to the request
    /// - Parameter queryItems: The query parameters
    /// - Returns: The updated request builder
    func withQueryItems(_ queryItems: [URLQueryItem]?) -> RequestBuilder {
        var builder = self
        builder.queryItems = queryItems
        return builder
    }
    
    /// Add headers to the request
    /// - Parameter headers: The headers to add
    /// - Returns: The updated request builder
    func withHeaders(_ headers: [String: String]?) -> RequestBuilder {
        var builder = self
        builder.headers = headers
        return builder
    }
    
    /// Add a body to the request
    /// - Parameter body: The request body
    /// - Returns: The updated request builder
    func withBody<T: Encodable>(_ body: T) throws -> RequestBuilder {
        var builder = self
        let encoder = JSONEncoder()
        encoder.keyEncodingStrategy = .convertToSnakeCase
        encoder.dateEncodingStrategy = .iso8601
        
        do {
            builder.body = try encoder.encode(body)
        } catch {
            throw NetworkError.encodingFailed(error)
        }
        
        return builder
    }
    
    /// Build the URLRequest
    /// - Returns: The configured URLRequest
    func build() throws -> URLRequest {
        // Create URL with path
        let normalizedEndpoint = endpoint.starts(with: "/") ? endpoint : "/\(endpoint)"
        guard var urlComponents = URLComponents(url: baseURL.appendingPathComponent(normalizedEndpoint), resolvingAgainstBaseURL: true) else {
            throw NetworkError.invalidURL
        }
        
        // Add query items if present
        if let queryItems = queryItems, !queryItems.isEmpty {
            urlComponents.queryItems = queryItems
        }
        
        // Create URL
        guard let url = urlComponents.url else {
            throw NetworkError.invalidURL
        }
        
        // Create request
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        
        // Set default headers
        var defaultHeaders = [
            "Content-Type": "application/json",
            "Accept": "application/json"
        ]
        
        // Add custom headers
        if let headers = headers {
            headers.forEach { key, value in
                defaultHeaders[key] = value
            }
        }
        
        // Set headers on request
        defaultHeaders.forEach { key, value in
            request.setValue(value, forHTTPHeaderField: key)
        }
        
        // Set body if present
        if let body = body {
            request.httpBody = body
        }
        
        return request
    }
}
