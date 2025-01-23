import Lookup from '@/data/Lookup'
import React from 'react'
import { Textarea } from '../ui/textarea'
import { ArrowRight } from 'lucide-react'

function Hero() {
    return (
        <div className='flex flex-col items-center mt-36 xl:mt-52 gap-2'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-500 font-lg '>{Lookup.HERO_DESC}</p>

            <div className='p-5 border rounded-xl max-w-2xl'>
                <div className='flex gap-2'>
                    <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
                    />
                    <ArrowRight className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />
                </div>


            </div>

        </div>
    )
}

export default Hero