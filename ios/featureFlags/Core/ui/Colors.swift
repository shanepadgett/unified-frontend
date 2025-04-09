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
    static let primary = Color("Primary")

    // Background colors
    static let background = Color("Background")
    static let secondaryBackground = Color("SecondaryBackground")

    // Text colors
    static let text = Color("Text")
    static let secondaryText = Color("SecondaryText")
    static let tertiaryText = Color("TertiaryText")

    // Border colors
    static let border = Color("Border")

    // Status colors
    static let success = Color("Success")
    static let warning = Color("Warning")
    static let error = Color("Error")
    static let info = Color("Info")

    // Dark mode specific colors
    struct Dark {
        static let background = Color("DarkBackground")
        static let card = Color("DarkCard")
        static let border = Color("DarkBorder")
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
