//
//  TextField.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component TextField
 * @description A flexible text input component with various styles and states
 */

// == Types ==
public enum TextFieldSize {
    case sm
    case md
    case lg
}

public enum TextFieldVariant {
    case outline
    case filled
}

public struct TextFieldProps {
    let placeholder: String
    let size: TextFieldSize
    let variant: TextFieldVariant
    let error: String?
    let helperText: String?
    let fullWidth: Bool
    let disabled: Bool
    
    public init(
        placeholder: String = "",
        size: TextFieldSize = .md,
        variant: TextFieldVariant = .outline,
        error: String? = nil,
        helperText: String? = nil,
        fullWidth: Bool = true,
        disabled: Bool = false
    ) {
        self.placeholder = placeholder
        self.size = size
        self.variant = variant
        self.error = error
        self.helperText = helperText
        self.fullWidth = fullWidth
        self.disabled = disabled
    }
}

// == View ==
public struct AppTextField: View {
    // == Properties ==
    let props: TextFieldProps
    let label: String?
    @Binding var text: String
    var leftIcon: Image?
    var rightIcon: Image?
    
    // == Computed ==
    private var backgroundColor: Color {
        switch props.variant {
        case .outline:
            return .clear
        case .filled:
            return Color(.systemGray6)
        }
    }
    
    private var borderColor: Color {
        if let error = props.error, !error.isEmpty {
            return .appError
        }
        return props.variant == .outline ? .appBorder : .clear
    }
    
    private var padding: EdgeInsets {
        switch props.size {
        case .sm:
            return EdgeInsets(top: 6, leading: 12, bottom: 6, trailing: 12)
        case .md:
            return EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
        case .lg:
            return EdgeInsets(top: 10, leading: 16, bottom: 10, trailing: 16)
        }
    }
    
    private var fontSize: Font {
        switch props.size {
        case .sm:
            return .system(.footnote)
        case .md:
            return .system(.body)
        case .lg:
            return .system(.title3)
        }
    }
    
    private var labelFont: Font {
        switch props.size {
        case .sm:
            return .system(.caption)
        case .md:
            return .system(.footnote)
        case .lg:
            return .system(.subheadline)
        }
    }
    
    private var helperFont: Font {
        .system(.caption)
    }
    
    // == Body ==
    public var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            if let label = label {
                Text(label)
                    .font(labelFont)
                    .fontWeight(.medium)
                    .foregroundColor(.appText)
            }
            
            HStack(spacing: 8) {
                if let leftIcon = leftIcon {
                    leftIcon
                        .foregroundColor(.appSecondaryText)
                }
                
                TextField(props.placeholder, text: $text)
                    .font(fontSize)
                    .disabled(props.disabled)
                    .opacity(props.disabled ? 0.6 : 1.0)
                
                if let rightIcon = rightIcon {
                    rightIcon
                        .foregroundColor(.appSecondaryText)
                }
            }
            .padding(padding)
            .frame(maxWidth: props.fullWidth ? .infinity : nil)
            .background(backgroundColor)
            .cornerRadius(6)
            .overlay(
                RoundedRectangle(cornerRadius: 6)
                    .stroke(borderColor, lineWidth: 1)
            )
            
            if let error = props.error, !error.isEmpty {
                Text(error)
                    .font(helperFont)
                    .foregroundColor(.appError)
                    .padding(.top, 2)
            } else if let helperText = props.helperText, !helperText.isEmpty {
                Text(helperText)
                    .font(helperFont)
                    .foregroundColor(.appSecondaryText)
                    .padding(.top, 2)
            }
        }
    }
    
    // == Initializers ==
    public init(
        _ label: String? = nil,
        text: Binding<String>,
        placeholder: String = "",
        size: TextFieldSize = .md,
        variant: TextFieldVariant = .outline,
        error: String? = nil,
        helperText: String? = nil,
        fullWidth: Bool = true,
        disabled: Bool = false,
        leftIcon: Image? = nil,
        rightIcon: Image? = nil
    ) {
        self.label = label
        self._text = text
        self.props = TextFieldProps(
            placeholder: placeholder,
            size: size,
            variant: variant,
            error: error,
            helperText: helperText,
            fullWidth: fullWidth,
            disabled: disabled
        )
        self.leftIcon = leftIcon
        self.rightIcon = rightIcon
    }
    
    public init(
        _ label: String? = nil,
        text: Binding<String>,
        props: TextFieldProps,
        leftIcon: Image? = nil,
        rightIcon: Image? = nil
    ) {
        self.label = label
        self._text = text
        self.props = props
        self.leftIcon = leftIcon
        self.rightIcon = rightIcon
    }
}

// == Preview ==
#Preview {
    @Previewable @State var text1 = ""
    @Previewable @State var text2 = "Input with value"
    @Previewable @State var text3 = ""
    @Previewable @State var text4 = ""
    @Previewable @State var text5 = ""
    
    return VStack(spacing: 20) {
        AppTextField("Basic Input", text: $text1, placeholder: "Enter text")
        
        AppTextField("Filled Input", text: $text2, variant: .filled)
        
        AppTextField("Input with Error", text: $text3, placeholder: "Enter email", error: "Invalid email format")
        
        AppTextField("Input with Helper", text: $text4, placeholder: "Enter password", helperText: "Password must be at least 8 characters")
        
        AppTextField(
            "Input with Icons",
            text: $text5,
            placeholder: "Search...",
            leftIcon: Image(systemName: "magnifyingglass"),
            rightIcon: Image(systemName: "xmark.circle.fill")
        )
    }
    .padding()
}
