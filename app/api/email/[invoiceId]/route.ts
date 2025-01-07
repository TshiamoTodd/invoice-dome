import { NextResponse } from 'next/server';
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from '@/app/utils/mailtrap';

export async function POST(
    request: Request,
    {params}
    : {
        params: Promise<{invoiceId: string}>
    }) {
    try {
        const session = await requireUser()

        const { invoiceId } = await params

        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session!.user?.id
            }
        })

        if(!invoiceData) {
            return NextResponse.json({error: 'Invoice not found'}, {status: 404})
        }

        const sender = {
            email: "hello@demomailtrap.com",
            name: "Mailtrap Test",
        };

        emailClient.send({
            from: sender,
            to: [{email: 'tshiamo.mokwena19@gmail.com'}],
            template_uuid: "01557baf-f39b-4daa-8609-ec482dfb00ca",
            template_variables: {
            "first_name": invoiceData.clientName,
            "company_info_name": "InvoiceDome",
            "company_info_address": "MadeUp Street",
            "company_info_city": "Pretoria",
            "company_info_zip_code": "2000",
            "company_info_country": "South Africa"
            }
        })

        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({error: "failed to send email reminder"}, {status: 500})
    }
}