//
//  EnvironmentCard.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component EnvironmentCard
 * @description Card component for displaying an environment
 */

// == Types ==
struct EnvironmentCardProps {
    let environment: AppEnvironment
    let onUpdate: () -> Void
    let onDelete: (String) -> Void

    init(
        environment: AppEnvironment,
        onUpdate: @escaping () -> Void,
        onDelete: @escaping (String) -> Void
    ) {
        self.environment = environment
        self.onUpdate = onUpdate
        self.onDelete = onDelete
    }
}

// == View ==
struct EnvironmentCard: View {
    // == Properties ==
    let props: EnvironmentCardProps

    // == State ==
    @State private var isEditing: Bool = false
    @State private var name: String = ""
    @State private var description: String = ""
    @State private var isDefault: Bool = false
    @State private var isDeleting: Bool = false
    @State private var isSaving: Bool = false

    // == Computed ==
    private var formattedCreatedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: props.environment.createdAt)
    }

    private var formattedUpdatedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: props.environment.updatedAt)
    }

    // == Body ==
    var body: some View {
        Card(hoverable: true) {
            if isEditing {
                editView
            } else {
                displayView
            }
        }
        .padding(.horizontal)
    }

    // == Subviews ==
    private var displayView: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header with title
            HStack {
                Text(props.environment.name)
                    .font(.title3)
                    .fontWeight(.medium)
                    .foregroundColor(.appText)

                Spacer()
            }

            // Description
            Text(props.environment.description)
                .font(.body)
                .foregroundColor(.appSecondaryText)
                .fixedSize(horizontal: false, vertical: true)

            // Tags
            if props.environment.isDefault {
                HStack {
                    Text("Default")
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.green.opacity(0.2))
                        .foregroundColor(.green)
                        .cornerRadius(12)
                }
            }

            // Metadata
            VStack(alignment: .leading, spacing: 4) {
                Text("Created: \(formattedCreatedDate)")
                    .font(.caption)
                    .foregroundColor(.appSecondaryText)

                Text("Last Updated: \(formattedUpdatedDate)")
                    .font(.caption)
                    .foregroundColor(.appSecondaryText)
            }

            // Action buttons
            VStack(spacing: 8) {
                AppButton("Edit", variant: .outline, fullWidth: true, action: {
                    startEditing()
                })

                AppButton("Delete",
                         variant: .danger,
                         isLoading: isDeleting,
                         disabled: props.environment.isDefault || isDeleting,
                         fullWidth: true,
                         action: {
                    deleteEnvironment()
                })
            }
            .padding(.top, 8)
        }
    }

    private var editView: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Name field
            VStack(alignment: .leading, spacing: 4) {
                Text("Name")
                    .font(.subheadline)
                    .foregroundColor(.appSecondaryText)

                TextField("Environment name", text: $name)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(Color.clear)
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.appBorder, lineWidth: 1)
                    )
            }

            // Description field
            VStack(alignment: .leading, spacing: 4) {
                Text("Description")
                    .font(.subheadline)
                    .foregroundColor(.appSecondaryText)

                ZStack {
                    Color.appSecondaryBackground
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.appBorder, lineWidth: 1)
                        )

                    TextEditor(text: $description)
                        .frame(minHeight: 100)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .scrollContentBackground(.hidden)
                        .cornerRadius(8)
                }
            }

            // Default checkbox
            Toggle(isOn: $isDefault) {
                Text("Set as default environment")
                    .font(.subheadline)
                    .foregroundColor(.appText)
            }

            // Action buttons
            VStack(spacing: 8) {
                AppButton("Save", variant: .primary, isLoading: isSaving, fullWidth: true, action: {
                    saveEnvironment()
                })

                AppButton("Cancel", variant: .outline, fullWidth: true, action: {
                    cancelEditing()
                })
            }
            .padding(.top, 8)
        }
    }

    // == Actions ==
    private func startEditing() {
        name = props.environment.name
        description = props.environment.description
        isDefault = props.environment.isDefault
        isEditing = true
    }

    private func cancelEditing() {
        isEditing = false
    }

    private func saveEnvironment() {
        isSaving = true

        Task {
            let success = await updateEnvironment()

            if success {
                await MainActor.run {
                    isEditing = false
                    isSaving = false
                    props.onUpdate()
                }
            } else {
                await MainActor.run {
                    isSaving = false
                }
            }
        }
    }

    private func deleteEnvironment() {
        if props.environment.isDefault {
            return
        }

        isDeleting = true

        props.onDelete(props.environment.id)
    }

    // == API Calls ==
    private func updateEnvironment() async -> Bool {
        do {
            let data = UpdateEnvironment(
                name: name,
                description: description,
                isDefault: isDefault
            )

            let _ = try await DefaultEnvironmentService().updateEnvironment(
                id: props.environment.id,
                data: data
            )

            return true
        } catch {
            print("Error updating environment: \(error)")
            return false
        }
    }

    // == Initializers ==
    init(
        environment: AppEnvironment,
        onUpdate: @escaping () -> Void,
        onDelete: @escaping (String) -> Void
    ) {
        self.props = EnvironmentCardProps(
            environment: environment,
            onUpdate: onUpdate,
            onDelete: onDelete
        )
    }
}

// == Preview ==
#Preview {
    EnvironmentCard(
        environment: AppEnvironment.mock(),
        onUpdate: {},
        onDelete: { _ in }
    )
    .padding()
}
