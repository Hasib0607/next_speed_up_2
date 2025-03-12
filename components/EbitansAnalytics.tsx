'use client';

import { name } from '@/consts/index';
import useBrowserInfo from '@/hooks/useBrowserInfo';
import useGeoLocation from '@/hooks/useGeoLocation';
import { usePostEbitansAnalyticsMutation } from '@/redux/features/analytics/analyticsApi';
import moment from 'moment';
import { useEffect, useState } from 'react';

const EbitansAnalytics = ({ design, headersetting, referrer }: any) => {

    const store_id = design?.store_id || null;
    const { address, fetchAddress } = useGeoLocation();
    const { browser } = useBrowserInfo();

    const visitTime = moment().format('LTS');
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // for store
    const [storeUrl, setStoreUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [pageUrl, setPageUrl] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [referPageUrl, setReferPageUrl] = useState('');

    // for device
    const [device, setDevice] = useState(null);
    const [os, setOs] = useState(null);
    const [mobileOs, setMobileOs] = useState(null);
    const [location, setLocation] = useState(null);

    //   for ip
    const [ip, setIP] = useState('');
    const [mac, setMac] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    // for product and category

    const [categoryId, setCategoryId] = useState('');
    const [productId, setProductId] = useState('');

    useEffect(() => {
        if (name) {
            setStoreUrl(name);
        }
        if (headersetting) {
            if (headersetting?.uid) {
                setUserId(headersetting?.uid);
            }
        }
        if (document.title) {
            setPageTitle(document.title);
        }
    }, [headersetting]);

    useEffect(() => {
        if (typeof window !== 'undefined' && name) {
            setPageUrl(`https://${name}${window.location.pathname}`);
        }
    }, [setPageUrl]);

    useEffect(() => {
        if (latitude && longitude) {
            fetchAddress(latitude, longitude);
        }
    }, [latitude, longitude, fetchAddress]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('/api/ip');

                // if (!response.ok) {
                //     console.log('response of /api/ip is not found!');
                // }

                const data = await response.json();
                // console.log('IP Data:', data.ipString);
                setIP(data.ip);
                setState(data.region);
                setLocation(data.loc);
                setZipCode(data.postal);
                // setLatitude(data.latitude);
                // setLongitude(data.longitude);
                // setCountryName(data.country_name);
                setCountryCode(data.country);
                setCity(data.city);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        setReferPageUrl(referrer);
        getData();
    }, [setReferPageUrl, referrer]);

    const [postEbitansAnalytics] = usePostEbitansAnalyticsMutation();

    // user info
    useEffect(() => {
        let analyticsData = {
            store_id,
            store_url: storeUrl,
            user_id: userId,
            page_url: pageUrl,
            page_title: pageTitle,
            refer_page_url: referPageUrl,
            ip,
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
            category_id: categoryId,
            product_id: productId,
            visit_time: visitTime,
            time_zone: timeZone,
        };
        console.log('analyticsData', analyticsData);

        // if (ip) {
        //     postEbitansAnalytics({
        //         analyticsData,
        //     });
        // }
    }, [
        store_id,
        storeUrl,
        userId,
        pageUrl,
        pageTitle,
        referPageUrl,
        ip,
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
        categoryId,
        productId,
        visitTime,
        timeZone,
    ]);
    return null;
};

export default EbitansAnalytics;
