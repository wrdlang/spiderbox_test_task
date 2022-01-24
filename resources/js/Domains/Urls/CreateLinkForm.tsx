import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import JetActionMessage from '@/Jetstream/ActionMessage';
import JetButton from '@/Jetstream/Button';
import JetFormSection from '@/Jetstream/FormSection';
import JetInput from '@/Jetstream/Input';
import JetInputError from '@/Jetstream/InputError';
import JetLabel from '@/Jetstream/Label';
import JetDialogModal from '@/Jetstream/DialogModal';
import JetSecondaryButton from '@/Jetstream/SecondaryButton';
import { useForm } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { useState } from 'react';

export default function CreateLinkForm() {
    const route = useRoute();
    const page = useTypedPage();
    const form = useForm({
        name: '',
        link: '',
    });
    const [displayingLink, setDisplayingLink] = useState(false);

    function createLink() {
        console.log('ward');
        form.post(route('link.store'), {
            errorBag: 'createLink',
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingLink(true);
                form.reset();
            }
        });
    }

    return (
        <div>
            <JetFormSection
                onSubmit={createLink}
                title={'Link Details'}
                description={'Create a new link to shorten it.'}
                renderActions={() => (
                    <>
                        <JetActionMessage on={form.recentlySuccessful} className="mr-3">
                            Saved.
                        </JetActionMessage>

                        <JetButton
                            className={classNames({ 'opacity-25': form.processing })}
                            disabled={form.processing}
                        >
                            Save
                        </JetButton>
                    </>
                )}
            >
                <div className="col-span-6 sm:col-span-3">
                    <JetLabel htmlFor="name" value="Link Name" />
                    <JetInput
                        id="name"
                        type="text"
                        className="block w-full mt-1"
                        value={form.data.name}
                        onChange={e => form.setData('name', e.currentTarget.value)}
                        autoFocus
                    />
                    <JetInputError message={form.errors.name} className="mt-2" />
                </div>
                <div className="col-span-6 sm:col-span-6">
                    <JetLabel htmlFor="link" value="Link to shorten" />
                    <JetInput
                        id="link"
                        type="text"
                        className="block w-full mt-1"
                        value={form.data.link}
                        onChange={e => form.setData('link', e.currentTarget.value)}
                    />
                    <JetInputError message={form.errors.link} className="mt-2" />
                </div>
            </JetFormSection>

            <JetDialogModal
                isOpen={displayingLink}
                onClose={() => setDisplayingLink(false)}
            >
                <JetDialogModal.Content title={'Link'}>
                    <div>
                        Please copy your shortened link.
                    </div>

                    <div className="px-4 py-2 mt-4 font-mono text-sm text-gray-500 bg-gray-100 rounded">
                        {page.props?.jetstream?.flash?.link}
                    </div>
                </JetDialogModal.Content>
                <JetDialogModal.Footer>
                    <JetSecondaryButton onClick={() => setDisplayingLink(false)}>
                        Close
                    </JetSecondaryButton>
                </JetDialogModal.Footer>
            </JetDialogModal>
        </div>
    );
}
