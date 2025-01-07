import { Ban, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

interface iAppProps {
    title: string
    description: string
    buttonText: string
    href: string
}

const EmptyState = ({title, description, buttonText, href}: iAppProps) => {
  return (
    <div className='flex flex-col flex-1 items-center justify-center h-full rounded-md border2 border border-dashed p-8 text-center animate-in fade-in-50'>
        <div className='flex items-center justify-center size-20 rounded-full bg-primary/10'>
            <Ban className='size-10 text-primary'/>
        </div>
        <h4 className='mt-6 text-xl font-semibold'>{title}</h4>
        <p className='mb-8 mt-2 text-sm text-muted-foreground max-w-xm mx-auto text-center'>{description}</p>
        <Link href={href} className={buttonVariants()}>
            <PlusCircle className='size-4 mr-2'/>{buttonText}
        </Link>
    </div>
  )
}

export default EmptyState