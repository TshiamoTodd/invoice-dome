import React, { Suspense } from 'react'
import { auth, signOut } from '../utils/auth'
import { requireUser } from '../utils/hooks'
import DashboardBlocks from '@/components/DashboardBlocks'
import InvoiceGraph from '@/components/InvoiceGraph'
import RecentInvoices from '@/components/RecentInvoices'
import prisma from '../utils/db'
import EmptyState from '@/components/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'

const getData = async (userId: string) => {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
        }
    })

    return data
}

async function DashboardRoute() {
    const session = await requireUser()

    const data = await getData(session.user?.id as string)

    return (
        <>
            {data.length < 1 ? (
                <EmptyState
                    title='No invoices found'
                    description='Create your first invoice to get started'
                    buttonText='Create Invoice'
                    href='/dashboard/invoices/create'
                />
            ) : (
                <>
                    <Suspense fallback={<Skeleton className='w-full h-full flex-1'/>}>
                        <DashboardBlocks/>
                        <div className='grid gap-4 lg:grid-cols-3 md:gap-8'>
                            <InvoiceGraph/>
                            <RecentInvoices/>
                        </div>
                    </Suspense>
                </>
            )}
            
        </>
    )
}

export default DashboardRoute