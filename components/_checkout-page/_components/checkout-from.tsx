'use client';

import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/consts';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import useAuth from '@/hooks/useAuth';
import {
    useGetDistrictQuery,
    useGetFormFieldsQuery,
    useUserAddressSaveMutation,
    useUserAddressUpdateMutation,
} from '@/redux/features/checkOut/checkOutApi';
import { setCheckoutFromData } from '@/redux/features/checkOut/checkOutSlice';
import { RootState } from '@/redux/store';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getValueByKey } from './customLang';

type FormValues = {
    name: string;
    phone: number;
    email: string;
    address: string;
    note: string;
    district: string;
    language: string;
    error: string;
};

const CheckoutFrom = ({
    setOpen,
    addressRefetch,
    modal,
    edit,
    editItem,
    cancelBtn,
}: any) => {
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();

    // fields to show
    const [fields, setFields] = useState([]);
    const [districtArr, setDistrictArr] = useState([]);
    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

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

        if (name === 'name' && value) {
            clearErrors(name);
        }

        if (name === 'address' && value) {
            clearErrors(name);
        }

        if (name === 'phone') {
            let isValidValue = PHONE_NUMBER_REGEX.test(value.toString());
            if (!isValidValue) {
                setError('phone', {
                    type: 'manual',
                    message: 'Invalid phone number',
                });
            } else {
                clearErrors(name);
                clearErrors('email');
            }
        }
        if (name === 'email') {
            let isValidValue = EMAIL_REGEX.test(value.toString());
            if (!isValidValue) {
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

    // Extracting district db
    useEffect(() => {
        const districtFormSelectFields = districtData?.data || [];
        if (districtSuccess) {
            setDistrictArr(districtFormSelectFields);
        }
    }, [districtData, districtSuccess]);

    // Extracting data from db
    useEffect(() => {
        const userFormFields = userFormFieldsData?.data || [];
        const filteredFields = userFormFields?.filter(
            (item: any) => item.status !== 0 && item.name !== 'language'
        );

        if (userFormFieldsSuccess) {
            setFields(filteredFields);
        }
    }, [userFormFieldsData, userFormFieldsSuccess]);

    useEffect(() => {
        const formData = getValues(); // Get all form data
        dispatch(setCheckoutFromData(formData));
    }, [watchedFields, getValues, dispatch]);

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
                    <p>Loading From...</p>
                </div>
            ) : (
                <form
                    onSubmit={
                        edit
                            ? handleSubmit(updateAddress)
                            : handleSubmit(addAddress)
                    }
                >
                    <div className="shadow overflow-hidden sm:rounded-md w-128">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            {fields?.length > 0 &&
                                fields?.map((item: any, index: number) => (
                                    <div
                                        className="col-span-6 sm:col-span-3 lg:col-span-2"
                                        key={index}
                                    >
                                        <label
                                            htmlFor={item?.name}
                                            className="block text-sm font-medium text-gray-700 capitalize"
                                        >
                                            {design?.template_id === '29' ||
                                            store_id === 3601
                                                ? getValueByKey(item?.name)
                                                : item?.name}
                                        </label>
                                        {item?.name == 'district' ? (
                                            <select
                                                {...register('district')}
                                                name="district"
                                                className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700"
                                                onInput={(e: any) =>
                                                    handleFieldChange(
                                                        item?.name,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {(!edit ||
                                                    (edit &&
                                                        editItem?.district ===
                                                            null)) && (
                                                    <option
                                                        defaultChecked
                                                        value=""
                                                    >
                                                        Choose a District
                                                    </option>
                                                )}

                                                {districtArr?.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => (
                                                        <option
                                                            value={item?.id}
                                                            key={index}
                                                        >
                                                            {item?.bn_name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        ) : (
                                            <input
                                                {...register(item?.name)}
                                                type={
                                                    item?.name == 'phone'
                                                        ? 'number'
                                                        : 'text'
                                                }
                                                name={item?.name}
                                                id={item?.name}
                                                onInput={() =>
                                                    handleFieldChange(
                                                        item?.name
                                                    )
                                                }
                                                autoComplete="address-level1"
                                                className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                            />
                                        )}
                                        <p className="text-rose-500">
                                            {
                                                errors[
                                                    item?.name as keyof FormValues
                                                ]?.message
                                            }
                                        </p>
                                    </div>
                                ))}
                        </div>
                        {isAuthenticated && (
                            <div className="space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    </div>
                </form>
            )}
        </>
    );
};

export default CheckoutFrom;
