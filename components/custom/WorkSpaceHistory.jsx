"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const WorkSpaceHistory = () => {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const convex = useConvex();
    const [workspaceList, setWorkSpaceList] = useState();
    const router = useRouter();

    useEffect(() => {
        if (userDetail?.userId) {
            GetAllWorkspace();
        }
    }, [userDetail]);

    const GetAllWorkspace = async () => {
        try {
            if (!userDetail?.userId) return;

            const result = await convex.query(api.workspace.GetAllWorkspaces, {
                userId: userDetail.userId
            });
            setWorkSpaceList(result);
        } catch (error) {
            console.error("Error fetching workspaces:", error);
        }
    };

    const handleWorkspaceClick = (workspace) => {
        if (workspace?._id) {
            router.push(`/workspace/${workspace._id}`);
        }
    };

    return (
        <div>
            <h2 className='font-medium text-lg'>Your Chats</h2>
            <div>
                {workspaceList && workspaceList?.map((workspace, index) => (
                    <div
                        key={workspace._id || index}
                        onClick={() => handleWorkspaceClick(workspace)}
                        className='text-sm text-gray-400 mt-2 font-light cursor-pointer hover:bg-gray-800 p-2 rounded'
                    >
                        {workspace?.messages[0]?.content || "New Chat"}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkSpaceHistory;