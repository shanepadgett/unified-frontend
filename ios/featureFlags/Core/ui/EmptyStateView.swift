//
//  EmptyStateView.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component EmptyStateView
 * @description A view to display when there is no content to show
 */

// == Types ==
public struct EmptyStateProps {
    let title: String
    let message: String
    let buttonTitle: String?
    let buttonAction: (() -> Void)?
    
    public init(
        title: String,
        message: String,
        buttonTitle: String? = nil,
        buttonAction: (() -> Void)? = nil
    ) {
        self.title = title
        self.message = message
        self.buttonTitle = buttonTitle
        self.buttonAction = buttonAction
    }
}

// == View ==
public struct EmptyStateView: View {
    // == Properties ==
    let props: EmptyStateProps
    let icon: Image?
    
    // == Body ==
    public var body: some View {
        VStack(spacing: 16) {
            if let icon = icon {
                icon
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 80, height: 80)
                    .foregroundColor(.appSecondaryText)
            } else {
                Image(systemName: "tray")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 80, height: 80)
                    .foregroundColor(.appSecondaryText)
            }
            
            Text(props.title)
                .font(.headline)
                .foregroundColor(.appText)
                .multilineTextAlignment(.center)
            
            Text(props.message)
                .font(.subheadline)
                .foregroundColor(.appSecondaryText)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            
            if let buttonTitle = props.buttonTitle, let buttonAction = props.buttonAction {
                AppButton(buttonTitle, variant: .primary, action: buttonAction)
                    .padding(.top, 8)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
    
    // == Initializers ==
    public init(
        title: String,
        message: String,
        icon: Image? = nil,
        buttonTitle: String? = nil,
        buttonAction: (() -> Void)? = nil
    ) {
        self.props = EmptyStateProps(
            title: title,
            message: message,
            buttonTitle: buttonTitle,
            buttonAction: buttonAction
        )
        self.icon = icon
    }
    
    public init(
        props: EmptyStateProps,
        icon: Image? = nil
    ) {
        self.props = props
        self.icon = icon
    }
}

// == Preview ==
#Preview {
    VStack(spacing: 20) {
        // Basic empty state
        EmptyStateView(
            title: "No Items Found",
            message: "There are no items to display at this time."
        )
        
        // Empty state with custom icon
        EmptyStateView(
            title: "No Search Results",
            message: "Try adjusting your search criteria to find what you're looking for.",
            icon: Image(systemName: "magnifyingglass")
        )
        
        // Empty state with button
        EmptyStateView(
            title: "No Feature Flags",
            message: "You haven't created any feature flags yet.",
            icon: Image(systemName: "flag.fill"),
            buttonTitle: "Create Flag",
            buttonAction: {}
        )
    }
}
