import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/logo.png'
import { buttonVariants } from './ui/button'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5'>
        <Link
            href={'/'}
            className='flex items-center gap-2'
        >
            <Image
                src={Logo}
                alt='Logo'
                className='size-10'
            />
            <h3 className='text-3xl font-semibold'>Invoice <span className='text-blue-500'>Dome</span></h3>
        </Link>
        <Link
            href={'/login'}
            className={buttonVariants()}
        >
            Get Started
        </Link>
    </div>
  )
}

export default Navbar