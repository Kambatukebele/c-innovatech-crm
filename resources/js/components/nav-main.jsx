import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavMain({ items = [] }) {
    const page = usePage();
    const [openMenus, setOpenMenus] = useState({});

    // Automatically open the menu if current page is inside any submenu
    useEffect(() => {
        const newOpenMenus = {};
        items.forEach((item) => {
            if (item.children) {
                const isActive = item.children.some((child) => child.url === page.url);
                newOpenMenus[item.title] = isActive;
            }
        });
        setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
    }, [page.url, items]);

    const toggleMenu = (title) => {
        setOpenMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item.children) {
                        const isOpen = openMenus[item.title];

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton onClick={() => toggleMenu(item.title)}>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <span>{item.title}</span>
                                    <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                </SidebarMenuButton>

                                {isOpen &&
                                    item.children.map((sub) => (
                                        <SidebarMenuItem key={sub.title} className="ml-6">
                                            <SidebarMenuButton asChild isActive={sub.url === page.url}>
                                                <Link href={sub.url} prefetch>
                                                    <span>{sub.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === page.url}>
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
