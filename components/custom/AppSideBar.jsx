"use client"
import React, { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { UserDetailContext } from '@/context/UserDetailContext'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from '../ui/button'
import { MessageCircleCode } from 'lucide-react'
import WorkSpaceHistory from './WorkSpaceHistory'

function AppSideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const isWorkspacePage = pathname?.includes('/workspace');

    if (!isWorkspacePage) return null;

    return (
        <Sidebar className="w-80 border-r">
            <SidebarHeader className='p-7'>
                {/* ...existing header content... */}
            </SidebarHeader>
            <SidebarContent className='p-7'>
                <Button onClick={() => router.push('/')}>
                    <MessageCircleCode className="mr-2" />  Start New Chat
                </Button>
                <SidebarGroup />
                <WorkSpaceHistory />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSideBar