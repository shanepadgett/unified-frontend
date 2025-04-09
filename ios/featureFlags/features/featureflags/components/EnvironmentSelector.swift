//
//  EnvironmentSelector.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component EnvironmentSelector
 * @description A dropdown for selecting the current environment
 */

// == Types ==
struct EnvironmentSelectorProps {
    let selectedEnvironment: String
    let onChange: (String) -> Void

    init(
        selectedEnvironment: String,
        onChange: @escaping (String) -> Void
    ) {
        self.selectedEnvironment = selectedEnvironment
        self.onChange = onChange
    }
}

// == View ==
struct EnvironmentSelector: View {
    // == Properties ==
    let props: EnvironmentSelectorProps

    // == State ==
    @State private var environments = [
        "development",
        "staging",
        "production"
    ]

    // == Body ==
    var body: some View {
        Menu {
            ForEach(environments, id: \.self) { environment in
                Button(action: {
                    props.onChange(environment)
                }) {
                    HStack {
                        Text(environment.capitalized)

                        if environment == props.selectedEnvironment {
                            Spacer()
                            Image(systemName: "checkmark")
                        }
                    }
                }
            }
        } label: {
            HStack {
                Text(props.selectedEnvironment.capitalized)
                    .foregroundColor(.appText)

                Spacer()

                Image(systemName: "chevron.down")
                    .font(.caption)
                    .foregroundColor(.appSecondaryText)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Color.appSecondaryBackground)
            .cornerRadius(8)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.appBorder, lineWidth: 1)
            )
        }
    }

    // == Initializers ==
    init(
        selectedEnvironment: String,
        onChange: @escaping (String) -> Void
    ) {
        self.props = EnvironmentSelectorProps(
            selectedEnvironment: selectedEnvironment,
            onChange: onChange
        )
    }
}

// == Preview ==
#Preview {
    @Previewable @State var selectedEnvironment = "development"

    return VStack {
        EnvironmentSelector(
            selectedEnvironment: selectedEnvironment,
            onChange: { newEnvironment in
                selectedEnvironment = newEnvironment
            }
        )
        .frame(width: 200)

        Text("Selected: \(selectedEnvironment)")
            .padding(.top, 20)
    }
    .padding()
}
