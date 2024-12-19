import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import {fetchCustomers, fetchInvoiceById} from "@/app/lib/data";
import { notFound } from 'next/navigation';
class _props {
    id!: string;
}

export default async function page(props: { params: Promise<_props> }) {
    const params = await props.params;
    const id = params.id;

    const [invoice, customers] = await Promise.all([
        await fetchInvoiceById(id),
        await fetchCustomers()
    ])


    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: "Invoices", href: '/dashboard/invoices'},
                {label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true}
            ]}/>

            <EditInvoiceForm customers={customers} invoice={invoice}/>
        </main>
    );
}