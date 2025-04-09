//
//  CreateEnvironmentForm.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component CreateEnvironmentForm
 * @description Form for creating a new environment
 */

// == Types ==
struct CreateEnvironmentFormProps {
    let onSuccess: () -> Void
    let onCancel: () -> Void

    init(
        onSuccess: @escaping () -> Void,
        onCancel: @escaping () -> Void
    ) {
        self.onSuccess = onSuccess
        self.onCancel = onCancel
    }
}

// == View ==
struct CreateEnvironmentForm: View {
    // == Properties ==
    let props: CreateEnvironmentFormProps

    // == State ==
    @State private var name: String = ""
    @State private var description: String = ""
    @State private var isDefault: Bool = false
    @State private var isSubmitting: Bool = false
    @State private var errorMessage: String? = nil

    // == Body ==
    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: 16) {
                // Header
                Text("Create New Environment")
                    .font(.headline)
                    .foregroundColor(.appText)

                // Error message
                if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .font(.subheadline)
                        .foregroundColor(.appError)
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color.appError.opacity(0.1))
                        .cornerRadius(8)
                }

                // Name field
                VStack(alignment: .leading, spacing: 4) {
                    Text("Name")
                        .font(.subheadline)
                        .foregroundColor(.appSecondaryText)

                    TextField("e.g., Production, Staging, Development", text: $name)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .background(Color.appSecondaryBackground)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.appBorder, lineWidth: 1)
                        )
                        .disabled(isSubmitting)
                }

                // Description field
                VStack(alignment: .leading, spacing: 4) {
                    Text("Description")
                        .font(.subheadline)
                        .foregroundColor(.appSecondaryText)

                    TextEditor(text: $description)
                        .frame(minHeight: 100)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.appSecondaryBackground)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.appBorder, lineWidth: 1)
                        )
                        .disabled(isSubmitting)
                }

                // Default checkbox
                Toggle(isOn: $isDefault) {
                    Text("Set as default environment")
                        .font(.subheadline)
                        .foregroundColor(.appText)
                }
                .disabled(isSubmitting)

                // Action buttons
                VStack(spacing: 8) {
                    AppButton("Create Environment", variant: .primary, isLoading: isSubmitting, disabled: isSubmitting, fullWidth: true, action: {
                        submitForm()
                    })

                    AppButton("Cancel", variant: .outline, disabled: isSubmitting, fullWidth: true, action: {
                        props.onCancel()
                    })
                }
                .padding(.top, 8)
            }
        }
    }

    // == Actions ==
    private func submitForm() {
        // Validate form
        if name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            errorMessage = "Name is required"
            return
        }

        if description.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            errorMessage = "Description is required"
            return
        }

        // Submit form
        isSubmitting = true
        errorMessage = nil

        Task {
            let success = await createEnvironment()

            if success {
                await MainActor.run {
                    isSubmitting = false
                    props.onSuccess()
                }
            } else {
                await MainActor.run {
                    isSubmitting = false
                    errorMessage = "Failed to create environment. Please try again."
                }
            }
        }
    }

    // == API Calls ==
    private func createEnvironment() async -> Bool {
        do {
            let data = CreateEnvironment(
                name: name,
                description: description,
                isDefault: isDefault
            )

            let _ = try await DefaultEnvironmentService().createEnvironment(data: data)

            return true
        } catch {
            print("Error creating environment: \(error)")
            return false
        }
    }

    // == Initializers ==
    init(
        onSuccess: @escaping () -> Void,
        onCancel: @escaping () -> Void
    ) {
        self.props = CreateEnvironmentFormProps(
            onSuccess: onSuccess,
            onCancel: onCancel
        )
    }
}

// == Preview ==
#Preview {
    CreateEnvironmentForm(
        onSuccess: {},
        onCancel: {}
    )
    .padding()
}
