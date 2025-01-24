"use client"
import React, { useContext } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import uuid4 from "uuid4";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'next/navigation'

function SignInDialog({ openDialog, closeDialog, redirectPath }) {
    const router = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);
    const CreateWorkSpace = useMutation(api.workspace.CreateWorkSpace); // Fix: workspaces -> workspace

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
                );

                const user = userInfo.data;
                const generatedId = uuid4();

                console.log("Creating user with ID:", generatedId);
                const createdUser = await CreateUser({
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                    userId: generatedId,
                });

                if (!createdUser) {
                    throw new Error("Failed to create user");
                }

                // Store complete user data
                const userToStore = {
                    ...user,
                    ...createdUser,
                    userId: generatedId
                };

                localStorage.setItem("user", JSON.stringify(userToStore));
                setUserDetail(userToStore);

                // Wait for user creation to complete
                await new Promise(resolve => setTimeout(resolve, 1500));

                closeDialog(false);

                // Create workspace with verified user
                const workspaceId = await CreateWorkSpace({
                    userId: generatedId,
                    messages: [{
                        role: "system",
                        content: "New Workspace"
                    }]
                });

                if (workspaceId) {
                    router.push(`/workspace/${workspaceId}`);
                }
            } catch (error) {
                console.error("Error in login flow:", error);
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <h2 className="font-bold text-center text-2xl text-white">
                                {Lookup.SIGNIN_HEADING}
                            </h2>
                            <p className="mt-2 text-center text-xl">{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button
                                className="bg-blue-500 text-white  hover:bg-blue-400 mt-3 text-lg"
                                onClick={googleLogin}
                            >
                                Sign In With Google
                            </Button>
                            <p>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog;
