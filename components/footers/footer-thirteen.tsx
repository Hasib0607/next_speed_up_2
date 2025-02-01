import {
    ArrowRightCircleIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';
import Newsletter from './components/newsletter';
import Link from 'next/link';
import WhatsApp from './components/whatsApp';
import AllPaymantGateway from './components/all-payment-gateway';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FooterThirteen = ({ headersetting, menu }: any) => {
    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;
    return (
        <div className="bg-gray-100">
            <div className="sm:container px-5 sm:py-10 py-5 min-h-[300px]">
                <Newsletter headersetting={headersetting} store_id={store_id} />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    <div className="">
                        <Fheader bg={'#414141'} name={'Store Information'} />
                        <div className="my-5 space-y-2">
                            <div className="flex items-center gap-3">
                                <PhoneIcon className="w-5 h-5 text-gray-500 " />
                                <p className="text-gray-700 font-semibold text-md">
                                    {headersetting?.phone}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <EnvelopeIcon className="w-5 h-5 text-gray-500 " />
                                <p className="text-gray-700 font-semibold text-md">
                                    {headersetting?.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPinIcon className="w-5 h-5 text-gray-500 " />
                                <p className="text-gray-700 font-semibold text-md">
                                    {headersetting?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Fheader bg={'#40AF64'} name={'Categories'} />
                        {category
                            ?.slice(0, 5)
                            .map((i: any) => (
                                <Single key={i?.id} id={i?.id} text={i?.name} />
                            ))}
                    </div>
                    <div className="">
                        <Fheader bg={'#F7BE24'} name={'Menu'} />
                        {menu
                            ?.slice(0, 5)
                            ?.map((i: any) => (
                                <Single
                                    url={i?.custom_link || (i?.url ? `/${i?.url}` : "/")}
                                    text={i?.name}
                                    key={i?.id}
                                />
                            ))}
                    </div>
                    <div className="">
                        <Fheader bg={'#de5648'} name={'Your account'} />
                        <div className="flex flex-col">
                            <Single text={'Profile'} url={'/profile'} />
                            <Single text={'My Order'} url={'/profile/order'} />
                            <Single text={'Checkout'} url={'/checkout'} />

                            {/* {user?.verify ? (
                    <Single
                      text={"Logout"}
                      url={"/login"}
                      // onClick={() => dispatch(logout())}
                    />
                  ) : (
                    <Single text={"Login"} url={"/login"} />
                  )} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:container px-5 mt-8 mb-20 md:mb-0">
                <AllPaymantGateway headersetting={headersetting} />
            </div>
            {/* <Messenger /> */}
            <WhatsApp />
        </div>
    );
};

export default FooterThirteen;

const Fheader = ({ bg, name }: any) => {
    return (
        <div className="h-12 flex items-center border-b border-gray-400 gap-2">
            <div
                className={`text-white h-full w-12 flex justify-center items-center `}
                style={{ backgroundColor: bg }}
            >
                <MapPinIcon className="w-6 h-6" />
            </div>
            <div className="grow">
                <h3 className="text-2xl text-[#414141]">{name}</h3>
            </div>
        </div>
    );
};

const Single = ({ text, url, id, onClick }: any) => {
    return (
        <Link
            onClick={onClick}
            href={url ? url : '/category/' + id}
            className="flex justify-start items-center gap-3 py-1"
        >
            <ArrowRightCircleIcon className="h-4 w-4" />
            <p>{text}</p>
        </Link>
    );
};
