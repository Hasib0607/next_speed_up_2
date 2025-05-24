'use client';

import { getFastArr } from '@/helpers/littleSpicy';
import { useGetAddressQuery } from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import CheckoutFrom from '@/components/_checkout-page/_components/checkout-from';
import SingleAddress from '@/components/_checkout-page/_components/single-address/single-address';
import { ONE, TWENTY_EIGHT } from '@/consts';
import useAuth from '@/hooks/useAuth';
import QuickView from '@/utils/quick-view';

const Address = ({
    design,
    appStore,
    selectAddress,
    setSelectAddress,
    className,
    formFieldStyle,
    distLang,
    bn
}: any) => {
    const isAuthenticated = useAuth();
    const [addressArr, setAddressArr] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const store_id = appStore?.id || null;

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
            <div className="flex items-center">
                {' '}
                <RotatingLines
                    width="25"
                    strokeColor="#6495ED"
                    strokeWidth="6"
                />
                <p>Loading...</p>
            </div>
        );
    }

    if (addressError && !addressLoading) {
        addressCards = <p>Error fetching address data!</p>;
    }

    if (addressSuccess && !addressLoading) {
        addressCards = (
            <div className="grid xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 grid-cols-1 gap-4">
                {addressArr
                    ?.slice(0, 4)
                    ?.map((item: any, index: number) => (
                        <SingleAddress
                            item={item}
                            key={index}
                            design={design}
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
    }, [
        addressArr,
        addressSuccess,
        setSelectAddress,
        addressData,
        isAuthenticated,
    ]);

    return (
        <>
            <div className={className ? className : 'col-span-6 sm:col-span-4'}>
                <div className="flex justify-between items-center pb-3">
                    {design?.template_id === '29' ||
                    design?.checkout_page === TWENTY_EIGHT ||
                    design?.checkout_page === ONE ||
                    store_id === 3601 ? (
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
                            {isAuthenticated && addressArr?.length > 0 && (
                                selectAddress === null && <span className="text-xs md:text-sm text-red-500">
                                    (Please Select Your Address.)
                                </span>
                            )}
                            {!isAuthenticated && addressArr?.length === 0 && (
                                <span className="text-xs md:text-sm text-red-500">
                                    (Please add a address.)
                                </span>
                            )}
                        </label>
                    )}
                    {isAuthenticated && addressArr?.length > 0 && (
                        <span
                            className="text-green-600 font-semibold tracking-wider lg:cursor-pointer"
                            onClick={() => handleAdd()}
                        >
                            {' '}
                            + Add
                        </span>
                    )}
                </div>
                {appStore?.auth_type === 'EasyOrder' && !isAuthenticated ? (
                    <CheckoutFrom
                        design={design}
                        appStore={appStore}
                        formFieldStyle={formFieldStyle}
                        addressRefetch={addressRefetch}
                        setOpen={setOpen}
                        lang = {bn}
                        distLang = {distLang}
                    />
                ) : (
                    <div>
                        {!addressArr || addressArr?.length == 0 ? (
                            <CheckoutFrom
                                design={design}
                                appStore={appStore}
                                formFieldStyle={formFieldStyle}
                                addressRefetch={addressRefetch}
                                setOpen={setOpen}
                                lang = {bn}
                                distLang = {distLang}
                                cancelBtn={addressArr?.length > 0}
                            />
                        ) : (
                            addressCards
                        )}
                    </div>
                )}
            </div>
            <QuickView open={open} setOpen={setOpen} design={design} auto>
                <>
                    {edit && editItem ? (
                        <CheckoutFrom
                            design={design}
                            appStore={appStore}
                            formFieldStyle={formFieldStyle}
                            addressRefetch={addressRefetch}
                            setOpen={setOpen}
                            editItem={editItem}
                            lang = {bn}
                            distLang = {distLang}
                            cancelBtn
                            modal
                            edit
                        />
                    ) : (
                        <CheckoutFrom
                            design={design}
                            appStore={appStore}
                            formFieldStyle={formFieldStyle}
                            addressRefetch={addressRefetch}
                            setOpen={setOpen}
                            cancelBtn={addressArr?.length > 0}
                            modal
                            lang = {bn}
                            distLang = {distLang}
                        />
                    )}
                </>
            </QuickView>
        </>
    );
};

export default Address;
