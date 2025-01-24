"use client"
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserDetailContext } from '@/context/UserDetailContext'
import AppSideBar from "@/components/custom/AppSideBar"

export default function WorkspaceLayout({ children }) {
    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter();

    useEffect(() => {
        if (!userDetail?.userId) {
            router.push('/');
        }
    }, [userDetail, router]);

    if (!userDetail?.userId) {
        return null;
    }

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <AppSideBar />
            <main className="flex-1 overflow-auto p-4">
                {children}
            </main>
        </div>
    )
}
