import React, { use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'
import { formatCurrency } from '@/app/utils/formatCurrency'

const getData = async (userId: string) => {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        },
        select:{
            clientName: true,
            clientEmail: true,
            total: true,
            id: true,
            currency: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 7
    })

    return data
}

const RecentInvoices = async () => {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
                {data.map((item) => (
                    <div className='flex items-center gap-4' key={item.id}>
                        <Avatar className='hidden sm:flex size-9'>
                            <AvatarFallback>{item.clientName.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium leading-none'>{item.clientName}</p>
                            <p className='text-sm text-muted-foreground'>{item.clientEmail}</p>
                        </div>
                        <div className='ml-auto font-medium'>
                            {formatCurrency({
                                amount: item.total, 
                                currency: item.currency as any
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentInvoices