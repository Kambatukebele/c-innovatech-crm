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

export default function ShopifyOrdersIndex() {
    const { orders, flash } = usePage().props;

    const handleFulfill = (id) => {
        router.post(`/admin/dashboard/orders/${id}/fulfill`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shopify Orders" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Alerts */}
                {flash?.success && (
                    <Alert variant="default">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                {flash?.error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}

                {/* Order Table */}
                <div>
                    <h2 className="mb-6 text-xl font-semibold text-gray-800">Pending Shopify Orders</h2>

                    {orders.length === 0 ? (
                        <div className="text-muted-foreground flex h-32 items-center justify-center">No pending orders yet.</div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border">
                            <Table>
                                <TableCaption className="text-muted-foreground">A list of your recent Shopify orders.</TableCaption>
                                <TableHeader>
                                    <TableRow className="bg-muted text-muted-foreground">
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(({ id, customer_name, email, shopify_order_id, status }) => (
                                        <TableRow key={id} className="hover:bg-muted/50">
                                            <TableCell>{shopify_order_id}</TableCell>
                                            <TableCell>{customer_name}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleFulfill(id)}
                                                    variant={status === 'pending' ? 'destructive' : 'secondary'}
                                                    className="text-white capitalize"
                                                >
                                                    {status}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
