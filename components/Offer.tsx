'use client';

import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import DateRange from './offer/date-range';
import GetProductByProductId from './offer/get-prod-by-prodid';
import SpecificDate from './offer/specific-date';
import Skeleton from './loaders/skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetEbiAnalyticsMutation } from '@/redux/features/offer/offerApi';
import { useGetCampaignQuery } from '@/redux/features/checkOut/checkOutApi';
import useGeoLocation from '@/hooks/useGeoLocation';

const Offer = ({ design }: any) => {
    const store_id = design?.store_id || null;

    const { address, fetchAddress } = useGeoLocation();
    const { user } = useSelector((state: RootState) => state?.auth); // Access updated Redux state

    const [device, setDevice] = useState(null);
    const [offer, setOffer] = useState<any>([]);
    const [browser, setBrowser] = useState('Unknown');
    const [os, setOs] = useState(null);
    const [mobileOs, setMobileOs] = useState(null);

    //   for ip
    const [ip, setIP] = useState('');
    const [state, setState] = useState('');
    const [postal, setPostal] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [city, setCity] = useState('');

    const getData = async () => {

        try {
            const response = await fetch('/api/ip');
            
            // if (!response.ok) {
            //     notFound()
            // }
            console.log('response', response);

            const data = await response.json();
            console.log('IP Data:', data);
            setIP(data.ip);
            setState(data.region);
            setPostal(data.postal);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setCountryName(data.country_name);
            setCountryCode(data.country_code);
            setCity(data.city);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    });

    const [campaign, setCampaign] = useState([]);

    const [getEbiAnalytics] = useGetEbiAnalyticsMutation();

    // user info
    useEffect(() => {
        if (ip) {
            getEbiAnalytics({
                store_id,
                user,
                device,
                ip,
                city,
                countryCode,
                countryName,
                latitude,
                longitude,
                postal,
                state,
                address,
                browser,
                mobileOs,
                os,
            });
        }
    }, [
        ip,
        store_id,
        user,
        device,
        city,
        countryCode,
        countryName,
        latitude,
        longitude,
        postal,
        state,
        address,
        browser,
        mobileOs,
        os,
        getEbiAnalytics,
    ]);

    const {
        data: campaignsData,
        isLoading: campaignsLoading,
        isError: campaignError,
        isSuccess: campaignsSuccess,
        refetch: campaignsRefetch,
    } = useGetCampaignQuery({ store_id });

    useEffect(() => {
        const isCampaigns = campaignsData?.status;
        const allCampaigns = campaignsData?.data;

        if (campaignsSuccess && isCampaigns && allCampaigns?.length > 0) {
            setCampaign(allCampaigns);
        }
    }, [campaignsSuccess, campaignsData]);

    useEffect(() => {
        if (latitude && longitude) {
            fetchAddress(latitude, longitude);
        }
    }, [latitude, longitude, fetchAddress]);

    const start_date = new Date(offer?.start_date).getTime();
    const end_date = new Date(offer?.end_date).setHours(23, 59, 59);

    const sDate: any = campaign?.map((item: any) => item?.start_date);
    const eDate: any = campaign?.map((item: any) => item?.end_date);

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render a completed state
            return (
                <div className="text-3xl font-bold text-center">Time's up!</div>
            );
        } else {
            // Render a countdown
            return (
                <div className="flex space-x-2 items-center">
                    {days ? (
                        <>
                            <span
                                className="sm:font-semibold sm:text-lg text-center  w-full  min-w-fit sm:h-10  sm:py-1 sm:px-4 px-4 rounded"
                                style={{
                                    backgroundColor: design?.header_color,
                                    color: design?.text_color,
                                }}
                            >
                                {' '}
                                {'Days : ' + days}
                            </span>{' '}
                            <span>:</span>
                        </>
                    ) : null}
                    <span
                        className="sm:font-semibold  sm:text-lg text-center  w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 px-4 rounded"
                        style={{
                            backgroundColor: design?.header_color,
                            color: design?.text_color,
                        }}
                    >
                        {hours}
                    </span>{' '}
                    <span>:</span>
                    <span
                        className="sm:font-semibold  sm:text-lg text-center  w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 px-4 rounded"
                        style={{
                            backgroundColor: design?.header_color,
                            color: design?.text_color,
                        }}
                    >
                        {minutes}
                    </span>
                    <span>:</span>
                    <span
                        className="sm:font-semibold  sm:text-lg text-center  w-full  min-w-fit sm:h-10  sm:py-1 sm:px-2 px-4 rounded"
                        style={{
                            backgroundColor: design?.header_color,
                            color: design?.text_color,
                        }}
                    >
                        {seconds}
                    </span>
                </div>
            );
        }
    };

    if (campaignsLoading && !campaignError) {
        return <Skeleton />;
    }

    return (
        <div className="sm:container px-5 sm:py-10 py-5 mt-20">
            {(start_date >= Date.now() ||
                end_date <= Date.now() ||
                offer?.length === 0 ||
                offer?.products?.length === 0) &&
            (sDate >= Date.now() ||
                eDate <= Date.now() ||
                campaign?.length === 0) ? (
                <div className="flex justify-center items-center h-auto md:h-[calc(100vh-500px)]">
                    <div className="text-xl text-red-500 font-semibold">
                        Offer Not Available!
                    </div>
                </div>
            ) : (
                <>
                    {start_date <= Date.now() &&
                        Date.now() <= end_date &&
                        offer?.length !== 0 && (
                            <div>
                                <div className="py-5">
                                    <div className="flex flex-wrap justify-between items-center sm:gap-4 shadow-lg py-3">
                                        <h3 className="font-bold text-2xl font-sans my-2">
                                            {offer?.name}
                                        </h3>
                                        <div className="flex flex-wrap sm:flex-nowrap  sm:justify-end items-center sm:space-x-2 ">
                                            <p className="text-xl font-semibold min-w-fit">
                                                End Time :{' '}
                                            </p>
                                            <Countdown
                                                date={
                                                    Date.now() +
                                                    (end_date - Date.now())
                                                }
                                                renderer={renderer}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <GetProductByProductId
                                    offerProducts={offer?.products}
                                />
                            </div>
                        )}
                    <CampainPage design={design} campaign={campaign} />
                </>
            )}
        </div>
    );
};

export default Offer;

const CampainPage = ({ campaign, design }: any) => {
    return (
        <div>
            {campaign?.map((item: any) => (
                <GetComponent
                    key={item?.id}
                    component={item?.length_type}
                    item={item}
                    design={design}
                />
            ))}
        </div>
    );
};

const GetComponent = ({ component, item, design }: any) => {
    switch (component) {
        case 'date_range':
            return <DateRange design={design} item={item} />;
        case 'specific_date':
            return <SpecificDate design={design} item={item} />;
        default:
            return null;
    }
};
