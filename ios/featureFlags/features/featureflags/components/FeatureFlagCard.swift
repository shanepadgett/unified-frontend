//
//  FeatureFlagCard.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component FeatureFlagCard
 * @description Displays a feature flag with toggle functionality
 */

// == Types ==
struct FeatureFlagCardProps {
    let flag: FeatureFlag
    let onToggle: (String, Bool) -> Void
    let isLoading: Bool

    init(
        flag: FeatureFlag,
        onToggle: @escaping (String, Bool) -> Void,
        isLoading: Bool = false
    ) {
        self.flag = flag
        self.onToggle = onToggle
        self.isLoading = isLoading
    }
}

// == View ==
struct FeatureFlagCard: View {
    // == Properties ==
    let props: FeatureFlagCardProps

    // == Computed ==
    private var formattedDate: String? {
        guard let lastModified = props.flag.lastModified else { return nil }
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: lastModified)
    }

    // == Body ==
    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: 12) {
                // Header with name and toggle
                HStack {
                    Text(props.flag.name)
                        .font(.headline)
                        .foregroundColor(.appText)

                    Spacer()

                    AppToggle(isOn: Binding(
                        get: { props.flag.enabled },
                        set: { newValue in
                            props.onToggle(props.flag.id, newValue)
                        }
                    ))
                    .disabled(props.isLoading)
                }

                // Description
                Text(props.flag.description)
                    .font(.subheadline)
                    .foregroundColor(.appSecondaryText)
                    .lineLimit(2)

                // Tags
                HStack(spacing: 8) {
                    // Environment tag
                    Text(props.flag.environment)
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.blue.opacity(0.2))
                        .foregroundColor(.blue)
                        .cornerRadius(12)

                    // Owner tag (if available)
                    if let owner = props.flag.owner {
                        Text(owner)
                            .font(.caption)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.purple.opacity(0.2))
                            .foregroundColor(.purple)
                            .cornerRadius(12)
                    }

                    // Rollout percentage tag (if available)
                    if let rolloutPercentage = props.flag.rolloutPercentage {
                        Text("\(rolloutPercentage)% rollout")
                            .font(.caption)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.green.opacity(0.2))
                            .foregroundColor(.green)
                            .cornerRadius(12)
                    }
                }

                // Last modified date (if available)
                if let formattedDate = formattedDate {
                    Text("Last modified: \(formattedDate)")
                        .font(.caption)
                        .foregroundColor(.appTertiaryText)
                }
            }
        }
        .padding(.horizontal)
    }

    // == Initializers ==
    init(
        flag: FeatureFlag,
        onToggle: @escaping (String, Bool) -> Void,
        isLoading: Bool = false
    ) {
        self.props = FeatureFlagCardProps(
            flag: flag,
            onToggle: onToggle,
            isLoading: isLoading
        )
    }
}

// == Preview ==
#Preview {
    FeatureFlagCard(
        flag: FeatureFlag.mock(),
        onToggle: { _, _ in }
    )
}
