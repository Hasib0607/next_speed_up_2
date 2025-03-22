'use client';

import { ANALYTICS_PERSIST, name } from '@/consts/index';
import { saveToLocalStorage } from '@/helpers/localStorage';
import useBrowserInfo from '@/hooks/useBrowserInfo';
import useGeoLocation from '@/hooks/useGeoLocation';
import { RootState } from '@/redux/store';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const EbitansAnalytics = ({
    design,
    headersetting,
    userData,
    productId = '',
    categoryId = '',
}: any) => {
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

    //   for ip
    const [ip, setIP] = useState('');
    const [mac, setMac] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (typeof window !== 'undefined' && name) {
            setPageUrl(`https://${name}${window.location.pathname}`);
        }
    }, [setPageUrl]);

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

    const baseData = useCallback(() => {
        if (document.title) {
            setPageTitle(document.title);
        }
        setUserId(user?.id);
        setStoreUrl(name);
        setIP(userData?.ip);
        setReferPageUrl(userData?.referrer);
        // console.log("userData",userData);
    }, [userData, user]);

    useEffect(() => {
        baseData();
    }, [baseData]);

    // analytics info
    const analyticsData = useMemo(() => {
        return {
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

    const saveVisitDataInLocalStorage = useCallback(() => {
        saveToLocalStorage(ANALYTICS_PERSIST, analyticsData);
    }, [analyticsData]);

    useEffect(() => {
        saveVisitDataInLocalStorage();
    }, [saveVisitDataInLocalStorage]);

    return null;
};

export default EbitansAnalytics;
