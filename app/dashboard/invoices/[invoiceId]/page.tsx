import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'
import EditInvoice from '@/components/EditInvoice'
import { notFound } from 'next/navigation'
import React from 'react'

const getData = async (invoiceId: string, userId: string) => {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        },
    })

    if(!data) {
        return notFound()
    }

    return data
}

type Params = Promise<{invoiceId: string}>

const EditInvoiceRoute = async ({params}: {params: Params}) => {
    const {invoiceId} = await params
    const session = await requireUser()
    const data = await getData(invoiceId, session.user?.id as string)

    return (
        <EditInvoice
            data={data}
        />
    )
}

export default EditInvoiceRoute