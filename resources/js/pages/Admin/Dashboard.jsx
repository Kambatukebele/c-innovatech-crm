import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart, Eye, PackageCheck, PackageSearch, PackageX } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6b7280', '#9ca3af', '#d1d5db']; // light gray tones

const breadcrumbs = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    const { stats = {}, recentOrders = [] } = usePage().props;

    const fulfillmentData = [
        { name: 'Sent', value: stats.fulfilled || 0 },
        { name: 'Pending', value: stats.pending || 0 },
        { name: 'Failed', value: stats.failed || 0 },
    ];

    const widgetClasses = 'flex items-center gap-4 p-4 bg-gray-100 rounded-xl shadow-sm';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="bg-gray-50">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <PackageSearch className="h-5 w-5 text-gray-500" />
                            <CardTitle>Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold text-gray-700">{stats.total}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-50">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <PackageX className="h-5 w-5 text-yellow-500" />
                            <CardTitle>Pending Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-50">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <PackageCheck className="h-5 w-5 text-green-500" />
                            <CardTitle>Sent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold text-green-600">{stats.fulfilled}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                            <Button asChild variant="ghost">
                                <Link href="/admin/dashboard/orders">
                                    View All <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.shopify_order_id}</TableCell>
                                            <TableCell>{order.customer_name}</TableCell>
                                            <TableCell className="text-sm capitalize">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        order.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : order.status === 'sent'
                                                              ? 'bg-green-100 text-green-800'
                                                              : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.orders.show', order.id)}>
                                                        <Eye className="mr-1 h-4 w-4" /> View
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart className="text-muted-foreground h-5 w-5" /> Fulfillment Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={fulfillmentData} cx="50%" cy="50%" outerRadius={60} label dataKey="value">
                                        {fulfillmentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
