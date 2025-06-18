import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SentOrders({ orders, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('admin.orders.sent'));
    };

    return (
        <AppLayout>
            <Head title="Sent Orders" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl border bg-white p-6 shadow-sm">
                <form onSubmit={handleSearch} className="flex items-center gap-3">
                    <Input
                        type="text"
                        placeholder="Search by Shopify Order ID"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        className="max-w-sm"
                    />
                    <Button type="submit" className="bg-primary text-white">
                        Search
                    </Button>
                </form>

                <div className="overflow-x-auto rounded-lg border">
                    <Table>
                        <TableCaption className="text-muted-foreground">List of all sent orders</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-muted text-muted-foreground">
                                <TableHead className="text-left">Order ID</TableHead>
                                <TableHead className="text-left">Customer</TableHead>
                                <TableHead className="text-left">Email</TableHead>
                                <TableHead className="text-left">Status</TableHead>
                                <TableHead className="text-left">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.data.map((order) => (
                                <TableRow key={order.id} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">{order.shopify_order_id}</TableCell>
                                    <TableCell>{order.customer_name}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 uppercase">
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="secondary" size="sm" asChild>
                                            <Link href={route('admin.orders.show', order.id)}>View Order</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4">
                    <Pagination>
                        <PaginationContent>
                            {orders.links.map((link, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink href={link.url || '#'} isActive={link.active} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </AppLayout>
    );
}
