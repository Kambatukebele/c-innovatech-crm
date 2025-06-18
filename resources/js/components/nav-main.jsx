import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }) {
    const page = usePage();
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => {
                    const isActive = item.url === page.url;
                    const isOpen = openIndex === index;

                    if (item.children) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton onClick={() => setOpenIndex(isOpen ? null : index)}>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <span>{item.title}</span>
                                    <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </SidebarMenuButton>
                                {isOpen &&
                                    item.children.map((sub, i) => (
                                        <SidebarMenuItem key={i} className="ml-6">
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
                            <SidebarMenuButton asChild isActive={isActive}>
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
