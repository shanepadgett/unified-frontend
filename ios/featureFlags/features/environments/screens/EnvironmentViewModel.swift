//
//  EnvironmentViewModel.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import Foundation
import SwiftUI

/**
 * @component EnvironmentViewModel
 * @description View model for the environment dashboard
 */

// == ViewModel ==
final class EnvironmentViewModel: ObservableObject {
    // == Services ==
    private let environmentService: EnvironmentService
    
    // == Published Properties ==
    @Published var environments: [AppEnvironment] = []
    @Published var searchTerm: String = ""
    @Published var isLoading: Bool = false
    @Published var showCreateForm: Bool = false
    @Published var errorMessage: String? = nil
    
    // == Computed Properties ==
    var filteredEnvironments: [AppEnvironment] {
        if searchTerm.isEmpty {
            return environments
        }
        
        return environments.filter { environment in
            environment.name.lowercased().contains(searchTerm.lowercased()) ||
            environment.description.lowercased().contains(searchTerm.lowercased())
        }
    }
    
    // == Initializers ==
    init(environmentService: EnvironmentService = DefaultEnvironmentService()) {
        self.environmentService = environmentService
    }
    
    // == Actions ==
    func loadEnvironments() {
        isLoading = true
        errorMessage = nil
        
        Task {
            do {
                let environments = try await environmentService.getEnvironments()
                
                await MainActor.run {
                    self.environments = environments
                    self.isLoading = false
                }
            } catch {
                print("Error loading environments: \(error)")
                
                await MainActor.run {
                    self.environments = []
                    self.isLoading = false
                    self.errorMessage = "Failed to load environments. Please try again."
                }
            }
        }
    }
    
    func createEnvironment(name: String, description: String, isDefault: Bool) async -> Bool {
        do {
            let data = CreateEnvironment(
                name: name,
                description: description,
                isDefault: isDefault
            )
            
            let _ = try await environmentService.createEnvironment(data: data)
            
            await MainActor.run {
                loadEnvironments()
                showCreateForm = false
            }
            
            return true
        } catch {
            print("Error creating environment: \(error)")
            
            await MainActor.run {
                self.errorMessage = "Failed to create environment. Please try again."
            }
            
            return false
        }
    }
    
    func updateEnvironment(id: String, name: String?, description: String?, isDefault: Bool?) async -> Bool {
        do {
            let data = UpdateEnvironment(
                name: name,
                description: description,
                isDefault: isDefault
            )
            
            let _ = try await environmentService.updateEnvironment(id: id, data: data)
            
            await MainActor.run {
                loadEnvironments()
            }
            
            return true
        } catch {
            print("Error updating environment: \(error)")
            
            await MainActor.run {
                self.errorMessage = "Failed to update environment. Please try again."
            }
            
            return false
        }
    }
    
    func deleteEnvironment(id: String) async -> Bool {
        do {
            let success = try await environmentService.deleteEnvironment(id: id)
            
            if success {
                await MainActor.run {
                    loadEnvironments()
                }
                
                return true
            } else {
                await MainActor.run {
                    self.errorMessage = "Failed to delete environment."
                }
                
                return false
            }
        } catch {
            print("Error deleting environment: \(error)")
            
            await MainActor.run {
                self.errorMessage = "Failed to delete environment. Please try again."
            }
            
            return false
        }
    }
    
    func setSearchTerm(_ term: String) {
        searchTerm = term
    }
    
    func toggleCreateForm() {
        showCreateForm.toggle()
    }
}
