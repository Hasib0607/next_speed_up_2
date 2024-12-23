'use client';

import { getFastArr } from '@/helpers/littleSpicy';
import { useGetAddressQuery } from '@/redux/features/checkOut/checkOutApi';

import { RootState } from '@/redux/store';

import { useEffect, useState } from 'react';

import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import CheckoutFrom from '@/components/_checkout-page/_components/checkout-from';
import { Modal } from '@/components/_checkout-page/_components/modal';
import SingleAddress from '@/components/_checkout-page/twentyone/single-address/single-address';
import useAuth from '@/hooks/useAuth';

const Address = ({ selectAddress, setSelectAddress, design }: any) => {
    const isAuthenticated = useAuth();
    const [addressArr, setAddressArr] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const {
        data: addressData,
        isLoading: addressLoading,
        isSuccess: addressSuccess,
        isError: addressError,
        refetch: addressRefetch,
    } = useGetAddressQuery({ store_id });

    let addressCards: any = null;

    if (addressLoading) {
        addressCards = (
            <>
                <div className="flex items-center">
                    {' '}
                    <RotatingLines
                        width="25"
                        strokeColor="#6495ED"
                        strokeWidth="6"
                    />
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    if (addressError && !addressLoading) {
        addressCards = (
            <>
                <p>Error fetching address data!</p>
            </>
        );
    }

    if (addressSuccess && !addressLoading) {
        addressCards = (
            <>
                <div className="grid xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 grid-cols-1 gap-4">
                    {addressArr
                        ?.slice(0, 4)
                        ?.map((item: any, index: number) => (
                            <SingleAddress
                                item={item}
                                key={index}
                                setEdit={setEdit}
                                setEditItem={setEditItem}
                                setOpen={setOpen}
                                selectAddress={selectAddress}
                                setSelectAddress={setSelectAddress}
                                addressRefetch={addressRefetch}
                                addressArr={addressArr}
                            />
                        ))}
                </div>
            </>
        );
    }

    const handleAdd = () => {
        setEdit(false);
        setOpen(true);
    };

    useEffect(() => {
        if (addressSuccess && isAuthenticated) {
            const allAddress = addressData?.data || [];
            setAddressArr(allAddress);
            setSelectAddress(getFastArr(addressArr));
        }
    }, [addressArr, addressSuccess, addressData, isAuthenticated]);

    return (
        <>
            <div
                className={`${
                    design?.template_id === '34'
                        ? 'bg-thirty-one border border-white'
                        : 'bg-white'
                }  shadow sm:rounded-md sm:overflow-hidden mb-5`}
            >
                <div className={`px-4 py-5 space-y-6 sm:p-6`}>
                    <div className="">
                        <div className="flex justify-between items-center pb-3">
                            {design?.template_id === '29' ||
                            store_id === 3601 ||
                            store_id === 3904 ? (
                                <label
                                    htmlFor="name"
                                    className="block text-md md:text-xl font-semibold text-gray-700"
                                >
                                    ঠিকানা{' '}
                                    <span className="text-xs md:text-sm">
                                        (অনুগ্রহ করে আপনার ঠিকানা নির্বাচন করুন)
                                    </span>
                                </label>
                            ) : (
                                <label
                                    htmlFor="name"
                                    className="block text-md md:text-xl font-semibold text-gray-700"
                                >
                                    Addresses{' '}
                                    <span className="text-xs md:text-sm">
                                        (Please Select Your Address.)
                                    </span>
                                </label>
                            )}
                            {isAuthenticated && (
                                <span
                                    className="text-green-600 font-semibold tracking-wider lg:cursor-pointer"
                                    onClick={() => handleAdd()}
                                >
                                    {' '}
                                    + Add
                                </span>
                            )}
                        </div>
                        {store?.auth_type === 'EasyOrder' &&
                        !isAuthenticated ? (
                            <CheckoutFrom addressRefetch={addressRefetch} />
                        ) : (
                            <div>
                                {!addressArr || addressArr?.length == 0 ? (
                                    <CheckoutFrom
                                        addressRefetch={addressRefetch}
                                    />
                                ) : (
                                    addressCards
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen} design={design}>
                <>
                    {edit && editItem ? (
                        <CheckoutFrom
                            addressRefetch={addressRefetch}
                            setOpen={setOpen}
                            editItem={editItem}
                            modal
                            edit
                        />
                    ) : (
                        <CheckoutFrom
                            addressRefetch={addressRefetch}
                            setOpen={setOpen}
                            modal
                        />
                    )}
                </>
            </Modal>
        </>
    );
};

export default Address;
