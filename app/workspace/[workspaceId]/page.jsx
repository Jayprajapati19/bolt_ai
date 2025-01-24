"use client"
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import CodeView from '@/components/custom/CodeView';

export default function WorkspacePage() {
    const params = useParams();
    const workspace = useQuery(api.workspace.GetWorkSpace, {
        workspaceId: params.workspaceId
    });

    if (!workspace) {
        return <div className="flex-1 p-4">Loading workspace...</div>;
    }

    return (
        <div className="flex-1">
            <CodeView workspace={workspace} />
        </div>
    );
}
