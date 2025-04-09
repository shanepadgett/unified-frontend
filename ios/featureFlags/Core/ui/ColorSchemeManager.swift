//
//  ColorSchemeManager.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component ColorSchemeManager
 * @description Manages the app's color scheme
 */

// == Manager ==
class ColorSchemeManager: ObservableObject {
    @Published var colorScheme: ColorScheme = .dark
    
    static let shared = ColorSchemeManager()
    
    private init() {}
}

// == View Modifier ==
struct ColorSchemeModifier: ViewModifier {
    @ObservedObject var manager = ColorSchemeManager.shared
    
    func body(content: Content) -> some View {
        content
            .preferredColorScheme(manager.colorScheme)
    }
}

// == View Extension ==
extension View {
    func withColorScheme() -> some View {
        self.modifier(ColorSchemeModifier())
    }
}
