//
//  LoadingIndicator.swift
//  featureFlags
//
//  Created by Shane Padgett on 4/8/25.
//

import SwiftUI

/**
 * @component LoadingIndicator
 * @description Loading indicator components
 */

// == Types ==
public enum LoadingIndicatorSize {
    case sm
    case md
    case lg
    
    var dimension: CGFloat {
        switch self {
        case .sm:
            return 16
        case .md:
            return 24
        case .lg:
            return 32
        }
    }
    
    var strokeWidth: CGFloat {
        switch self {
        case .sm:
            return 2
        case .md:
            return 3
        case .lg:
            return 4
        }
    }
}

// == LoadingIndicator ==
public struct LoadingIndicator: View {
    // == Properties ==
    let size: LoadingIndicatorSize
    let color: Color
    
    // == Body ==
    public var body: some View {
        ZStack {
            Circle()
                .stroke(
                    color.opacity(0.25),
                    lineWidth: size.strokeWidth
                )
            
            Circle()
                .trim(from: 0, to: 0.75)
                .stroke(
                    color,
                    style: StrokeStyle(
                        lineWidth: size.strokeWidth,
                        lineCap: .round
                    )
                )
                .rotationEffect(.degrees(rotation))
                .animation(
                    Animation.linear(duration: 1)
                        .repeatForever(autoreverses: false),
                    value: rotation
                )
                .onAppear {
                    self.rotation = 360
                }
        }
        .frame(width: size.dimension, height: size.dimension)
    }
    
    // == State ==
    @State private var rotation: Double = 0
    
    // == Initializers ==
    public init(
        size: LoadingIndicatorSize = .md,
        color: Color = .blue
    ) {
        self.size = size
        self.color = color
    }
}

// == PageLoading ==
public struct PageLoading: View {
    // == Body ==
    public var body: some View {
        ZStack {
            Color(.systemBackground)
                .opacity(0.8)
                .edgesIgnoringSafeArea(.all)
            
            LoadingIndicator(size: .lg)
        }
    }
    
    // == Initializers ==
    public init() {}
}

// == Preview ==
#Preview {
    VStack(spacing: 40) {
        LoadingIndicator(size: .sm)
        LoadingIndicator(size: .md)
        LoadingIndicator(size: .lg)
        LoadingIndicator(size: .md, color: .red)
        
        PageLoading()
            .frame(height: 200)
    }
    .padding()
}
