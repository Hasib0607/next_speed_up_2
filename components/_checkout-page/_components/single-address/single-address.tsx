'use client';

import { getFastArr } from '@/helpers/littleSpicy';
import { useUserAddressDeleteMutation } from '@/redux/features/checkOut/checkOutApi';
import { RootState } from '@/redux/store';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SingleAddress = ({
    item,
    design,
    addressArr,
    setEdit,
    setEditItem,
    setOpen,
    selectAddress,
    setSelectAddress,
    addressRefetch,
}: any) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const handleEdit = () => {
        setEditItem({ ...item });
        setOpen(true);
        setEdit(true);
    };

    const [userAddressDelete] = useUserAddressDeleteMutation();
    const id = item?.id;

    const deleteAddress = () => {
        if (user) {
            userAddressDelete({ id })
                .unwrap()
                .then((res: any) => {
                    if (res?.status) {
                        setSelectAddress(getFastArr(addressArr));
                        addressRefetch();
                        toast.success(
                            res?.message || 'Address Deleted Successfully'
                        );
                    } else {
                        toast.error(res?.message);
                    }
                })
                .catch(() => {
                    toast.error('Error Deleting Address');
                });
        } else {
            toast.warning('Please Login First!');
        }
    };

    return (
        <div
            className={`border border-gray-300 p-5 rounded space-y-2 w-full transition-colors duration-300 relative cursor-pointer`}
            style={{
                backgroundColor:
                    selectAddress?.id === item?.id
                        ? design?.header_color
                        : design?.template_id === '34'
                          ? '#000'
                          : '#fff',
                color:
                    selectAddress?.id === item?.id
                        ? design?.text_color
                        : design?.template_id === '34'
                          ? '#fff'
                          : '#000',
            }}
            onClick={() => setSelectAddress(item)}
        >
            <div className="flex justify-between">
                <h3 className="font-semibold tracking-wide capitalize">
                    Name: {item?.name}
                </h3>
                <div className="flex gap-2">
                    <PencilIcon width={20} onClick={() => handleEdit()} />
                    <TrashIcon width={20} onClick={() => deleteAddress()} />
                </div>
            </div>
            <p className="font-normal text-sm tracking-wider">
                <span className="text-base font-medium">Phone:</span>{' '}
                {item?.phone}
            </p>
            <p className="font-normal text-sm tracking-wider">
                <span className="text-base font-medium">Address: </span>
                {item?.address}
            </p>
        </div>
    );
};
export default SingleAddress;
