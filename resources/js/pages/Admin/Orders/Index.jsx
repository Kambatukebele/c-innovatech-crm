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
                <Alert variant="default" className="mb-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{flash.success}</AlertDescription>
                </Alert>
            )}

            {flash?.error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{flash.error}</AlertDescription>
                </Alert>
            )}

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Pending Shopify Orders</h2>

                {orders.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-gray-500">No pending orders yet.</div>
                ) : (
                    <Table>
                        <TableCaption className="mb-4">A list of your recent Shopify orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {orders.map((order) => {
                                const { id, customer_name, email, shopify_order_id, status } = order;

                                const statusColor = status === 'pending' ? 'destructive' : 'secondary';

                                return (
                                    <TableRow key={id}>
                                        <TableCell>{shopify_order_id}</TableCell>
                                        <TableCell>{customer_name}</TableCell>
                                        <TableCell>{email}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleFulfill(id)} variant={statusColor} className="text-white capitalize">
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
