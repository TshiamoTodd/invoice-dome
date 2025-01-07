import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import PaidGif from '@/public/paid-gif.gif'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import SubmitButton from '@/components/SubmitButton'
import { markAsPaidAction } from '@/app/actions'
import prisma from '@/app/utils/db'
import { redirect } from 'next/navigation'
import { requireUser } from '@/app/utils/hooks'

const Authourize = async (invoiceId:string, userId:string) => {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        },
    })

    if(!data) {
        return redirect('/dashboard/invoices')
    }
}

type Params = Promise<{invoiceId: string}>

const MarkAsPaid = async ({params}: {params: Params}) => {
    const session = await requireUser()
    const {invoiceId} = await params 

    await Authourize(invoiceId, session.user?.id as string)
    
    return (
        <div className='flex flex-1 justify-center items-center'>
            <Card className='max-w-[500px]'>
                <CardHeader>
                    <CardTitle>Mark as Paid?</CardTitle>
                    <CardDescription>Are you sure you want to mark this invoice as paid?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={PaidGif}
                        alt='paid gif'
                        className='rounded-lg'
                    />
                </CardContent>
                <CardFooter className='flex items-center justify-between'>
                    <Link
                        href={'/dashboard/invoices'}
                        className={buttonVariants({variant: 'outline'})}
                    >
                        Cancel
                    </Link>
                    <form action={async ()=> {
                        "use server"
                        await markAsPaidAction(invoiceId)
                    } }>
                        <SubmitButton
                            text='Mark as Paid'
                        />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MarkAsPaid