import { useForm, usePage } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import JetActionSection from '@/Jetstream/ActionSection';
import JetButton from '@/Jetstream/Button';
import JetConfirmationModal from '@/Jetstream/ConfirmationModal';
import JetDangerButton from '@/Jetstream/DangerButton';
import JetDialogModal from '@/Jetstream/DialogModal';
import JetInput from '@/Jetstream/Input';
import JetInputError from '@/Jetstream/InputError';
import JetLabel from '@/Jetstream/Label';
import JetSecondaryButton from '@/Jetstream/SecondaryButton';
import JetSectionBorder from '@/Jetstream/SectionBorder';
import { Link } from '@/types';

interface Props {
    links: Link[];
}

export default function LinkManager({
    links,
}: Props) {
    const route = useRoute();
    const updateLinkForm = useForm({
        name: '',
        original_link: ''
    });
    const deleteLinkForm = useForm({});
    const [editLinkFor, setEditLinkFor] =
        useState<Link | null>(null);
    const [LinkBeingDeleted, setLinkBeingDeleted] =
        useState<Link | null>(null);

    function manageApiTokenPermissions(link: Link) {
        updateLinkForm.setData({
            'name': link.name,
            'original_link': link.original_link
        });
        setEditLinkFor(link);
    }

    function updateLink() {
        if (!editLinkFor) {
            return;
        }
        updateLinkForm.put(
            route('link.update', [editLinkFor]),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setEditLinkFor(null),
            },
        );
    }

    function confirmLinkDeletion(token: Link) {
        setLinkBeingDeleted(token);
    }

    function deleteLink() {
        if (!LinkBeingDeleted) {
            return;
        }
        deleteLinkForm.delete(
            route('link.destroy', [LinkBeingDeleted]),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setLinkBeingDeleted(null),
            },
        );
    }

    return (
        <div>
            {links.length > 0 ? (
                <div>
                    <JetSectionBorder />

                    <div className="mt-10 sm:mt-0">
                        <JetActionSection
                            title={'Manage Links'}
                            description={
                                'Click on the visits count to see visits details.'
                            }
                        >
                            <div className="space-y-6">
                                {links.map(link => (
                                    <div
                                        className="flex items-center justify-between"
                                        key={link.id}
                                    >
                                        <div>{link.name}</div>

                                        <div className="flex items-center">
                                            <div className="flex-1 ml-6 mr-6 truncate">
                                                <a className="text-sm text-indigo-600" href={'/s/' + link.code} target="_blank">
                                                    {link.code}
                                                </a>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {link.visits_count} visits
                                            </div>

                                            <button
                                                className="ml-6 text-sm text-gray-400 underline cursor-pointer"
                                                onClick={() => manageApiTokenPermissions(link)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="ml-6 text-sm text-red-500 cursor-pointer"
                                                onClick={() => confirmLinkDeletion(link)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </JetActionSection>
                    </div>
                </div>
            ) : null}

            <JetDialogModal
                isOpen={!!editLinkFor}
                onClose={() => setEditLinkFor(null)}
            >
                <JetDialogModal.Content title={'Edit Link Details'}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="col-span-6 sm:col-span-3">
                            <JetLabel htmlFor="name" value="Link Name" />
                            <JetInput
                                id="name"
                                type="text"
                                className="block w-full mt-1"
                                value={updateLinkForm?.data.name}
                                onChange={e => updateLinkForm.setData('name', e.currentTarget.value)}
                            />
                            <JetInputError message={updateLinkForm.errors.name} className="mt-2" />
                        </div>
                        <div className="col-span-6 sm:col-span-6">
                            <JetLabel htmlFor="link" value="Link to shorten" />
                            <JetInput
                                id="link"
                                type="text"
                                className="block w-full mt-1"
                                value={updateLinkForm?.data.original_link}
                                onChange={e => updateLinkForm.setData('original_link', e.currentTarget.value)}
                            />
                            <JetInputError message={updateLinkForm.errors.original_link} className="mt-2" />
                        </div>
                    </div>
                </JetDialogModal.Content>
                <JetDialogModal.Footer>
                    <JetSecondaryButton onClick={() => setEditLinkFor(null)}>
                        Cancel
                    </JetSecondaryButton>

                    <JetButton
                        onClick={updateLink}
                        className={classNames('ml-2', {
                            'opacity-25': updateLinkForm.processing,
                        })}
                        disabled={updateLinkForm.processing}
                    >
                        Save
                    </JetButton>
                </JetDialogModal.Footer>
            </JetDialogModal>

            <JetConfirmationModal
                isOpen={!!LinkBeingDeleted}
                onClose={() => setLinkBeingDeleted(null)}
            >
                <JetConfirmationModal.Content title={'Delete Link'}>
                    Are you sure you would like to delete this Link?
                </JetConfirmationModal.Content>
                <JetConfirmationModal.Footer>
                    <JetSecondaryButton onClick={() => setLinkBeingDeleted(null)}>
                        Cancel
                    </JetSecondaryButton>

                    <JetDangerButton
                        onClick={deleteLink}
                        className={classNames('ml-2', {
                            'opacity-25': deleteLinkForm.processing,
                        })}
                        disabled={deleteLinkForm.processing}
                    >
                        Delete
                    </JetDangerButton>
                </JetConfirmationModal.Footer>
            </JetConfirmationModal>
        </div>
    );
}
