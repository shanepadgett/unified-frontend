//
//  SearchInput.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component SearchInput
 * @description A search input field with clear button
 */

// == Types ==
struct SearchInputProps {
    let placeholder: String
    let value: String
    let onChange: (String) -> Void

    init(
        placeholder: String = "Search...",
        value: String,
        onChange: @escaping (String) -> Void
    ) {
        self.placeholder = placeholder
        self.value = value
        self.onChange = onChange
    }
}

// == View ==
struct SearchInput: View {
    // == Properties ==
    let props: SearchInputProps

    // == State ==
    @State private var text: String

    // == Body ==
    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.appSecondaryText)

            TextField(props.placeholder, text: $text)
                .onChange(of: text) { newValue in
                    props.onChange(newValue)
                }

            if !text.isEmpty {
                Button(action: {
                    text = ""
                    props.onChange("")
                }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.appSecondaryText)
                }
            }
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

    // == Initializers ==
    init(
        placeholder: String = "Search...",
        value: String,
        onChange: @escaping (String) -> Void
    ) {
        self.props = SearchInputProps(
            placeholder: placeholder,
            value: value,
            onChange: onChange
        )
        self._text = State(initialValue: value)
    }
}

// == Preview ==
#Preview {
    @Previewable @State var searchText = ""

    return VStack {
        SearchInput(
            placeholder: "Search feature flags...",
            value: searchText,
            onChange: { newValue in
                searchText = newValue
            }
        )

        Text("Search text: \(searchText)")
            .padding(.top, 20)
    }
    .padding()
}
