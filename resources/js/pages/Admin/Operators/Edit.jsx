import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react-hooks';

export default function Edit({ operator }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: operator.name,
        email: operator.email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.operators.update', operator.id));
    };

    return (
        <AppLayout>
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Edit Operator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                            <Input label="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <Input label="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            <Input
                                label="New Password (optional)"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <Button type="submit" disabled={processing}>
                                Update
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
