"use client"

import './globals.css'
import Provider from './provider'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased">
                <ConvexProvider client={convex}>
                    <Provider>{children}</Provider>
                </ConvexProvider>
            </body>
        </html>
    )
}
