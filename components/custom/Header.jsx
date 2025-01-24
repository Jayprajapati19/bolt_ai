import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';

function Header() {
    const { userDetail, setUSerDetail } = useContext(UserDetailContext);


    return (
        <div className='flex flex-row justify-between items-center p-4'>

            <Image src={'/logo.png'} alt='Logo' width={40} height={40} />

            {!userDetail?.name && <div className="flex gap-4 ">
                <Button variant="ghost"
                >Sign In</Button>
                <Button className="text-white " variant="outline"
                    style={{
                        backgroundColor: Colors.BLUE,
                    }}
                >Get Started</Button>
            </div>}



        </div>
    )
}

export default Header