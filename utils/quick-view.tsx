'use client';

import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { CgClose } from 'react-icons/cg';

export default function QuickView({
    open,
    setOpen,
    children,
    design,
    focus,
    auto,
}: any) {
    const cancelButtonRef = useRef(null);

    function closeModal() {
        setOpen(false);
    }

    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                initialFocus={focus ?? cancelButtonRef}
                onClose={setOpen}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center h-full w-auto p-4 text-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                className={` ${
                                    design?.template_id === '34'
                                        ? 'bg-thirty-one border border-white'
                                        : 'bg-white'
                                }  rounded-lg text-left ${auto ? `h-auto w-auto` : `h-[80%] w-[60%]`} scrollbar-thin shadow-xl transform transition-all`}
                            >
                                <div
                                    className={`relative ${
                                        design?.template_id === '34'
                                            ? 'bg-thirty-one border border-white'
                                            : 'bg-white'
                                    } rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full h-auto`}
                                >
                                    <div
                                        onClick={closeModal}
                                        className="absolute -top-3 -right-3 cursor-pointer h-6 w-6 rounded-full bg-red-500 flex justify-center items-center"
                                    >
                                        <CgClose className="text-white text-lg" />
                                    </div>
                                    {children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
