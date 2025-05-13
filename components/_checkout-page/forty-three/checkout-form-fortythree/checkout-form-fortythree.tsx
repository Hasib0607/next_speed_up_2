'use client';

import { EMAIL_REGEX, ONE, TWENTY_EIGHT } from '@/consts';
import useAuth from '@/hooks/useAuth';
import {
    useGetFormFieldsQuery,
    useUserAddressSaveMutation,
    useUserAddressUpdateMutation,
} from '@/redux/features/checkOut/checkOutApi';
import { setCheckoutFromData } from '@/redux/features/checkOut/checkOutSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getValueByKey } from '@/components/_checkout-page/_components/customLang';
import {
    checkValidPhoneNumberByCode,
    classNames,
    cleanTwClassWithPrefix,
    getCheckedValue,
} from '@/helpers/littleSpicy';
import { getUserDataFromCookies } from '@/app/actions';
import { usePathname } from 'next/navigation';
import { generateDynamicSchema, showfieldByKey } from '@/lib/schema';
import { FormValues } from '@/types';
import { RootState } from '@/redux/store';

const CheckoutFormFortyThree = ({
    design,
    appStore,
    setOpen,
    addressRefetch,
    modal,
    edit,
    editItem,
    cancelBtn,
    formFieldStyle,
}: any) => {
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();
    const pathname = usePathname();

    // fields to show
    const [userData, setUserData] = useState<any>({});
    const [fields, setFields] = useState<any>([]);
    const [phoneCode, setPhoneCode] = useState('');

    const countryInfoArr = useSelector(
        (state: RootState) => state.checkout.countryArr
    );
    const districtArr = useSelector(
        (state: RootState) => state.checkout.districtArr
    );

    const store_id = appStore?.id || null;

    const {
        data: userFormFieldsData,
        isLoading: userFormFieldsLoading,
        isSuccess: userFormFieldsSuccess,
    } = useGetFormFieldsQuery({ store_id });

    const setCountryCode = useMemo(
        () =>
            countryInfoArr?.find(
                (item: any) => item.countryCode === userData?.countryCode
            ),
        [countryInfoArr, userData]
    );

    const getCountryCode = useMemo(
        () =>
            countryInfoArr?.find(
                (item: any) => item.telephonePrefix === phoneCode
            ),
        [countryInfoArr, phoneCode]
    );

    const selectedCountryCode = getCountryCode?.countryCode ?? 'BD';

    // Generate schema dynamically
    const schemaResolver = generateDynamicSchema(fields);

    const defaultValues = edit
        ? { ...editItem, district: editItem?.district_id }
        : {
              name: '',
              email: '',
              phone: '',
              phone_code: '',
              address: '',
              note: '',
              district: '',
          };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
        watch,
        trigger,
        setError,
        clearErrors,
    } = useForm<FormValues>({
        resolver: zodResolver(schemaResolver),
        defaultValues,
    });

    // Watch specific fields or the whole form for changes
    const watchedFields = watch(); // Watches all fields

    // Trigger validation on each input change
    const handleFieldChange = async (
        name: keyof FormValues,
        selectValue?: any
    ) => {
        await trigger(name); // Triggers validation for a specific field
        let value = getValues(name);

        if (name === 'district' && selectValue) {
            clearErrors(name);
        }

        if (name === 'phone_code' && selectValue) {
            setPhoneCode(selectValue);
            clearErrors(name);
        }

        if (name === 'name' && value) {
            clearErrors(name);
        }

        if (name === 'address' && value) {
            clearErrors(name);
        }

        if (name === 'phone') {
            let phoneWithCode = phoneCode + value.toString();
            // let isValidPhone = getCheckedValue(phoneWithCode, PHONE_NUMBER_REGEX);
            let isValidPhone = checkValidPhoneNumberByCode(
                phoneWithCode,
                selectedCountryCode
            );
            if (!isValidPhone?.valid) {
                setError('phone', {
                    type: 'manual',
                    // message: 'Need 11 digits',
                    message: 'Invalid phone number',
                });
            } else {
                clearErrors(name);
                clearErrors('email');
            }
        }
        if (name === 'email') {
            let isValidEmail = getCheckedValue(value, EMAIL_REGEX);
            if (!isValidEmail) {
                setError('email', {
                    type: 'manual',
                    message: 'Invalid email address',
                });
            } else {
                clearErrors(name);
                clearErrors('phone');
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [userAddressSave] = useUserAddressSaveMutation();
    const [userAddressUpdate] = useUserAddressUpdateMutation();

    // Add address
    const addAddress = async (data: any) => {
        try {
            if (isAuthenticated) {
                userAddressSave({ ...data, store_id })
                    .unwrap()
                    .then((res: any) => {
                        if (res?.status) {
                            addressRefetch();
                            reset(); // Toggle call state to trigger useEffect
                            toast.success(res?.message);
                            // setSelectAddress(getFastArr(addressArr))
                        }
                    })
                    .catch(() => {
                        toast.error('Error saving address');
                    });
            }
        } catch (error) {
            toast.error('An error occurred');
        }
        modal ? setOpen(false) : null;
    };

    // update address
    const updateAddress = (data: any) => {
        // exporting data with product id
        data['id'] = editItem?.id;

        if (isAuthenticated) {
            userAddressUpdate({ ...data })
                .unwrap()
                .then((res: any) => {
                    if (res?.status) {
                        addressRefetch();
                        toast.success(
                            res?.message || 'Address Updated Successfully'
                        );
                    } else {
                        toast.error(res?.message || 'Address Not Found!');
                    }
                })
                .catch(() => {
                    toast.error('Error Updating Address');
                });
        } else {
            toast.warning('Please Login First!');
        }
        setOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserDataFromCookies();
            setUserData(data);
        };
        fetchUserData();
    }, [pathname]);

    useEffect(() => {
        if (!edit || (edit && editItem?.phone_code === null)) {
            setValue('phone_code', setCountryCode?.telephonePrefix);
        }
    }, [setCountryCode, setValue, edit, editItem]);

    // Extracting language from db
    useEffect(() => {
        const userFormFields = userFormFieldsData?.data || [];
        const filteredFields = userFormFields?.filter(
            (item: any) => item.status !== 0 && item.name !== 'language'
        );

        if (userFormFieldsSuccess) {
            const isPhoneField = filteredFields.some(
                (item: any) => item.name === 'phone'
            );
            if (isPhoneField) {
                setFields([
                    ...filteredFields,
                    {
                        id: filteredFields.at(-1).id + 1,
                        name: 'phone_code',
                        status: 1,
                    },
                ]);
            } else {
                setFields(filteredFields);
            }
        }
    }, [userFormFieldsData, userFormFieldsSuccess]);

    useEffect(() => {
        const formData = getValues(); // Get all form data
        dispatch(setCheckoutFromData(formData));
    }, [watchedFields, getValues, dispatch]);

    const fieldStyle = formFieldStyle
        ? formFieldStyle
        : 'mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700';
    const labelStyle =
        'absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:scale-90 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-y-0 px-1 capitalize';

    return (
        <>
            {userFormFieldsLoading ? (
                <div className="flex items-center">
                    {' '}
                    <RotatingLines
                        width="25"
                        strokeColor="#6495ED"
                        strokeWidth="6"
                    />
                    <p>Loading...</p>
                </div>
            ) : (
                <form
                    onSubmit={
                        edit
                            ? handleSubmit(updateAddress)
                            : handleSubmit(addAddress)
                    }
                >
                    <div className="flex flex-col w-auto md:min-w-[500px] gap-y-6">
                        {/* name */}
                        <div className="relative">
                            {showfieldByKey('name', fields) && (
                                <>
                                    <input
                                        {...register('name')}
                                        type={'text'}
                                        name={'name'}
                                        id={'name'}
                                        onInput={() =>
                                            handleFieldChange('name')
                                        }
                                        placeholder={''}
                                        autoComplete="address-level1"
                                        className={classNames(
                                            fieldStyle,
                                            'remove-arrow'
                                        )}
                                    />
                                    <label
                                        htmlFor={'name'}
                                        className={labelStyle}
                                    >
                                        {design?.template_id === '29' ||
                                        design?.checkout_page ===
                                            (ONE || TWENTY_EIGHT) ||
                                        store_id === 3601
                                            ? getValueByKey('name')
                                            : 'name'}
                                    </label>
                                    <p className="text-rose-500">
                                        {
                                            errors['name' as keyof FormValues]
                                                ?.message
                                        }
                                    </p>
                                </>
                            )}
                        </div>
                        {/* phone and email */}
                        <div className="relative">
                            {showfieldByKey('email', fields) && (
                                <>
                                    <input
                                        {...register('email')}
                                        type={'text'}
                                        name={'email'}
                                        id={'email'}
                                        onInput={() =>
                                            handleFieldChange('email')
                                        }
                                        placeholder={''}
                                        autoComplete="address-level1"
                                        className={classNames(
                                            fieldStyle,
                                            'remove-arrow'
                                        )}
                                    />
                                    <label
                                        htmlFor={'email'}
                                        className={labelStyle}
                                    >
                                        {design?.template_id === '29' ||
                                        design?.checkout_page ===
                                            (ONE || TWENTY_EIGHT) ||
                                        store_id === 3601
                                            ? getValueByKey('email')
                                            : 'email'}
                                    </label>
                                    <p className="text-rose-500">
                                        {
                                            errors['email' as keyof FormValues]
                                                ?.message
                                        }
                                    </p>
                                </>
                            )}
                        </div>
                        <div>
                            {showfieldByKey('phone', fields) && (
                                <>
                                    <div className="flex items-center justify-between gap-2 h-12">
                                        <select
                                            {...register('phone_code')}
                                            name={'phone_code'}
                                            id={'phone_code'}
                                            className={classNames(
                                                cleanTwClassWithPrefix(
                                                    fieldStyle,
                                                    ['w-', 'px-', 'py-', 'pt-']
                                                ),
                                                'bg-transparent p-1 pt-4 h-full'
                                            )}
                                            onInput={(e: any) =>
                                                handleFieldChange(
                                                    'phone_code',
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {countryInfoArr?.map(
                                                (item: any) => (
                                                    <option
                                                        value={
                                                            item?.telephonePrefix
                                                        }
                                                        key={item?.id}
                                                    >
                                                        {item?.telephonePrefix}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <div className="relative w-full">
                                            <input
                                                {...register('phone')}
                                                type={'number'}
                                                name={'phone'}
                                                id={'phone'}
                                                onInput={() =>
                                                    handleFieldChange('phone')
                                                }
                                                placeholder={''}
                                                autoComplete="address-level1"
                                                className={classNames(
                                                    // cleanTwClassWithPrefix(
                                                    // ),
                                                    fieldStyle,
                                                    'remove-arrow'
                                                )}
                                            />

                                            <label
                                                htmlFor={'phone'}
                                                className={labelStyle}
                                            >
                                                {design?.template_id === '29' ||
                                                design?.checkout_page ===
                                                    (ONE || TWENTY_EIGHT) ||
                                                store_id === 3601
                                                    ? getValueByKey('phone')
                                                    : 'phone'}
                                            </label>
                                        </div>
                                    </div>
                                    <p className="text-rose-500">
                                        {
                                            errors['phone' as keyof FormValues]
                                                ?.message
                                        }
                                    </p>
                                </>
                            )}
                        </div>
                        {/* address */}
                        <div className="relative">
                            {showfieldByKey('address', fields) && (
                                <>
                                    <textarea
                                        {...register('address')}
                                        name={'address'}
                                        id={'address'}
                                        onInput={() =>
                                            handleFieldChange('address')
                                        }
                                        placeholder={''}
                                        autoComplete={'address-level1'}
                                        className={classNames(
                                            cleanTwClassWithPrefix(fieldStyle, [
                                                'pb-',
                                            ])
                                        )}
                                    />
                                    <label
                                        htmlFor={'address'}
                                        className={labelStyle}
                                    >
                                        {design?.template_id === '29' ||
                                        design?.checkout_page ===
                                            (ONE || TWENTY_EIGHT) ||
                                        store_id === 3601
                                            ? getValueByKey('address')
                                            : 'address'}
                                    </label>
                                    <p className="text-rose-500">
                                        {
                                            errors[
                                                'address' as keyof FormValues
                                            ]?.message
                                        }
                                    </p>
                                </>
                            )}
                        </div>
                        {/* district */}
                        <div className="relative">
                            {showfieldByKey('district', fields) && (
                                <>
                                    <select
                                        {...register('district')}
                                        name="district"
                                        className={classNames(
                                            cleanTwClassWithPrefix(fieldStyle, [
                                                'pt-',
                                                'pb-',
                                            ])
                                        )}
                                        onInput={(e: any) =>
                                            handleFieldChange(
                                                'district',
                                                e.target.value
                                            )
                                        }
                                    >
                                        {(!edit ||
                                            (edit &&
                                                editItem?.district ===
                                                    null)) && (
                                            <option defaultChecked value="">
                                                Choose a District
                                            </option>
                                        )}

                                        {districtArr?.map(
                                            (item: any, index: number) => (
                                                <option
                                                    value={item?.id}
                                                    key={index}
                                                >
                                                    {item?.bn_name}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <p className="text-rose-500">
                                        {
                                            errors[
                                                'district' as keyof FormValues
                                            ]?.message
                                        }
                                    </p>
                                </>
                            )}
                        </div>
                        {/* note */}
                        <div className="relative">
                            {showfieldByKey('note', fields) && (
                                <>
                                    <textarea
                                        {...register('note')}
                                        name={'note'}
                                        id={'note'}
                                        onInput={() =>
                                            handleFieldChange('note')
                                        }
                                        placeholder={''}
                                        autoComplete={'note-level1'}
                                        className={classNames(
                                            fieldStyle,
                                            'remove-arrow'
                                        )}
                                    />
                                    <label
                                        htmlFor={'note'}
                                        className={labelStyle}
                                    >
                                        {design?.template_id === '29' ||
                                        design?.checkout_page ===
                                            (ONE || TWENTY_EIGHT) ||
                                        store_id === 3601
                                            ? getValueByKey('note')
                                            : 'note'}
                                    </label>
                                </>
                            )}
                        </div>
                    </div>
                    {isAuthenticated && (
                        <div className="space-x-2 px-4 py-3 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                            >
                                {edit ? 'Update' : 'Save'}
                            </button>
                            {cancelBtn && (
                                <div
                                    onClick={() => handleCancel()}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                                >
                                    Cancel
                                </div>
                            )}
                        </div>
                    )}
                </form>
            )}
        </>
    );
};

export default CheckoutFormFortyThree;
