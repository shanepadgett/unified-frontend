//
//  DefaultNetworkService.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation

/// Default implementation of the NetworkService protocol
final class DefaultNetworkService: NetworkService {
    private let config: EnvironmentConfig
    private let session: URLSession
    private let decoder: JSONDecoder
    
    /// Initialize a new network service
    /// - Parameters:
    ///   - config: The environment configuration
    ///   - session: The URL session to use
    init(config: EnvironmentConfig = EnvironmentConfig.current,
         session: URLSession = .shared) {
        self.config = config
        self.session = session
        
        // Configure JSON decoder
        self.decoder = JSONDecoder()
        self.decoder.keyDecodingStrategy = .convertFromSnakeCase
        self.decoder.dateDecodingStrategy = .iso8601
    }
    
    /// Performs a GET request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - queryItems: Optional query parameters
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func get<T: Decodable>(
        endpoint: String,
        queryItems: [URLQueryItem]? = nil,
        headers: [String: String]? = nil
    ) async throws -> T {
        let request = try RequestBuilder(baseURL: config.apiBaseURL, endpoint: endpoint, method: .get)
            .withQueryItems(queryItems)
            .withHeaders(headers)
            .build()
        
        return try await performRequest(request)
    }
    
    /// Performs a POST request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - body: The request body
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func post<T: Decodable, U: Encodable>(
        endpoint: String,
        body: U,
        headers: [String: String]? = nil
    ) async throws -> T {
        let request = try RequestBuilder(baseURL: config.apiBaseURL, endpoint: endpoint, method: .post)
            .withHeaders(headers)
            .withBody(body)
            .build()
        
        return try await performRequest(request)
    }
    
    /// Performs a PUT request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - body: The request body
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func put<T: Decodable, U: Encodable>(
        endpoint: String,
        body: U,
        headers: [String: String]? = nil
    ) async throws -> T {
        let request = try RequestBuilder(baseURL: config.apiBaseURL, endpoint: endpoint, method: .put)
            .withHeaders(headers)
            .withBody(body)
            .build()
        
        return try await performRequest(request)
    }
    
    /// Performs a PATCH request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - body: The request body
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func patch<T: Decodable, U: Encodable>(
        endpoint: String,
        body: U,
        headers: [String: String]? = nil
    ) async throws -> T {
        let request = try RequestBuilder(baseURL: config.apiBaseURL, endpoint: endpoint, method: .patch)
            .withHeaders(headers)
            .withBody(body)
            .build()
        
        return try await performRequest(request)
    }
    
    /// Performs a DELETE request
    /// - Parameters:
    ///   - endpoint: The API endpoint
    ///   - headers: Optional additional headers
    /// - Returns: The decoded response
    func delete<T: Decodable>(
        endpoint: String,
        headers: [String: String]? = nil
    ) async throws -> T {
        let request = try RequestBuilder(baseURL: config.apiBaseURL, endpoint: endpoint, method: .delete)
            .withHeaders(headers)
            .build()
        
        return try await performRequest(request)
    }
    
    // MARK: - Private Methods
    
    /// Performs a network request and decodes the response
    /// - Parameter request: The URLRequest to perform
    /// - Returns: The decoded response
    private func performRequest<T: Decodable>(_ request: URLRequest) async throws -> T {
        do {
            // Create a task with a timeout
            let (data, response) = try await session.data(for: request, delegate: nil)
            
            // Check for valid HTTP response
            guard let httpResponse = response as? HTTPURLResponse else {
                throw NetworkError.invalidResponse
            }
            
            // Check status code
            switch httpResponse.statusCode {
            case 200...299:
                // Success, continue to decode
                break
            case 401:
                throw NetworkError.unauthorized
            case 400...499:
                throw NetworkError.requestFailed(statusCode: httpResponse.statusCode, data: data)
            case 500...599:
                throw NetworkError.serverError("Server error with status code: \(httpResponse.statusCode)")
            default:
                throw NetworkError.requestFailed(statusCode: httpResponse.statusCode, data: data)
            }
            
            // Decode the response
            do {
                return try decoder.decode(T.self, from: data)
            } catch {
                throw NetworkError.decodingFailed(error)
            }
        } catch let error as NetworkError {
            throw error
        } catch {
            throw NetworkError.unknown(error)
        }
    }
}
