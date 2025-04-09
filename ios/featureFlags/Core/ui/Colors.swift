//
//  Colors.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component Colors
 * @description Core color definitions for the application
 */
struct AppColors {
    // Primary colors
    static let primary = Color("Primary", bundle: nil)
    
    // Background colors
    static let background = Color(UIColor.systemBackground)
    static let secondaryBackground = Color(UIColor.secondarySystemBackground)
    
    // Text colors
    static let text = Color(UIColor.label)
    static let secondaryText = Color(UIColor.secondaryLabel)
    static let tertiaryText = Color(UIColor.tertiaryLabel)
    
    // Border colors
    static let border = Color(UIColor.separator)
    
    // Status colors
    static let success = Color.green
    static let warning = Color.yellow
    static let error = Color.red
    static let info = Color.blue
    
    // Dark mode specific colors
    struct Dark {
        static let background = Color("DarkBackground", bundle: nil)
        static let card = Color("DarkCard", bundle: nil)
        static let border = Color("DarkBorder", bundle: nil)
    }
}

// Extension to provide easy access to colors with dark mode support
extension Color {
    static let appPrimary = AppColors.primary
    static let appBackground = AppColors.background
    static let appSecondaryBackground = AppColors.secondaryBackground
    static let appText = AppColors.text
    static let appSecondaryText = AppColors.secondaryText
    static let appTertiaryText = AppColors.tertiaryText
    static let appBorder = AppColors.border
    static let appSuccess = AppColors.success
    static let appWarning = AppColors.warning
    static let appError = AppColors.error
    static let appInfo = AppColors.info
    
    // Dark mode specific
    static let appDarkBackground = AppColors.Dark.background
    static let appDarkCard = AppColors.Dark.card
    static let appDarkBorder = AppColors.Dark.border
}
