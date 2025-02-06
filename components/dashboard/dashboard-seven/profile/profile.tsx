'use client';

import DataLoader from '@/components/loaders/data-loader';

import { PHONE_NUMBER_REGEX } from '@/consts';
import useAuth from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useUpdateUserProfileMutation } from '@/redux/features/user/userApi';
import { useState } from 'react';
import { RootState } from '@/redux/store';

type FormValues = {
    image: Blob;
    name: string;
    address: string;
    email: string;
    phone: number;
    password: any;
    type: string;
    error: string;
};

const Profile = ({ appStore }: any) => {
    const isAuthenticated = useAuth();
    const store_id = appStore?.id || null;

    const { user } = useSelector((state: RootState) => state.auth);

    const [selectedImage, setSelectedImage] = useState<any>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: user,
    });

    const [updateUserProfile] = useUpdateUserProfileMutation();

    const toBase64 = (file: any): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result as string); // Cast result to string
            reader.onerror = (error) => reject(error);
        });

    const update_profile = (body: any) => {
        updateUserProfile(body)
            .unwrap()
            .then((res: any) => {
                if (res?.status) {
                    toast.success(
                        res?.message || 'Profile updated successfully!'
                    );
                }
            })
            .catch((error) => {
                toast.error(error?.status || 'Something went wrong');
            });
    };

    const onSubmit = async (data: any) => {
        if (data?.name === '' || data?.email === '') {
            alert('Please fill up your input field ');
        } else {
            if (selectedImage) {
                if (selectedImage.size > 2024000) {
                    toast.warning('Image larger than 2MB!');
                    return;
                }
                try {
                    const base64 = await toBase64(selectedImage);
                    update_profile({
                        store_id,
                        ...data,
                        image: base64,
                    });
                } catch (error) {
                    console.error('Error converting file to Base64:', error);
                }
            } else {
                update_profile({
                    store_id,
                    ...data,
                });
            }
        }
    };

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files?.[0]);
        }
    };

    return (
        <>
            <div className="my-5 md:my-0">
                <div className="md:grid md:grid-cols-3 md:gap-5">
                    <div className="md:col-span-3">
                        <div className="">
                            <h3 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                                Personal Information
                            </h3>
                        </div>
                    </div>
                    {user ? (
                        <div className="mt-5 md:mt-0 md:col-span-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 ">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Photo
                                                </label>
                                                <div className="mt-1 flex items-center">
                                                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 ring-1 ring-red-400">
                                                        {isAuthenticated && (
                                                            <img
                                                                src={
                                                                    selectedImage
                                                                        ? URL.createObjectURL(
                                                                              selectedImage
                                                                          )
                                                                        : user?.image
                                                                }
                                                                alt=""
                                                                className="object-fit"
                                                            />
                                                        )}
                                                    </span>

                                                    <label
                                                        htmlFor="image"
                                                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none hover:ring-2 focus:ring-offset-2 hover:ring-indigo-500  lg:cursor-pointer"
                                                    >
                                                        <span>Change</span>
                                                        <input
                                                            {...register(
                                                                'image'
                                                            )}
                                                            id="image"
                                                            name="image"
                                                            type="file"
                                                            className="form-control sr-only"
                                                            onChange={
                                                                imageChange
                                                            }
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-span-6 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Full name
                                                </label>
                                                <input
                                                    defaultValue={user?.name}
                                                    {...register('name')}
                                                    type="text"
                                                    autoComplete="given-name"
                                                    className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                                                    placeholder="Enter your name"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label
                                                    htmlFor="email-address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Email Address
                                                </label>
                                                {appStore?.auth_type ===
                                                'email' ? (
                                                    <input
                                                        type="email"
                                                        defaultValue={
                                                            user?.email
                                                        }
                                                        autoComplete="email"
                                                        disabled={
                                                            appStore?.auth_type ===
                                                            'email'
                                                                ? true
                                                                : false
                                                        }
                                                        className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                                                    />
                                                ) : (
                                                    <input
                                                        {...register('email')}
                                                        type="email"
                                                        defaultValue={
                                                            user?.email
                                                        }
                                                        autoComplete="email"
                                                        disabled={
                                                            appStore?.auth_type ===
                                                            'email'
                                                                ? true
                                                                : false
                                                        }
                                                        className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                                                    />
                                                )}
                                            </div>

                                            <div className="col-span-6">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Mobile Number
                                                </label>
                                                {appStore?.auth_type ===
                                                'email' ? (
                                                    <>
                                                        <div className="flex items-center mt-1">
                                                            <span className="absolute flex-shrink-0 z-10 items-center py-2 px-4 ml-0 font-medium text-center text-gray-900 bg-gray-100 rounded-s-lg">
                                                                +880
                                                            </span>
                                                            <input
                                                                {...register(
                                                                    'phone',
                                                                    {
                                                                        pattern:
                                                                            {
                                                                                value: PHONE_NUMBER_REGEX,
                                                                                message:
                                                                                    'Not a phone number',
                                                                            },
                                                                    }
                                                                )}
                                                                defaultValue={
                                                                    user?.phone
                                                                }
                                                                disabled={
                                                                    appStore?.auth_type ===
                                                                    'email'
                                                                        ? false
                                                                        : true
                                                                }
                                                                type="number"
                                                                autoComplete="given-name"
                                                                className="w-full py-2 px-2 pl-20 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out bg-transparent remove-arrow"
                                                            />
                                                        </div>
                                                        {errors.phone && (
                                                            <span
                                                                role="alert"
                                                                className="text-red-500 text-sm"
                                                            >
                                                                {
                                                                    errors.phone
                                                                        ?.message
                                                                }
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <input
                                                        defaultValue={
                                                            user?.phone
                                                        }
                                                        disabled={
                                                            appStore?.auth_type ===
                                                            'email'
                                                                ? false
                                                                : true
                                                        }
                                                        type="number"
                                                        autoComplete="given-name"
                                                        className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                                                    />
                                                )}
                                            </div>

                                            <div className="col-span-6 ">
                                                <label
                                                    htmlFor="last-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Address
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        defaultValue={
                                                            user?.address
                                                        }
                                                        {...register('address')}
                                                        rows={3}
                                                        className="mt-1 py-2 px-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
                                                        placeholder="Your Address"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <DataLoader />
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
