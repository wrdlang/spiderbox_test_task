import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';

export default function Welcome() {

    const route = useRoute();

    return (
        <div className="bg-white">
            <div className="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">SpiderBox</span>
                    <span className="block">URL shortener</span>
                </h2>
                <div className="flex justify-center mt-8">
                    <div className="inline-flex rounded-md shadow">
                        <InertiaLink
                            href={route('register')}
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                        >
                            Get started
                        </InertiaLink>
                    </div>
                    <div className="inline-flex ml-3">
                        <InertiaLink
                            href={route('login')}
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200"
                        >
                            Login
                        </InertiaLink>
                    </div>
                </div>
            </div>
        </div>

    );
}
