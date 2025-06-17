import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Shopify Orders',
        href: '/admin/dashboard/orders',
    },
];

export default function Index() {
    const { orders } = usePage().props;
    console.log(orders);

    const parsedItems = JSON.parse(orders[0].items);
    console.log(parsedItems);

    const handleFulfill = (id) => {
        router.post(`/orders/${id}/fulfill`);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shopify Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {orders.length === 0 ? (
                    <p>No pending orders yet.</p>
                ) : (
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Shopify Order ID</TableHead>
                                <TableHead className="text-left">Customer name</TableHead>
                                <TableHead className="text-left">Email</TableHead>
                                <TableHead className="text-left">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => {
                                const { id, customer_name, email, shopify_order_id, items, status } = order;
                                return (
                                    <TableRow key={id}>
                                        <TableCell className="text-left">{shopify_order_id}</TableCell>
                                        <TableCell className="text-left">{customer_name}</TableCell>
                                        <TableCell className="text-left">{email}</TableCell>
                                        <TableCell className="text-left">
                                            <Button variant={`${status === 'pending' ? 'destructive' : 'bg-green-900'}`} className="cursor-pointer">
                                                {status}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}
