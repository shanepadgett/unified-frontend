# Core UI Components

This directory contains reusable SwiftUI components for the iOS app, following native SwiftUI patterns while maintaining our unified architecture principles.

## Components

### Button

A versatile button component with various styles and states.

```swift
import SwiftUI

// Basic usage
AppButton("Click me", action: {})

// Variants
AppButton("Primary", variant: .primary, action: {})
AppButton("Secondary", variant: .secondary, action: {})
AppButton("Outline", variant: .outline, action: {})
AppButton("Ghost", variant: .ghost, action: {})
AppButton("Danger", variant: .danger, action: {})

// Sizes
AppButton("Small", size: .sm, action: {})
AppButton("Medium", size: .md, action: {})
AppButton("Large", size: .lg, action: {})

// With icons
AppButton(
    "With Left Icon",
    leftIcon: Image(systemName: "star.fill"),
    action: {}
)
AppButton(
    "With Right Icon",
    rightIcon: Image(systemName: "arrow.right"),
    action: {}
)

// States
AppButton("Loading", isLoading: true, action: {})
AppButton("Disabled", disabled: true, action: {})

// Full width
AppButton("Full Width", fullWidth: true, action: {})
```

### TextField

A flexible text input component with various styles and states.

```swift
import SwiftUI

// Basic usage
@State var text = ""
AppTextField(text: $text, placeholder: "Enter text")

// With label
AppTextField("Email", text: $text, placeholder: "Enter your email")

// Variants
AppTextField(text: $text, variant: .outline, placeholder: "Outline variant")
AppTextField(text: $text, variant: .filled, placeholder: "Filled variant")

// Sizes
AppTextField(text: $text, size: .sm, placeholder: "Small")
AppTextField(text: $text, size: .md, placeholder: "Medium")
AppTextField(text: $text, size: .lg, placeholder: "Large")

// With icons
AppTextField(
    text: $text,
    placeholder: "With left icon",
    leftIcon: Image(systemName: "magnifyingglass")
)
AppTextField(
    text: $text,
    placeholder: "With right icon",
    rightIcon: Image(systemName: "xmark.circle.fill")
)

// With error
AppTextField(
    text: $text,
    placeholder: "Error state",
    error: "This field is required"
)

// With helper text
AppTextField(
    text: $text,
    placeholder: "With helper text",
    helperText: "This is a helper text"
)
```

### Card

A card component for containing content.

```swift
import SwiftUI

// Basic usage
Card {
    Text("Card content")
}

// With header and footer
Card {
    CardHeader {
        Text("Card Header")
    }

    CardBody {
        Text("Card Body")
    }

    CardFooter {
        Text("Card Footer")
    }
}

// Padding options
Card(padding: .none) {
    Text("No padding")
}
Card(padding: .sm) {
    Text("Small padding")
}
Card(padding: .md) {
    Text("Medium padding")
}
Card(padding: .lg) {
    Text("Large padding")
}

// Without border
Card(bordered: false) {
    Text("Card without border")
}
```

### Toggle

A wrapper around the native SwiftUI Toggle with additional functionality.

```swift
import SwiftUI

// Basic usage
@State var isOn = false
AppToggle(isOn: $isOn)

// With label
AppToggle("Enable notifications", isOn: $isOn)

// Custom tint color (uses system accent color by default)
AppToggle("Custom Tint", isOn: $isOn, tint: .red)

// Disabled
AppToggle("Disabled toggle", isOn: $isOn, disabled: true)

// With helper text
AppToggle(
    "With helper text",
    isOn: $isOn,
    helperText: "This is a helper text"
)
```

### LoadingIndicator

Loading indicator components.

```swift
import SwiftUI

// Basic usage
LoadingIndicator()

// Sizes
LoadingIndicator(size: .sm)
LoadingIndicator(size: .md)
LoadingIndicator(size: .lg)

// Custom color
LoadingIndicator(color: .red)

// Page loading
PageLoading()
```

### EmptyStateView

A view to display when there is no content to show.

```swift
import SwiftUI

// Basic usage
EmptyStateView(
    title: "No Items Found",
    message: "There are no items to display at this time."
)

// With custom icon
EmptyStateView(
    title: "No Search Results",
    message: "Try adjusting your search criteria.",
    icon: Image(systemName: "magnifyingglass")
)

// With action button
EmptyStateView(
    title: "No Feature Flags",
    message: "You haven't created any feature flags yet.",
    icon: Image(systemName: "flag.fill"),
    buttonTitle: "Create Flag",
    buttonAction: {}
)
```

### TabBar

A tab bar component for iOS-style tab navigation with proper background handling.

```swift
import SwiftUI

// Define tabs
@State var selectedTab = "flags"

let tabs = [
    TabItem(
        id: "flags",
        title: "Flags",
        icon: Image(systemName: "flag"),
        selectedIcon: Image(systemName: "flag.fill")
    ),
    TabItem(
        id: "environments",
        title: "Environments",
        icon: Image(systemName: "server.rack"),
        selectedIcon: Image(systemName: "server.rack.fill")
    )
]

// Use in a view
AppTabView(tabs: tabs, selectedTab: $selectedTab) {
    ZStack {
        if selectedTab == "flags" {
            // Feature flags content
            Text("Feature Flags Tab")
        } else {
            // Environments content
            Text("Environments Tab")
        }
    }
}
```

Note: This component uses the native SwiftUI background handling to ensure proper appearance in both light and dark mode.

## Usage Guidelines

- Import components directly from the core UI directory:
  ```swift
  import SwiftUI

  struct MyView: View {
      @State private var text = ""
      @State private var isToggled = false

      var body: some View {
          VStack {
              AppTextField("Input", text: $text)
              AppToggle("Toggle", isOn: $isToggled)
              AppButton("Submit", action: {})
          }
      }
  }
  ```

- Follow the component patterns and naming conventions from the iOS feature architecture.
- Use the provided props structs for configuring components.
- Leverage native SwiftUI patterns and behaviors while maintaining consistent styling.
