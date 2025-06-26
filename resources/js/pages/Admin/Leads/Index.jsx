import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const Index = () => {
    const { leads, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            window.location.href = `/admin/leads?search=${encodeURIComponent(search)}`;
        }
    };
    return (
        <AppLayout>
            <Head title="Leads" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Card className="mb-4 p-4">
                    <CardHeader>
                        <CardTitle>Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Search by name, email, or product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            className="mb-4 max-w-md"
                        />
                        <div className="overflow-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Email</th>
                                        <th className="px-3 py-2">Phone</th>
                                        <th className="px-3 py-2">Product</th>
                                        <th className="px-3 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.data.map((lead) => (
                                        <tr key={lead.id} className="border-t">
                                            <td className="px-3 py-2">{lead.name}</td>
                                            <td className="px-3 py-2">{lead.email}</td>
                                            <td className="px-3 py-2">{lead.phone_number}</td>
                                            <td className="px-3 py-2">{lead.product}</td>
                                            <td className="px-3 py-2">{new Date(lead.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4">
                            {leads.links.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.url || ''}
                                    className={`mx-1 px-2 py-1 text-sm ${link.active ? 'font-bold underline' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Index;
