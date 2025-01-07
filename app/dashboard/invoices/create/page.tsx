import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/hooks'
import CreateInvoice from '@/components/CreateInvoice'
import React from 'react'

const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      address: true
    }
  })

  return data
}

const InvoiceCreationRoute = async () => {
  const session = await requireUser()
  const data = await getUserData(session.user?.id as string)
  return (
    <CreateInvoice 
      lastName={data?.lastname as string}
      firstName={data?.firstname as string}
      email={data?.email as string}
      address={data?.address as string}
    />
  )
}

export default InvoiceCreationRoute