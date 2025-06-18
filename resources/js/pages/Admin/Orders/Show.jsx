import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Show({ order }) {
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items || [];
    const raw = typeof order.raw === 'string' ? JSON.parse(order.raw) : order.raw || {};
    const shipping = raw.shipping_address || {};
    const billing = raw.billing_address || {};

    return (
        <AppLayout>
            <Head title="Sent Orders" />
            <div className="rounded-xl bg-white p-6">
                <div className="mx-auto max-w-4xl border bg-white p-8 text-sm shadow-xl print:p-4 print:text-xs">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h1 className="mb-1 text-2xl font-bold">C-InnovaTech Solutions</h1>
                            <p>60 rue François 1er</p>
                            <p>75008 Paris, France</p>
                            <p>Email: support@c-innovatech.com</p>
                            <p>Phone: +41 78 627 62 58</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-semibold">INVOICE</h2>
                            <p>
                                <strong>Order ID:</strong> {order.shopify_order_id}
                            </p>
                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p>
                                <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="mb-1 font-semibold">Bill To</h3>
                            <p>{billing.name}</p>
                            <p>{billing.address1}</p>
                            {billing.address2 && <p>{billing.address2}</p>}
                            <p>
                                {billing.zip} {billing.city}
                            </p>
                            <p>{billing.country_code}</p>
                            <p>{billing.phone}</p>
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold">Ship To</h3>
                            <p>{shipping.name}</p>
                            <p>{shipping.address1}</p>
                            {shipping.address2 && <p>{shipping.address2}</p>}
                            <p>
                                {shipping.zip} {shipping.city}
                            </p>
                            <p>{shipping.country_code}</p>
                            <p>{shipping.phone}</p>
                        </div>
                    </div>

                    <table className="mb-6 w-full border-collapse border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2 text-left">#</th>
                                <th className="border p-2 text-left">Item</th>
                                <th className="border p-2 text-left">SKU</th>
                                <th className="border p-2 text-right">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{item.title}</td>
                                    <td className="border p-2">{item.sku || 'N/A'}</td>
                                    <td className="border p-2 text-right">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between">
                        <div>
                            <p>
                                <strong>Total Quantity:</strong> {items.reduce((sum, i) => sum + i.quantity, 0)}
                            </p>
                            <p>
                                <strong>Total Weight:</strong> {items.reduce((sum, i) => sum + (i.weight || 0), 0)} kg
                            </p>
                        </div>
                        <Button onClick={() => window.print()} className="print:hidden">
                            Print Invoice
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
