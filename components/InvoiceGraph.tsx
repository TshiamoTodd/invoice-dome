import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Graph from './Graph'
import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'

const getInvoices = async (userId: string) => {
    const rawData = await prisma.invoice.findMany({
        where: {
            status: 'PAID',
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
        }, 
        select: {
            total: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    //Group and aggregate data by date
    const aggregatedData = rawData.reduce((acc:{[key: string]: number}, curr) => {
        const date = new Date(curr.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })

        acc[date] = (acc[date] || 0) + curr.total

        return acc
    }, {})

    //convert to array of objects
    const transformedData = Object.entries(aggregatedData).map(([date, amaount]) => ({
        date,
        amount: amaount,
        originalDate: new Date(date + ", " + new Date().getFullYear())
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({date, amount}) => ({date, amount}))

    return transformedData
}

const InvoiceGraph = async () => {
    const session = await requireUser()
    const data = await getInvoices(session.user?.id as string)
    
    return (
        <Card className='lg:col-span-2'>
            <CardHeader>
                <CardTitle>
                    Paid Invoices
                </CardTitle>
                <CardDescription>Invoices which have been paid in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <Graph
                    data={data}
                />
            </CardContent>
        </Card>
    )
}

export default InvoiceGraph