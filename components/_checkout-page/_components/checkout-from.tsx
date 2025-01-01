'use client';

import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/consts';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import useAuth from '@/hooks/useAuth';
import {
    useGetFormFieldsQuery,
    useUserAddressSaveMutation,
    useUserAddressUpdateMutation,
} from '@/redux/features/checkOut/checkOutApi';
import { setCheckoutFromData } from '@/redux/features/checkOut/checkOutSlice';
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as z from 'zod';
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

// const schema = z
//     .object({
//         name: z
//             .string({
//                 required_error: 'Name is required',
//                 invalid_type_error: 'Name must be a string',
//             })
//             .trim() // Remove leading and trailing whitespace
//             .min(1, { message: 'Name is required' })
//             .max(100, { message: 'Name must be at most 100 characters long' }),

//         phone: z
//             .string({
//                 required_error: 'Phone number is required',
//                 invalid_type_error: 'Phone number must be a number',
//             })
//             .regex(PHONE_NUMBER_REGEX, {
//                 message: 'Phone number is not valid',
//             }), // Regex for Bangladesh phone numbers

//         address: z
//             .string({
//                 required_error: 'Address is required',
//             })
//             .trim() // Remove leading and trailing whitespace
//             .min(1, { message: 'Address is required' })
//             .max(255, {
//                 message: 'Address must be at most 255 characters long',
//             }),
//     })

const CheckoutFrom = ({
    setOpen,
    addressRefetch,
    modal,
    edit,
    editItem,
}: any) => {
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();
    // fields to show
    const [fields, setFields] = useState([]);
    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    // const { checkoutFromData } = useSelector(
    //     (state: RootState) => state.checkout
    // ); // Access updated Redux state
    // const {
    //     phone: userPhone,
    //     email: userEmail,
    // } = checkoutFromData || {};

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
            // let validation = z.string();

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
            if (
                name === 'name' ||
                name === 'phone' ||
                name === 'address'
            ) {
                if (type === 'string') {
                    validation = (validation as z.ZodString).min(1, {
                        message: `${capitalName} is required`,
                    });
                } else if (type === 'number') {
                    validation = (validation as z.ZodString).refine(
                        (val) => val !== undefined && val !== null,
                        {
                            message: `${capitalName} is required`,
                        }
                    );
                }
            }

            // Add field-specific validations (e.g., phone regex)
            if (name === 'phone') {
                validation = z
                    .string()
                    .nonempty('Phone is required')
                    .regex(PHONE_NUMBER_REGEX, {
                        message: 'Invalid phone number',
                    });
            }
            // Add field-specific validations (e.g., email regex)
            if (name === 'email') {
                validation = z
                    .string()
                    .trim()
                    .regex(EMAIL_REGEX, {
                        message: 'Invalid email format',
                    });
            }
            // if (store?.auth_type === 'EasyOrder' && !isAuthenticated && !userPhone){
            // }

            // Assign to the schema object
            schemaObject[name] = validation;
        });

        // Return the Zod schema object
        return z.object(schemaObject);
    };

    // Generate schema dynamically
    const schema = generateDynamicSchema(fields);

    const defaultValues = edit ? { ...editItem } : null; //{ name: '', phone: '', address: '',note: '',district: '', };

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
        resolver: zodResolver(schema),
        defaultValues,
    });

    // Watch specific fields or the whole form for changes
    const watchedFields = watch(); // Watches all fields

        // Trigger validation only for the specific field on change
        const handleFieldChange = (name: keyof FormValues) => {
            // const value = watchedFields[name] as any;
            trigger(name); // Triggers validation for a specific field
            if (name === 'email') {
        // console.log("vsacfsc",value);
        
        // clearErrors(name);
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
                                            store_id === 3601 ||
                                            store_id === 3904
                                                ? getValueByKey(item?.name)
                                                : item?.name}
                                        </label>
                                        <input
                                            {...register(item?.name)}
                                            type={
                                                item?.name == 'phone'
                                                    ? 'number'
                                                    : 'text'
                                            }
                                            name={item?.name}
                                            id={item?.name}
                                            onChange={() =>
                                                handleFieldChange(item?.name)
                                            }
                                            autoComplete="address-level1"
                                            className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                        />
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
                                <div
                                    onClick={() => handleCancel()}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                                >
                                    Cancel
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            )}
        </>
    );
};

export default CheckoutFrom;
