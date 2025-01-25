"use Client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import React, { useContext, useEffect, useState } from 'react'

const WorkSpaceHistory = () => {

    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const convex = useConvex();
    const [workspaceList, setWorkSpaceList] = useState();

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

    return (
        <div>
            <h2 className='font-medium text-lg '>Your Chats</h2>
            <div>
                {workspaceList && workspaceList?.map((workspace, index) => (
                    <h2 key={index} className='text-sm text-gray-400 mt-2 font-light hover:text-white
                    '>
                        {workspace?.messages[0]?.content}

                    </h2>
                ))}
            </div>
        </div>
    );
};

export default WorkSpaceHistory;