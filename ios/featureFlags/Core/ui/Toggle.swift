//
//  Toggle.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component AppToggle
 * @description A wrapper around the native SwiftUI Toggle with additional functionality
 */

// == Types ==
public struct ToggleProps {
    let helperText: String?
    let tint: Color?

    public init(
        helperText: String? = nil,
        tint: Color? = nil
    ) {
        self.helperText = helperText
        self.tint = tint
    }
}

// == View ==
public struct AppToggle: View {
    // == Properties ==
    let props: ToggleProps
    let label: String?
    @Binding var isOn: Bool
    var disabled: Bool = false

    // == Body ==
    public var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            if let label = label {
                Toggle(label, isOn: $isOn)
                    .tint(props.tint ?? Color.accentColor)
                    .disabled(disabled)
            } else {
                Toggle("", isOn: $isOn)
                    .tint(props.tint ?? Color.accentColor)
                    .disabled(disabled)
                    .labelsHidden()
            }

            if let helperText = props.helperText, !helperText.isEmpty {
                Text(helperText)
                    .font(.caption)
                    .foregroundColor(.appSecondaryText)
                    .padding(.top, 2)
            }
        }
    }

    // == Initializers ==
    public init(
        _ label: String? = nil,
        isOn: Binding<Bool>,
        helperText: String? = nil,
        tint: Color? = nil,
        disabled: Bool = false
    ) {
        self.label = label
        self._isOn = isOn
        self.props = ToggleProps(
            helperText: helperText,
            tint: tint
        )
        self.disabled = disabled
    }

    public init(
        _ label: String? = nil,
        isOn: Binding<Bool>,
        props: ToggleProps,
        disabled: Bool = false
    ) {
        self.label = label
        self._isOn = isOn
        self.props = props
        self.disabled = disabled
    }
}

// == Preview ==
#Preview {
    @Previewable @State var toggle1 = true
    @Previewable @State var toggle2 = false
    @Previewable @State var toggle3 = true
    @Previewable @State var toggle4 = false

    return VStack(alignment: .leading, spacing: 20) {
        AppToggle("Basic Toggle", isOn: $toggle1)

        AppToggle(isOn: $toggle2)

        AppToggle("Custom Tint", isOn: $toggle3, tint: .red)

        AppToggle("Blue Tint", isOn: $toggle1, tint: .blue)

        AppToggle("Disabled Toggle", isOn: $toggle4, disabled: true)

        AppToggle("Toggle with Helper Text", isOn: $toggle1, helperText: "This is a helper text")
    }
    .padding()
}
