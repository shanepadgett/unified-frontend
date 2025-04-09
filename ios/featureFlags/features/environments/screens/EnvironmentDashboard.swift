//
//  EnvironmentDashboard.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component EnvironmentDashboard
 * @description Dashboard for managing environments
 */

// == View ==
struct EnvironmentDashboard: View {
    // == Environment ==
    @StateObject private var viewModel = EnvironmentViewModel()

    // == State ==
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass

    // == Computed ==
    private var isMobile: Bool {
        horizontalSizeClass == .compact
    }

    // == Body ==
    var body: some View {
        NavigationView {
            ZStack {
                Color.appBackground.edgesIgnoringSafeArea(.all)

                VStack(spacing: 16) {
                    // Mobile header
                    if isMobile {
                        VStack(spacing: 12) {
                            SearchInput(
                                placeholder: "Search environments...",
                                value: viewModel.searchTerm,
                                onChange: viewModel.setSearchTerm
                            )

                            AppButton(
                                viewModel.showCreateForm ? "Cancel" : "Create Environment",
                                variant: .primary,
                                fullWidth: true,
                                action: {
                                    viewModel.toggleCreateForm()
                                }
                            )
                        }
                        .padding(.horizontal, 16)
                    }

                    // Desktop header (hidden on mobile)
                    if !isMobile {
                        VStack(spacing: 12) {
                            HStack {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Environments")
                                        .font(.title)
                                        .fontWeight(.bold)
                                        .foregroundColor(.appText)

                                    Text("Manage environments for your feature flags")
                                        .font(.subheadline)
                                        .foregroundColor(.appSecondaryText)
                                }

                                Spacer()

                                AppButton(
                                    viewModel.showCreateForm ? "Cancel" : "Create Environment",
                                    variant: .primary,
                                    action: {
                                        viewModel.toggleCreateForm()
                                    }
                                )
                            }

                            SearchInput(
                                placeholder: "Search environments...",
                                value: viewModel.searchTerm,
                                onChange: viewModel.setSearchTerm
                            )
                        }
                        .padding(.horizontal, 16)
                    }

                    // Create form (when shown)
                    if viewModel.showCreateForm {
                        CreateEnvironmentForm(
                            onSuccess: {
                                viewModel.loadEnvironments()
                                viewModel.toggleCreateForm()
                            },
                            onCancel: {
                                viewModel.toggleCreateForm()
                            }
                        )
                        .padding(.horizontal, 16)
                    }

                    // Content area
                    if viewModel.isLoading {
                        Spacer()
                        LoadingIndicator()
                        Spacer()
                    } else if viewModel.environments.isEmpty {
                        Spacer()
                        EmptyStateView(
                            title: "No Environments Found",
                            message: "No environments found. Create one to get started.",
                            iconName: "server.rack",
                            buttonTitle: "Create Environment",
                            buttonAction: {
                                viewModel.toggleCreateForm()
                            }
                        )
                        Spacer()
                    } else if viewModel.filteredEnvironments.isEmpty {
                        Spacer()
                        EmptyStateView(
                            title: "No Matching Environments",
                            message: "No environments found matching \"\(viewModel.searchTerm)\".",
                            iconName: "server.rack"
                        )
                        Spacer()
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 16) {
                                ForEach(viewModel.filteredEnvironments, id: \.id) { environment in
                                    EnvironmentCard(
                                        environment: environment,
                                        onUpdate: {
                                            viewModel.loadEnvironments()
                                        },
                                        onDelete: { id in
                                            Task {
                                                let success = await viewModel.deleteEnvironment(id: id)
                                                if success {
                                                    viewModel.loadEnvironments()
                                                }
                                            }
                                        }
                                    )
                                }
                            }
                            .padding(.top, 8)
                        }
                        .padding(.horizontal, 16)
                    }
                }
            }
            .navigationTitle("Environments")
            .onAppear {
                viewModel.loadEnvironments()
            }
        }
    }
}

// == Preview ==
#Preview {
    EnvironmentDashboard()
}
