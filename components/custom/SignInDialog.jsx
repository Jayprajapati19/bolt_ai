import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';


function SignInDialog({ openDialog, closeDialog }) {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
                );

                const user = userInfo.data;
                if (user?.email) {
                    await CreateUser({
                        name: user.name,
                        email: user.email,
                        picture: user.picture,
                        uid: uuidv4(),
                    });

                    if (typeof window !== 'undefined') {
                        localStorage.setItem('user', JSON.stringify(user));
                    }

                    setUserDetail(user);
                    closeDialog(false);
                }
            } catch (error) {
                console.error('Error during sign in:', error);
            }
        },
        onError: errorResponse => console.error('Google login error:', errorResponse),
    });



    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <h2 className='font-bold text-2xl text-white text-center'>{Lookup.SIGNIN_HEADING}</h2>
                        <DialogDescription className='mt-2 text-center'>
                            {Lookup.SIGNIN_SUBHEADING}
                        </DialogDescription>
                        <Button
                            onClick={googleLogin}
                            className='bg-blue-500 text-white hover:bg-blue-400
                            mt-3 text-xl
                            '>Sign In with Google
                        </Button>
                        <DialogDescription>
                            {Lookup?.SIGNIn_AGREEMENT_TEXT}
                        </DialogDescription>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}


export default SignInDialog