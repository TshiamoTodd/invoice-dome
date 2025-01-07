"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { CheckCircle, DownloadCloud, Mail, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface iAppProps {
    id: string
    status: string
}

const InvoiceActions = ({id, status}: iAppProps) => {
    const handleSendReminder = () => {
        toast.promise(fetch(`/api/email/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }), {
                loading: 'Sending reminder...',
                success: 'Reminder sent successfully',
                error: 'Failed to send reminder'
            }
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'secondary'}>
                    <MoreHorizontal className='size-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`}>
                        <Pencil className='size-4'/> Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${id}`} target='_blank'>
                        <DownloadCloud className='size-4'/> Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSendReminder}>
                    <Mail className='size-4'/> Reminder Email
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}/delete`}>
                        <Trash className='size-4'/> Delete
                    </Link>
                </DropdownMenuItem>
                {status !== "PAID" && (
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/invoices/${id}/paid`}>
                            <CheckCircle className='size-4'/> Mark as Paid
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceActions