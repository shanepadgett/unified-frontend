//
//  FeatureFlagDashboard.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component FeatureFlagDashboard
 * @description Main dashboard displaying all feature flags
 */

// == View ==
struct FeatureFlagDashboard: View {
    // == Environment ==
    @StateObject private var viewModel = FeatureFlagDashboardViewModel()

    // == Body ==
    var body: some View {
        NavigationView {
            ZStack {
                Color.appBackground.edgesIgnoringSafeArea(.all)

                VStack(spacing: 16) {
                    // Environment selector and search
                    VStack(spacing: 12) {
                        EnvironmentSelector(
                            selectedEnvironment: viewModel.selectedEnvironment,
                            onChange: viewModel.setEnvironment
                        )

                        SearchInput(
                            placeholder: "Search feature flags...",
                            value: viewModel.searchTerm,
                            onChange: viewModel.setSearchTerm
                        )
                    }
                    .padding(.horizontal)

                    // Feature flags list
                    if viewModel.isLoading {
                        Spacer()
                        LoadingIndicator()
                        Spacer()
                    } else if viewModel.filteredFlags.isEmpty {
                        Spacer()
                        EmptyStateView(
                            title: viewModel.searchTerm.isEmpty
                                ? "No feature flags found"
                                : "No matching feature flags",
                            message: viewModel.searchTerm.isEmpty
                                ? "No feature flags found in \(viewModel.selectedEnvironment) environment."
                                : "No feature flags found matching \"\(viewModel.searchTerm)\"",
                            iconName: "flag"
                        )
                        Spacer()
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 16) {
                                ForEach(viewModel.filteredFlags, id: \.id) { flag in
                                    FeatureFlagCard(
                                        flag: flag,
                                        onToggle: viewModel.toggleFeatureFlag,
                                        isLoading: viewModel.toggleLoadingId == flag.id
                                    )
                                }
                            }
                            .padding(.vertical)
                        }
                    }
                }
                .navigationTitle("Feature Flags")
            }
        }
        .onAppear {
            viewModel.loadFeatureFlags()
        }
    }
}

// == ViewModel ==
final class FeatureFlagDashboardViewModel: ObservableObject {
    // == Services ==
    private let featureFlagService: FeatureFlagService

    // == Published Properties ==
    @Published var featureFlags: [FeatureFlag] = []
    @Published var selectedEnvironment: String = "development"
    @Published var searchTerm: String = ""
    @Published var isLoading: Bool = false
    @Published var toggleLoadingId: String? = nil

    // == Computed Properties ==
    var filteredFlags: [FeatureFlag] {
        if searchTerm.isEmpty {
            return featureFlags
        }

        let lowercasedSearchTerm = searchTerm.lowercased()
        return featureFlags.filter { flag in
            flag.name.lowercased().contains(lowercasedSearchTerm) ||
            flag.description.lowercased().contains(lowercasedSearchTerm) ||
            (flag.owner?.lowercased().contains(lowercasedSearchTerm) ?? false)
        }
    }

    // == Initialization ==
    init(featureFlagService: FeatureFlagService = DefaultFeatureFlagService()) {
        self.featureFlagService = featureFlagService
    }

    // == Actions ==
    func loadFeatureFlags() {
        isLoading = true

        Task {
            do {
                let flags = try await featureFlagService.getFeatureFlagsByEnvironment(environment: selectedEnvironment)

                await MainActor.run {
                    self.featureFlags = flags
                    self.isLoading = false
                }
            } catch {
                print("Error loading feature flags: \(error)")

                await MainActor.run {
                    self.featureFlags = []
                    self.isLoading = false
                }
            }
        }
    }

    func setEnvironment(_ environment: String) {
        selectedEnvironment = environment
        loadFeatureFlags()
    }

    func setSearchTerm(_ term: String) {
        searchTerm = term
    }

    func toggleFeatureFlag(id: String, enabled: Bool) {
        toggleLoadingId = id

        Task {
            do {
                let updatedFlag = try await featureFlagService.toggleFeatureFlag(id: id)

                await MainActor.run {
                    if let index = self.featureFlags.firstIndex(where: { $0.id == id }) {
                        self.featureFlags[index] = updatedFlag
                    }
                    self.toggleLoadingId = nil
                }
            } catch {
                print("Error toggling feature flag: \(error)")

                await MainActor.run {
                    self.toggleLoadingId = nil
                }
            }
        }
    }
}

// == Preview ==
#Preview {
    FeatureFlagDashboard()
}
