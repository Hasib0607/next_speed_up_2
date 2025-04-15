'use client';

import { getUserDataFromCookies } from '@/app/actions';
import useBrowserInfo from '@/hooks/useBrowserInfo';
import useGeoLocation from '@/hooks/useGeoLocation';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    getFromLocalStorage,
    saveToLocalStorage,
} from '@/helpers/localStorage';
import { ANALYTICS_PREV_PERSIST, TRIGGER_E_TRACK } from '@/consts';
import { formattedDateTime } from '@/helpers/getTime';
import { removeFbclid } from '@/helpers/urlCleaner';

const EbitansAnalytics = ({ design, headersetting }: any) => {
    const store_id = design?.store_id || null;
    const { address, fetchAddress } = useGeoLocation();
    const { browser } = useBrowserInfo();
    const pathname = usePathname();
    const previousPath = useRef<string | null>(null);

    const visitTime = formattedDateTime();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const updateVisitorData = async (visitorData: any) => {
        try {
            const response = await fetch('/api/track-visitor', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visitorData),
            });
            const data = await response.json(); // Parse JSON response
            return data; // Return data for further processing if needed
        } catch (error) {
            console.error('Error sending visitor data:', error);
            return null; // Return null or handle the error gracefully
        }
    };

    if (previousPath.current !== pathname) {
        const exitTime = formattedDateTime();

        const previousAnalyticsData =
            getFromLocalStorage(ANALYTICS_PREV_PERSIST) ?? {};

        const updatedAnalyticsData = {
            id: previousAnalyticsData?.id,
            exit_time: exitTime,
        };

        previousPath.current = pathname;

        // if (Object.keys(previousAnalyticsData).length !== 0) {
        //     return;
        // }
        updateVisitorData(updatedAnalyticsData);
    }

    // for store
    const [userData, setUserData] = useState<any>({});

    // for device
    const [device, setDevice] = useState(null);
    const [os, setOs] = useState(null);

    //   for ip
    const [mac, setMac] = useState(null);
    const [state, setState] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [city, setCity] = useState(null);
    const [zipCode, setZipCode] = useState(null);

    const { user } = useSelector((state: RootState) => state.auth);
    const userId = useMemo(() => user?.id ?? null, [user]);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserDataFromCookies();
            setUserData(data);
        };
        fetchUserData();
    }, [pathname]);

    // const sendAddress = useCallback(() => {
    //       if (latitude && longitude) {
    //           fetchAddress(latitude, longitude);
    //       }
    //   }, [latitude,longitude,fetchAddress])

    // useEffect(() => {
    //     sendAddress()
    // }, [sendAddress]);

    // const getIpData = useCallback(async () => {
    //     try {
    //         const response = await fetch('/api/ip');

    //         const data = await response.json();
    //         const [lat = '', lon = ''] = data.loc && data.loc.split(',', 2);
    //         setState(data.region);
    //         setZipCode(data.postal);
    //         setLatitude(lat);
    //         setLongitude(lon);
    //         // setCountryName(data.country_name);
    //         setCountryCode(data.country);
    //         setCity(data.city);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }, []);

    // analytics info
    useEffect(() => {
        const sendVisitorData = async (visitorData: any) => {
            try {
                const response = await fetch('/api/track-visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(visitorData),
                });
                const data = await response.json(); // Parse JSON response
                // console.log('Server Response:', data);
                return data; // Return data for further processing if needed
            } catch (error) {
                console.error('Error sending visitor data:', error);
                return null; // Return null or handle the error gracefully
            }
        };

        const cleanedCurrentUrl = removeFbclid(
            userData?.currentUrl,
            userData?.domain
        );
        const cleanedPreviousUrl = removeFbclid(
            userData?.previousUrl,
            userData?.domain
        );

        const analyticsData = {
            store_id,
            store_url: userData?.domain,
            user_id: userId,
            page_url: cleanedCurrentUrl,
            page_title: document.title,
            refer_page_url: cleanedPreviousUrl,
            ip: userData?.userIp,
            device,
            mac,
            os,
            browser,
            country_code: countryCode,
            country_name: countryName,
            state,
            city,
            zip_code: zipCode,
            location: address,
            latitude,
            longitude,
            category_id: userData?.cat_id,
            product_id: userData?.productId,
            visit_time: visitTime,
            time_zone: timeZone,
        };

        const sendCommand = getFromLocalStorage(TRIGGER_E_TRACK);

        if (sendCommand) {
            sendVisitorData(analyticsData).then((response: any) => {
                const resData = response?.data?.data || {};
                saveToLocalStorage(ANALYTICS_PREV_PERSIST, resData);
            });
        }
    }, [
        store_id,
        userData,
        userId,
        device,
        mac,
        os,
        browser,
        countryCode,
        countryName,
        state,
        city,
        zipCode,
        address,
        latitude,
        longitude,
        visitTime,
        timeZone,
    ]);

    return null;
};

export default EbitansAnalytics;
