import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

function Header() {
    return (
        <div className='flex flex-row justify-between items-center p-4'>

            <Image src={'/logo.png'} alt='Logo' width={40} height={40} />

            <div className="flex gap-4 ">
                <Button variant="outline"
                >Sign In</Button>
                <Button className="bg-blue-500 " variant="outline">Get Started</Button>
            </div>



        </div>
    )
}

export default Header