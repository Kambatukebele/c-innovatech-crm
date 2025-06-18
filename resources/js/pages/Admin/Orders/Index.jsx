import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Shopify Orders',
        href: '/admin/dashboard/orders',
    },
];

export default function Index() {
    const { orders, flash } = usePage().props;

    const handleFulfill = (id) => {
        router.post(`/admin/dashboard/orders/${id}/fulfill`);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shopify Orders" />
            {flash?.success && (
                <Alert className="my-4" variant="success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{flash.success}</AlertDescription>
                </Alert>
            )}
            {flash?.error && (
                <Alert className="my-4" variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{flash.error}</AlertDescription>
                </Alert>
            )}
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
                                            <Button
                                                onClick={() => handleFulfill(id)}
                                                variant={`${status === 'pending' ? 'destructive' : 'bg-green-900'}`}
                                                className="cursor-pointer"
                                            >
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
