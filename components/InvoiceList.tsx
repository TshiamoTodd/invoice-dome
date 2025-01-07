import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import InvoiceActions from './InvoiceActions'
import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'
import { formatCurrency } from '@/app/utils/formatCurrency'
import { Badge } from './ui/badge'
import EmptyState from './EmptyState'

const getData = async (userId: string) => {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            clientName: true,
            total: true,
            createdAt: true,
            status: true,
            invoiceNumber: true
        }, 
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data
}

const InvoiceList = async () => {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)

    return (
        <>
            {data.length === 0 ? (
                <EmptyState
                    title='No invoices'
                    description='Create an invoice to get started'
                    buttonText='Create invoice'
                    href='/dashboard/invoices/create'
                />
            ): (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((invoice: any) => (
                            <TableRow key={invoice.id}>
                                <TableCell>#{invoice.invoiceNumber}</TableCell>
                                <TableCell>{invoice.clientName}</TableCell>
                                <TableCell>{formatCurrency({
                                        amount: invoice.total,
                                        currency: "ZAR"
                                    })}
                                </TableCell>
                                <TableCell>
                                    <Badge>{invoice.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {new Intl.DateTimeFormat('en-US', {
                                        dateStyle: 'medium'
                                    }).format(invoice.createdAt)}
                                </TableCell>
                                <TableCell className='text-right'>
                                    <InvoiceActions
                                        id={invoice.id}
                                        status={invoice.status}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default InvoiceList