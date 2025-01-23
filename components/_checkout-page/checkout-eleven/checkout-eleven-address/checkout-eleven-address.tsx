"use client";
import useAuth from "@/hooks/useAuth";
import { useGetAddressQuery } from "@/redux/features/checkOut/checkOutApi";
import { RootState } from "@/redux/store";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SingleAddress from '@/components/_checkout-page/checkout-eleven/single-address/single-address';
import { getFastArr } from "@/helpers/littleSpicy";
import CheckoutFrom from '@/components/_checkout-page/_components/checkout-from';
import QuickView from '@/utils/quick-view';

const CheckOutElevenAddress = ({
  selectAddress, setSelectAddress, design
}: any) => {
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
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="flex justify-between items-center pb-3">
              <label
                htmlFor="name"
                className="block text-xl font-semibold text-gray-700"
              >
                Addresses{" "}
                <span className="text-sm">(Please Select Your Address)</span>
              </label>
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
      <QuickView open={open} setOpen={setOpen} design={design} auto>
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
            </QuickView>
    </>
  );
};

export default CheckOutElevenAddress;
