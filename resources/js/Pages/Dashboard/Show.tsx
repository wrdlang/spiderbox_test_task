import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import CreateLinkForm from '@/Domains/Urls/CreateLinkForm';
import LinkManager from '@/Domains/Urls/LinkManager';
import { Link } from '@/types';

interface Props {
    links: Link[];
}

export default function Dashboard({
    links,
}: Props) {
    return (
        <AppLayout
            title="Dashboard"
            renderHeader={() => (
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Links
                </h2>
            )}
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <CreateLinkForm />
                    <LinkManager links={links} />
                </div>
            </div>
        </AppLayout>
    );
}
