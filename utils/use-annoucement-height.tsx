'use client';

import { EXTRACT_HEADER_INFORMATION } from '@/consts';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { useGetAnnouncementQuery } from '@/redux/features/home/homeApi';
import { useEffect, useState } from 'react';

const useAnnouncementScroll = () => {
    const headerSettingData = getFromLocalStorage(EXTRACT_HEADER_INFORMATION);
    const store_id = headerSettingData?.store_id || null;

    const [announcements, setAnnouncements] = useState([]);

    const { data: announcementsData, isSuccess: announcementsSuccess } =
        useGetAnnouncementQuery({ store_id });

    useEffect(() => {
        if (announcementsSuccess) {
            const announcementsArr = announcementsData?.data || [];
            setAnnouncements(announcementsArr);
        }
    }, [announcementsData, announcementsSuccess]);

    const [announcementHeight, setAnnouncementHeight] = useState(0);
    const [scrollPassed, setScrollPassed] = useState(false);

    useEffect(() => {
        const announcementElement = document.getElementById('annoucement');
        if (announcementElement) {
            const height = announcementElement.offsetHeight;
            setAnnouncementHeight(height);
        }

        const handleScroll = () => {
            if (
                window.scrollY >= announcementHeight &&
                announcements?.length > 0
            ) {
                setScrollPassed(true);
            } else {
                setScrollPassed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPassed, announcementHeight, announcements]);

    return { announcementHeight, scrollPassed };
};

export default useAnnouncementScroll;
