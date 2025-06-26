import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, PhoneCall, Scaling, Store } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const role = auth.user?.role;

    const adminNavItems = [
        {
            title: 'Admin Dashboard',
            url: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Shopify Orders',
            icon: Store,
            children: [
                { title: 'Pending Orders', url: '/admin/dashboard/orders' },
                { title: 'Sent Orders', url: '/admin/dashboard/orders/sent' },
            ],
        },
        {
            title: 'Client Leads',
            url: '/admin/dashboard/leads',
            icon: Scaling,
        },
        {
            title: 'Operators',
            icon: PhoneCall,
            children: [
                { title: 'Create Operator', url: '/admin/dashboard/operators/create' },
                { title: 'View All Operators', url: '/admin/dashboard/operators/' },
            ],
        },
    ];

    const operatorNavItems = [{ title: 'Operator Dashboard', url: '/operator/dashboard', icon: LayoutGrid }];

    const mainNavItems = role === 'admin' ? adminNavItems : operatorNavItems;

    const footerNavItems = [
        { title: 'Repository', url: 'https://github.com/laravel/react-starter-kit', icon: Folder },
        { title: 'Documentation', url: 'https://laravel.com/docs/starter-kits', icon: BookOpen },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={role === 'admin' ? '/admin/dashboard' : '/operator/dashboard'}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
