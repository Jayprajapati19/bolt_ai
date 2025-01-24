"use client"
import AppSideBar from "@/components/custom/AppSideBar"

export default function WorkspaceLayout({ children }) {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="flex-none">
                <AppSideBar />
            </div>
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}
