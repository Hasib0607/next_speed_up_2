'use client';

import { setCheckoutBookingFromData } from '@/redux/features/checkOut/checkOutSlice';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

type FormValues = {
    name: string;
    phone: number;
    email: string;
    date: string;
    start_date: string;
    end_date: string;
    pickup_location: string;
    drop_location: string;
    comment: string;
    time: string;
};

const BookingFrom = ({ bookingData }: any) => {
    const dispatch = useDispatch();
    
    const {
        register,
        watch,
        getValues
    } = useForm<FormValues>({});

    const watchedFields = watch(); // Watches all fields

    // const handleChange = (e: any) => {
    // };

    useEffect(() => {
        const formData = getValues(); // Get all form data
        dispatch(setCheckoutBookingFromData(formData));
    }, [watchedFields, getValues, dispatch]);

    return (
        <>
            <form className="flex flex-col gap-3 max-w-[500px] min-w-[300px] mx-auto">
                <h1 className="text-center text-2xl">Booking Information</h1>
                <>
                    {bookingData?.map((item: any) => (
                        <div key={item?.field_name}>
                     
                                {item?.field_name === 'name' && (
                                    <>
                                        <div
                                            className="flex flex-col "
                                        >
                                            <label>
                                                {item?.c_name}{' '}
                                                <span className="text-red-500">
                                                    {item?.requirement_status ===
                                                        'required' && '*'}
                                                </span>
                                            </label>
                                            <input
                                                {...register('name', {
                                                    required:
                                                        item?.requirement_status ===
                                                        'required',
                                                })}
                                                type="text"
                                                name="name"
                                                // onChange={handleChange}
                                                className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                            />
                                        </div>
                                    </>
                                )}

                                {item?.field_name === 'phone' && (
                                    <div className="flex flex-col " key={item?.field_name}>
                                        <label>
                                            {item?.c_name}{' '}
                                            <span className="text-red-500">
                                                {item?.requirement_status ===
                                                    'required' && '*'}
                                            </span>
                                        </label>
                                        <div className="flex items-center w-full">
                                            <p className="mt-1 border-y border-l py-3 border-gray-400 rounded-l-md px-2 bg-gray-400">
                                                +88
                                            </p>
                                            <input
                                                {...register('phone', {
                                                    required:
                                                        item?.requirement_status ===
                                                        'required',
                                                })}
                                                maxLength={11}
                                                minLength={11}
                                                type="tel"
                                                name="phone"
                                                // onChange={handleChange}
                                                className="mt-1 focus:ring-0 focus:border-gray-400 focus:border-l-0 block w-full shadow-md sm:text-md border-r-2 border-t-2 border-b-2 border-gray-300 rounded-tr-lg rounded-br-lg p-3 text-gray-700 remove-arrow"
                                            />
                                        </div>
                                    </div>
                                )}

                                {item?.field_name === 'email' && (
                                    <div className="flex flex-col ">
                                        <label>
                                            {item?.c_name}{' '}
                                            <span className="text-red-500">
                                                {item?.requirement_status ===
                                                    'required' && '*'}
                                            </span>
                                        </label>
                                        <input
                                            {...register('email', {
                                                required:
                                                    item?.requirement_status ===
                                                    'required',
                                            })}
                                            type="email"
                                            name="email"
                                            // onChange={handleChange}
                                            className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                        />
                                    </div>
                                )}

                                {item?.field_name === 'date' && (
                                    <div className="flex flex-col ">
                                        <label>
                                            {item?.c_name}{' '}
                                            <span className="text-red-500">
                                                {item?.requirement_status ===
                                                    'required' && '*'}
                                            </span>
                                        </label>
                                        <input
                                            {...register('date', {
                                                required:
                                                    item?.requirement_status ===
                                                    'required',
                                            })}
                                            type="date"
                                            name="date"
                                            // onChange={handleChange}
                                            className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                        />
                                    </div>
                                )}
                            
                                {item?.field_name === 'date range' && (
                                    <div>
                                        <h1>{item?.c_name}</h1>
                                        <div className="flex justify-between flex-wrap gap-3 mt-3">
                                            <div className="flex flex-col ">
                                                <label>
                                                    Start Date{' '}
                                                    <span className="text-red-500">
                                                        {item?.requirement_status ===
                                                            'required' && '*'}
                                                    </span>
                                                </label>
                                                <input
                                                    {...register('start_date', {
                                                        required:
                                                            item?.requirement_status ===
                                                            'required',
                                                    })}
                                                    type="date"
                                                    name="start_date"
                                                    // onChange={handleChange}
                                                    className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                                />
                                            </div>
                                            <div className="flex flex-col ">
                                                <label>
                                                    End Date{' '}
                                                    <span className="text-red-500">
                                                        {item?.requirement_status ===
                                                            'required' && '*'}
                                                    </span>
                                                </label>
                                                <input
                                                    {...register('end_date', {
                                                        required:
                                                            item?.requirement_status ===
                                                            'required',
                                                    })}
                                                    type="date"
                                                    name="end_date"
                                                    // onChange={handleChange}
                                                    className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            
                                {item?.field_name === 'location range' && (
                                    <div>
                                        <h1>{item?.c_name}</h1>
                                        <div className="flex justify-between flex-wrap gap-3 mt-3">
                                            <div className="flex flex-col ">
                                                <label>
                                                    Pickup Location{' '}
                                                    <span className="text-red-500">
                                                        {item?.requirement_status ===
                                                            'required' && '*'}
                                                    </span>
                                                </label>
                                                <input
                                                    {...register(
                                                        'pickup_location',
                                                        {
                                                            required:
                                                                item?.requirement_status ===
                                                                'required',
                                                        }
                                                    )}
                                                    type="text"
                                                    name="pickup_location"
                                                    // onChange={handleChange}
                                                    className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                                />
                                            </div>
                                            <div className="flex flex-col ">
                                                <label>
                                                    Drop Location{' '}
                                                    <span className="text-red-500">
                                                        {item?.requirement_status ===
                                                            'required' && '*'}
                                                    </span>
                                                </label>
                                                <input
                                                    {...register(
                                                        'drop_location',
                                                        {
                                                            required:
                                                                item?.requirement_status ===
                                                                'required',
                                                        }
                                                    )}
                                                    type="text"
                                                    name="drop_location"
                                                    // onChange={handleChange}
                                                    className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            
                                {item?.field_name === 'time' && (
                                    <div
                                        className="flex flex-col mt-3"
                                    >
                                        <label>
                                            {item?.c_name}{' '}
                                            <span className="text-red-500">
                                                {item?.requirement_status ===
                                                    'required' && '*'}
                                            </span>
                                        </label>
                                        <input
                                            {...register('time', {
                                                required:
                                                    item?.requirement_status ===
                                                    'required',
                                            })}
                                            type="time"
                                            name="time"
                                            // onChange={handleChange}
                                            className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                        />
                                    </div>
                                )}

                                {item?.field_name === 'comment' && (
                                    <div className="flex flex-col ">
                                        <label>
                                            {item?.c_name}{' '}
                                            <span className="text-red-500">
                                                {item?.requirement_status ===
                                                    'required' && '*'}
                                            </span>
                                        </label>
                                        <textarea
                                            {...register('comment', {
                                                required:
                                                    item?.requirement_status ===
                                                    'required',
                                            })}
                                            name="comment"
                                            // onChange={handleChange}
                                            className="mt-1 focus:ring-0 focus:border-gray-400 block w-full shadow-md sm:text-md border-2 border-gray-300 rounded-lg p-3 text-gray-700 remove-arrow"
                                        />
                                    </div>
                                )}
                        </div>
                    ))}
                </>
            </form>
        </>
    );
};

export default BookingFrom;
