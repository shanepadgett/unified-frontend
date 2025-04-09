//
//  Card.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component Card
 * @description A card component for containing content
 */

// == Types ==
public enum CardPadding {
    case none
    case sm
    case md
    case lg
}

public struct CardProps {
    let padding: CardPadding
    let hoverable: Bool
    let bordered: Bool

    public init(
        padding: CardPadding = .md,
        hoverable: Bool = false,
        bordered: Bool = true
    ) {
        self.padding = padding
        self.hoverable = hoverable
        self.bordered = bordered
    }
}

// == Views ==
public struct Card<Content: View>: View {
    // == Properties ==
    let props: CardProps
    let content: Content

    // == Computed ==
    private var paddingValue: EdgeInsets {
        switch props.padding {
        case .none:
            return EdgeInsets()
        case .sm:
            return EdgeInsets(top: 12, leading: 12, bottom: 12, trailing: 12)
        case .md:
            return EdgeInsets(top: 16, leading: 16, bottom: 16, trailing: 16)
        case .lg:
            return EdgeInsets(top: 24, leading: 24, bottom: 24, trailing: 24)
        }
    }

    // == Body ==
    public var body: some View {
        content
            .padding(paddingValue)
            .background(Color.appSecondaryBackground)
            .cornerRadius(8)
            .shadow(color: Color.black.opacity(0.1), radius: 2, x: 0, y: 1)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(props.bordered ? Color.appBorder : Color.clear, lineWidth: 1)
            )
    }

    // == Initializers ==
    public init(
        padding: CardPadding = .md,
        hoverable: Bool = false,
        bordered: Bool = true,
        @ViewBuilder content: () -> Content
    ) {
        self.props = CardProps(
            padding: padding,
            hoverable: hoverable,
            bordered: bordered
        )
        self.content = content()
    }

    public init(
        props: CardProps,
        @ViewBuilder content: () -> Content
    ) {
        self.props = props
        self.content = content()
    }
}

public struct CardHeader<Content: View>: View {
    let content: Content

    public var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            content
            Divider()
        }
    }

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
}

public struct CardBody<Content: View>: View {
    let content: Content

    public var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            content
        }
    }

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
}

public struct CardFooter<Content: View>: View {
    let content: Content

    public var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            content
        }
    }

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
}

// == Preview ==
#Preview {
    VStack(spacing: 20) {
        // Basic card
        Card {
            Text("Basic Card")
                .font(.headline)
        }

        // Card with header and footer
        Card {
            CardHeader {
                Text("Card Header")
                    .font(.headline)
            }

            CardBody {
                Text("Card Body Content")
                    .font(.body)
            }

            CardFooter {
                Text("Card Footer")
                    .font(.caption)
            }
        }

        // Card with different padding
        Card(padding: .lg) {
            Text("Card with Large Padding")
                .font(.headline)
        }

        // Card without border
        Card(bordered: false) {
            Text("Card without Border")
                .font(.headline)
        }
    }
    .padding()
}
