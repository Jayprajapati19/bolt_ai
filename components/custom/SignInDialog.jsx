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

    const { userDeatail, setUserDetail } = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            const user = userInfo.data;
            await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
                uid: uuidv4(),
            });

            if (typeof window !== undefined) {
                localStorage.setItem('user', JSON.stringify(user));


            }

            setUserDetail(userInfo?.data)
            // save this inside our Databases;
            closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });



    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription >
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <h2 className='font-bold text-2xl text-white text-center'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='mt-2 text-center '>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button
                                onClick={googleLogin}
                                className='bg-blue-500 text-white hover:bg-blue-400
                            mt-3 text-xl
                            '>Sign In with Google
                            </Button>
                            <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}


export default SignInDialog