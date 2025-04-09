//
//  Button.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component Button
 * @description A versatile button component with various styles and states
 */

// == Types ==
public enum ButtonVariant {
    case primary
    case secondary
    case outline
    case ghost
    case danger
}

public enum ButtonSize {
    case sm
    case md
    case lg
}

public struct ButtonProps {
    let variant: ButtonVariant
    let size: ButtonSize
    let isLoading: Bool
    let disabled: Bool
    let fullWidth: Bool
    let action: () -> Void
    
    public init(
        variant: ButtonVariant = .primary,
        size: ButtonSize = .md,
        isLoading: Bool = false,
        disabled: Bool = false,
        fullWidth: Bool = false,
        action: @escaping () -> Void
    ) {
        self.variant = variant
        self.size = size
        self.isLoading = isLoading
        self.disabled = disabled
        self.fullWidth = fullWidth
        self.action = action
    }
}

// == View ==
public struct AppButton: View {
    // == Properties ==
    let props: ButtonProps
    let label: String
    var leftIcon: Image?
    var rightIcon: Image?
    
    // == Computed ==
    private var isDisabled: Bool {
        props.disabled || props.isLoading
    }
    
    private var backgroundColor: Color {
        if isDisabled {
            return backgroundColorForVariant.opacity(0.6)
        }
        return backgroundColorForVariant
    }
    
    private var backgroundColorForVariant: Color {
        switch props.variant {
        case .primary:
            return .appPrimary
        case .secondary:
            return Color(.systemGray5)
        case .outline, .ghost:
            return .clear
        case .danger:
            return .appError
        }
    }
    
    private var foregroundColor: Color {
        switch props.variant {
        case .primary, .danger:
            return .white
        case .secondary:
            return .appText
        case .outline, .ghost:
            return props.variant == .outline ? .appPrimary : .appText
        }
    }
    
    private var borderColor: Color? {
        props.variant == .outline ? .appBorder : nil
    }
    
    private var padding: EdgeInsets {
        switch props.size {
        case .sm:
            return EdgeInsets(top: 6, leading: 12, bottom: 6, trailing: 12)
        case .md:
            return EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
        case .lg:
            return EdgeInsets(top: 12, leading: 24, bottom: 12, trailing: 24)
        }
    }
    
    private var fontSize: Font {
        switch props.size {
        case .sm, .md:
            return .system(.subheadline, design: .default).weight(.medium)
        case .lg:
            return .system(.body, design: .default).weight(.medium)
        }
    }
    
    // == Body ==
    public var body: some View {
        Button(action: {
            if !isDisabled {
                props.action()
            }
        }) {
            HStack(spacing: 8) {
                if props.isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: foregroundColor))
                        .scaleEffect(0.7)
                }
                
                if let leftIcon = leftIcon, !props.isLoading {
                    leftIcon
                        .imageScale(.medium)
                }
                
                Text(label)
                    .font(fontSize)
                    .lineLimit(1)
                
                if let rightIcon = rightIcon {
                    rightIcon
                        .imageScale(.medium)
                }
            }
            .padding(padding)
            .frame(maxWidth: props.fullWidth ? .infinity : nil)
            .background(backgroundColor)
            .foregroundColor(foregroundColor)
            .cornerRadius(6)
            .overlay(
                RoundedRectangle(cornerRadius: 6)
                    .stroke(borderColor ?? .clear, lineWidth: props.variant == .outline ? 1 : 0)
            )
            .opacity(isDisabled ? 0.7 : 1.0)
        }
        .disabled(isDisabled)
    }
    
    // == Initializers ==
    public init(
        _ label: String,
        variant: ButtonVariant = .primary,
        size: ButtonSize = .md,
        isLoading: Bool = false,
        disabled: Bool = false,
        fullWidth: Bool = false,
        leftIcon: Image? = nil,
        rightIcon: Image? = nil,
        action: @escaping () -> Void
    ) {
        self.label = label
        self.props = ButtonProps(
            variant: variant,
            size: size,
            isLoading: isLoading,
            disabled: disabled,
            fullWidth: fullWidth,
            action: action
        )
        self.leftIcon = leftIcon
        self.rightIcon = rightIcon
    }
    
    public init(
        _ label: String,
        props: ButtonProps,
        leftIcon: Image? = nil,
        rightIcon: Image? = nil
    ) {
        self.label = label
        self.props = props
        self.leftIcon = leftIcon
        self.rightIcon = rightIcon
    }
}

// == Preview ==
#Preview {
    VStack(spacing: 20) {
        AppButton("Primary Button", action: {})
        
        AppButton("Secondary Button", variant: .secondary, action: {})
        
        AppButton("Outline Button", variant: .outline, action: {})
        
        AppButton("Ghost Button", variant: .ghost, action: {})
        
        AppButton("Danger Button", variant: .danger, action: {})
        
        AppButton("Loading Button", isLoading: true, action: {})
        
        AppButton("Disabled Button", disabled: true, action: {})
        
        AppButton("Full Width Button", fullWidth: true, action: {})
        
        AppButton(
            "Button with Icons",
            leftIcon: Image(systemName: "star.fill"),
            rightIcon: Image(systemName: "arrow.right"),
            action: {}
        )
    }
    .padding()
}
