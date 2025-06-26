import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { operators } = usePage().props;

    return (
        <AppLayout>
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Card className="p-4">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Operators</CardTitle>
                        <Button asChild>
                            <Link href={route('admin.operators.create')}>Add Operator</Link>
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="py-2 text-left">Name</th>
                                    <th className="py-2 text-left">Email</th>
                                    <th className="py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {operators.data.map((op) => (
                                    <tr key={op.id} className="border-t">
                                        <td className="py-2">{op.name}</td>
                                        <td>{op.email}</td>
                                        <td className="space-x-2">
                                            <Link href={route('admin.operators.edit', op.id)} className="text-blue-500">
                                                Edit
                                            </Link>
                                            <Link href={route('admin.operators.destroy', op.id)} method="delete" as="button" className="text-red-500">
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
