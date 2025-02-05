'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
// import { Modal } from '@/components/_checkout-page/_components/modal';
import QuickView from '@/utils/quick-view';

export default function FileUploadModal({
    files,
    setFiles,
    isOpen,
    design,
    setIsOpen,
    cartId,
}: any) {
    const file: any = files.find((i: any) => i.cartId === cartId);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [newfilesAdded, setNewfilesAdded] = useState(false);
    const [description, setDescription] = useState<string>(''); // Update the description state when the `file` prop changes

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convert FileList to an array and set the state
        const newfiles = e.target.files as FileList | null; // Explicitly type `files`
        if (newfiles) {
            setNewfilesAdded(true);
            setUploadedFiles((prevFiles: any) => [
                ...prevFiles,
                ...Array.from(newfiles),
            ]);
        }
    };

    const handleFile = () => {
        setFiles((prevFiles: any) => {
            // If cartId exists, replace the old entry with the new one
            const updatedFiles = prevFiles?.map((item: any) => {
                if (item?.cartId === cartId) {
                    return {
                        cartId: cartId,
                        files: uploadedFiles,
                        description: description,
                    };
                }

                return item;
            });

            // If cartId didn't exist in the previous array, add the new entry
            if (!updatedFiles.some((item: any) => item?.cartId === cartId)) {
                updatedFiles.push({
                    cartId: cartId,
                    files: uploadedFiles,
                    description: description,
                });
            }

            return updatedFiles;
        });
    };

    const handleDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDetails = e.target.value as string; // Explicitly type `value`
        file?.files?.length > 0 && setUploadedFiles(file?.files || []);
        setDescription(newDetails);
    };

    const handleClose = () => {
        setIsOpen(false);
        setDescription('');
    };

    const handleUpload = () => {
        handleClose();
        handleFile();
    };

    useEffect(() => {
        file?.files?.length > 0 && setUploadedFiles(file?.files || []);

        files?.map((item: any) => {
            if (item?.cartId !== cartId) {
                setUploadedFiles([]);
                setDescription('');
                setNewfilesAdded(false);
            }
        });

        file?.description && setDescription(file?.description || '');
    }, [file, files, cartId, setDescription]);

    useEffect(() => {
        if (newfilesAdded || description?.length > 0) {
            setDisabled(false);
        }

        if (!isOpen) {
            setNewfilesAdded(false);
            setDisabled(true);
        }
    }, [newfilesAdded, description, isOpen, file]);

    // console.log('file', file);

    return (
        <>
            <QuickView
                open={isOpen}
                setOpen={setIsOpen}
                design={design}
                focus
                auto
            >
                <div className="p-10 space-y-12">
                    <div className="flex justify-between mb-3">
                        <input
                            className="focus:outline-none focus:border-0 focus:ring-0 w-[80%]"
                            type="file"
                            name="files"
                            accept=".ai, .psd, .pdf, .jpg, .jpeg, .png, .webp"
                            multiple
                            onChange={(e) => onFileChange(e)}
                        />
                    </div>
                    {file?.files?.length > 0 && (
                        <div className="flex flex-col">
                            <span>
                                {file?.files?.length} file
                                {file?.files?.length > 1 && 's'} uploaded
                            </span>
                            <ul className="mt-2 list-disc list-inside">
                                {file?.files?.map((i: any, index: number) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-700"
                                    >
                                        {i.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className='mt-3'>
                        <textarea
                            onChange={(e: any) => handleDetails(e)}
                            name=""
                            id=""
                            className="w-full border-2 rounded p-2"
                            placeholder="Please share your asking size, color and customize details"
                            value={description}
                        />
                        <button
                            disabled={disabled}
                            onClick={() => handleUpload()}
                            className="px-4 py-1 bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:cursor-text-red rounded-md mt-2"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </QuickView>
        </>
    );
}