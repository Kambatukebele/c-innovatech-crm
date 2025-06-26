import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.operators.store'));
    };

    return (
        <AppLayout>
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Create Operator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                            <Input label="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Operator name" />
                            <Input
                                label="Email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="example@mail.com"
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm Password"
                            />
                            <Button type="submit" disabled={processing}>
                                Create
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
