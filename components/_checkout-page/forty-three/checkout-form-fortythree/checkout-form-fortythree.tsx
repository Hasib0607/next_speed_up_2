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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { classNames, getCheckedValue } from '@/helpers/littleSpicy';


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

    // fields to show
    const [fields, setFields] = useState([]);

    const store_id = appStore?.id || null;

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
            let isValidPhone = getCheckedValue(value, PHONE_NUMBER_REGEX);
            if (!isValidPhone) {
                setError('phone', {
                    type: 'manual',
                    message: 'Need 11 digits',
                    // message: 'Invalid phone number',
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

    // Extracting language from db
    useEffect(() => {
        const userFormFields = userFormFieldsData?.data || [];
        const filteredFields = userFormFields?.filter(
            (item: any) => item.status !== 0 && item.name !== 'language' && item.name !== 'district'
        );

        if (userFormFieldsSuccess) {
            setFields(filteredFields);
        }
    }, [userFormFieldsData, userFormFieldsSuccess]);

    useEffect(() => {
        const formData = getValues(); // Get all form data
        dispatch(setCheckoutFromData(formData));
    }, [watchedFields, getValues, dispatch]);

    const fieldStyle = formFieldStyle ? formFieldStyle : 'mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700';

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
                <form onSubmit={edit ? handleSubmit(updateAddress) : handleSubmit(addAddress)}>
    <div className="py-2 space-y-5 sm:p-6 w-auto md:min-w-[500px]">
        {fields?.length > 0 &&
            fields?.map((item: any, index: number) => (
                <div key={index} className="relative">
                    <input
                        {...register(item?.name)}
                        type={item?.name === 'phone' ? 'number' : 'text'}
                        placeholder=" "
                        name={item?.name}
                        id={item?.name}
                        onInput={() => handleFieldChange(item?.name)}
                        autoComplete="address-level1"
                        className={classNames(
                            fieldStyle,
                            'peer pt-5 pb-1 w-full'
                        )}
                    />
                    <label
                        htmlFor={item?.name}
                        className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none 
                        text-gray-500 transition-all duration-200 peer-focus:top-0
                        peer-focus:scale-90 peer-focus:translate-y-0
                        peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-90
                        peer-[:not(:placeholder-shown)]:translate-y-0 px-1"
                    >
                        {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
                    </label>
                    <p className="text-rose-500 text-sm mt-1">
                        {errors[item?.name as keyof FormValues]?.message}
                    </p>
                </div>
            ))}
    </div>
    
    {isAuthenticated && (
        <div className="space-x-2 px-4 py-3 text-right sm:px-6">
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm 
                font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
                {edit ? 'Update' : 'Save'}
            </button>
            {cancelBtn && (
                <div
                    onClick={() => handleCancel()}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                    text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
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
