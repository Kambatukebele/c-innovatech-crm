import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { Toaster } from 'sonner';

const Index = () => {
    const { leads: initialLeads, filters, operators } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [leads, setLeads] = useState(initialLeads);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            window.location.href = `/admin/dashboard/leads?search=${encodeURIComponent(search)}`;
        }
    };

    const assignLead = async (leadId, userId) => {
        try {
            await axios.post(`/admin/dashboard/leads/${leadId}/assign`, {
                assigned_to: userId,
            });

            setLeads((prev) => ({
                ...prev,
                data: prev.data.map((lead) => (lead.id === leadId ? { ...lead, assigned_to: userId } : lead)),
            }));

            toast.success('Lead assigned successfully.');
        } catch (error) {
            console.error('Failed to assign lead', error);
            toast.error('Assignment failed.');
        }
    };

    return (
        <>
            <Toaster richColors position="top-right" />
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
                                            <th className="px-3 py-2">Product</th>
                                            <th className="px-3 py-2">Assign</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.data.map((lead) => (
                                            <tr key={lead.id}>
                                                <td className="px-3 py-2">{lead.name}</td>
                                                <td className="px-3 py-2">{lead.email}</td>
                                                <td className="px-3 py-2">{lead.product}</td>
                                                <td className="px-3 py-2">
                                                    <select
                                                        value={lead.assigned_to || ''}
                                                        onChange={(e) => assignLead(lead.id, e.target.value)}
                                                        className="rounded border px-2 py-1"
                                                    >
                                                        <option value="">Unassigned</option>
                                                        {operators.map((user) => (
                                                            <option key={user.id} value={user.id}>
                                                                {user.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

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
        </>
    );
};

export default Index;
