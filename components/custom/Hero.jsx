"use client"

import Lookup from '@/data/Lookup'
import React, { useContext, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { ArrowRight, Link } from 'lucide-react'
import Colors from '@/data/Colors'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import SignInDialog from './SignInDialog'

function Hero() {
    const [userInput, setUserInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);


    const onGenerate = (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }

        setMessages({
            role: 'user',
            content: input
        })
    }

    return (
        <div className='flex flex-col items-center mt-36 xl:mt-52 gap-2'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-500 font-lg '>{Lookup.HERO_DESC}</p>

            <div className='p-5 border rounded-xl max-w-xl w-full mt-3 '
                style={{
                    backgroundColor: Colors.BACKGROUND,

                }}
            >
                <div className='flex gap-2'>
                    <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
                    />
                    {userInput &&
                        <ArrowRight
                            onClick={() => onGenerate(userInput)}
                            className="bg-blue-500 hover:bg-gray-700 rounded-sm p-1 h-8 w-8 cursor-pointer"
                        />
                    }
                </div>

                <div>
                    <Link className='h-5 w-5 ' />
                </div>
            </div>

            <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
                {Lookup.SUGGSTIONS.map((suggetion, index) => (
                    <h2 key={index}
                        onClick={() => onGenerate(suggetion)}
                        className='p-1 px-2 border rounded-full text-sm text-gray-500 hover:text-white cursor-pointer'
                    >
                        {suggetion}</h2>
                ))}
            </div>
            <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog()} />
        </div >
    )
}

export default Hero