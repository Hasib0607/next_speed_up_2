'use client';

import { EMAIL_REGEX, ONE, TWENTY_EIGHT } from '@/consts';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import useAuth from '@/hooks/useAuth';
import {
    useGetCountryQuery,
    useGetDistrictQuery,
    useGetFormFieldsQuery,
    useUserAddressSaveMutation,
    useUserAddressUpdateMutation,
} from '@/redux/features/checkOut/checkOutApi';
import { setCheckoutFromData } from '@/redux/features/checkOut/checkOutSlice';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getValueByKey } from './customLang';
import {
    checkValidPhoneNumberByCode,
    classNames,
    cleanTwClassWithPrefix,
    getCheckedValue,
} from '@/helpers/littleSpicy';

// import {
//     FaUser,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
//     FaStickyNote,
//     FaEnvelope,
// } from 'react-icons/fa';

type FormValues = {
    name: string;
    phone_code: string;
    code: string;
    phone: number;
    email: string;
    address: string;
    note: string;
    district: string;
    language: string;
    error: string;
};

const CheckoutFrom = ({
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

    // fields to show
    const [fields, setFields] = useState<any>([]);
    // const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [phoneCode, setPhoneCode] = useState('');
    const [countryInfoArr, setCountryInfoArr] = useState<any>([]);
    const [districtArr, setDistrictArr] = useState<any>([]);

    const store_id = appStore?.id || null;

    const {
        data: countryData,
        isLoading: countryLoading,
        isSuccess: countrySuccess,
        refetch: countryRefetch,
    } = useGetCountryQuery({});

    const {
        data: districtData,
        isLoading: districtLoading,
        isSuccess: districtSuccess,
        refetch: districtRefetch,
    } = useGetDistrictQuery({});

    const {
        data: userFormFieldsData,
        isLoading: userFormFieldsLoading,
        isSuccess: userFormFieldsSuccess,
    } = useGetFormFieldsQuery({ store_id });

    const getCountryCode = useMemo(
        () =>
            countryInfoArr?.find(
                (item: any) => item.telephonePrefix === phoneCode
            ),
        [countryInfoArr, phoneCode]
    );

    const selectedCountryCode = getCountryCode?.countryCode ?? 'BD';

    const generateDynamicSchema = (fields: any[]) => {
        const schemaObject: Record<string, z.ZodTypeAny> = {};

        fields?.forEach((field) => {
            const { name } = field;

            const capitalName = capitalizeFirstLetter(name);

            const type = typeof name;
            // Base validation rules
            let validation: z.ZodTypeAny = z.string();

            // Customize validation based on field type
            if (type === 'number') {
                validation = z
                    .number({
                        invalid_type_error: `${capitalName} must be a number`,
                    })
                    .int(); // Ensure integer numbers if required;
            } else if (type === 'string') {
                validation = z.string();
            } else {
                validation = z.any(); // Fallback for unsupported types
            }

            // Add required validation
            if (name === 'name' || name === 'address') {
                if (type === 'string') {
                    validation = (validation as z.ZodString).min(1, {
                        message: `${capitalName} is required`,
                    });
                }
            }

            if (name === 'district') {
                validation = z.any();
                // .refine(
                //     (val) => val !== "",
                //     {
                //         message: `${capitalName} is required`,
                //     }
                // );
            }

            // Add field-specific validations (e.g., phone regex)
            if (name === 'phone') {
                validation = z.string().optional();
            }
            // Add field-specific validations (e.g., email regex)
            if (name === 'email') {
                validation = z.string().optional();
            }
            // if (store?.auth_type === 'EasyOrder' && !isAuthenticated && !userPhone){
            // }

            // Assign to the schema object
            schemaObject[name] = validation;
        });

        // Return the Zod schema object
        const schema = z.object(schemaObject);

        // Add conditional validation for phone and email
        return schema.superRefine((data, ctx) => {
            const isPhoneEmpty = !data.phone?.trim();
            const isEmailEmpty = !data.email?.trim();

            if (isPhoneEmpty && isEmailEmpty) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Either Phone or Email must be provided',
                    path: ['phone'], // Error for the phone field
                });

                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Either Phone or Email must be provided',
                    path: ['email'], // Error for the email field
                });
            }
        });
    };

    // Generate schema dynamically
    const schemaResolver = generateDynamicSchema(fields);

    // ex: { name: '', phone: '', address: '',note: '',district: '', };

    const defaultValues = edit
        ? { ...editItem, district: editItem?.district_id }
        : null;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
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
            // console.log('phoneWithCode', phoneWithCode);
            // let isValidPhone = getCheckedValue(phoneWithCode, PHONE_NUMBER_REGEX);
            let isValidPhone = checkValidPhoneNumberByCode(
                phoneWithCode,
                selectedCountryCode
            );
            if (!isValidPhone) {
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
    // console.log("fields",fields);

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

    const fieldKey = (fieldName: string) => {
        return fields?.some((item: any) => item?.name == fieldName);
    };

    // Extracting country db
    useEffect(() => {
        const allCountryInfo = countryData?.data || [];
        if (countrySuccess) {
            setCountryInfoArr(allCountryInfo);
        }
    }, [countryData, countrySuccess]);

    // Extracting district db
    useEffect(() => {
        const districtFormSelectFields = districtData?.data || [];
        if (districtSuccess) {
            setDistrictArr(districtFormSelectFields);
        }
    }, [districtData, districtSuccess]);

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
    const labelStyle = 'block text-sm font-medium text-gray-700 capitalize';
    // console.log("selectedCountryId",setPhoneCode);

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
                        <div>
                            {fieldKey('name') && (
                                <>
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
                                    <input
                                        {...register('name')}
                                        type={'text'}
                                        name={'name'}
                                        id={'name'}
                                        onInput={() =>
                                            handleFieldChange('name')
                                        }
                                        placeholder={'full name'}
                                        autoComplete="address-level1"
                                        className={classNames(
                                            fieldStyle,
                                            'remove-arrow'
                                        )}
                                    />

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
                        <div>
                            {fieldKey('email') && (
                                <>
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
                                    <input
                                        {...register('email')}
                                        type={'text'}
                                        name={'email'}
                                        id={'email'}
                                        onInput={() =>
                                            handleFieldChange('email')
                                        }
                                        placeholder={'email'}
                                        autoComplete="address-level1"
                                        className={classNames(
                                            fieldStyle,
                                            'remove-arrow'
                                        )}
                                    />

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
                            {fieldKey('phone') && (
                                <>
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
                                    <div className="flex items-center justify-between gap-2 h-10">
                                        <select
                                            {...register('phone_code')}
                                            name={'phone_code'}
                                            id={'phone_code'}
                                            className={classNames(
                                                cleanTwClassWithPrefix(
                                                    fieldStyle,
                                                    ['w-', 'px-', 'py-']
                                                ),
                                                'w-20 bg-transparent h-full p-1'
                                            )}
                                            onInput={(e: any) =>
                                                handleFieldChange(
                                                    'phone_code',
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {/* {(!edit ||
                                                (edit &&
                                                    editItem?.district ===
                                                        null)) && (
                                                <option defaultChecked value="">
                                                    Choose a District
                                                </option>
                                            )} */}
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
                                        <input
                                            {...register('phone')}
                                            type={'number'}
                                            name={'phone'}
                                            id={'phone'}
                                            onInput={() =>
                                                handleFieldChange('phone')
                                            }
                                            placeholder={'phone number'}
                                            autoComplete="address-level1"
                                            className={classNames(
                                                fieldStyle,
                                                'remove-arrow'
                                            )}
                                        />
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
                        <div>
                            {fieldKey('address') && (
                                <>
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
                                    <textarea
                                        {...register('address')}
                                        name={'address'}
                                        id={'address'}
                                        onInput={() =>
                                            handleFieldChange('address')
                                        }
                                        placeholder={'detailed address'}
                                        autoComplete={'address-level1'}
                                        className={classNames(fieldStyle)}
                                    />

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
                        <div>
                            {fieldKey('district') && (
                                <>
                                    <label
                                        htmlFor={'district'}
                                        className={labelStyle}
                                    >
                                        {design?.template_id === '29' ||
                                        design?.checkout_page ===
                                            (ONE || TWENTY_EIGHT) ||
                                        store_id === 3601
                                            ? getValueByKey('district')
                                            : 'district'}
                                    </label>
                                    <select
                                        {...register('district')}
                                        name="district"
                                        className={fieldStyle}
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
                        <div>
                            {fieldKey('note') && (
                                <>
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
                                    <textarea
                                        {...register('note')}
                                        name={'note'}
                                        id={'note'}
                                        onInput={() =>
                                            handleFieldChange('note')
                                        }
                                        placeholder={'note (optional)'}
                                        autoComplete={'note-level1'}
                                        className={classNames(
                                            fieldStyle,
                                            'remove-arrow'
                                        )}
                                    />
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

export default CheckoutFrom;
