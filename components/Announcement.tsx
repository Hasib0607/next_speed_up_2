'use client';

import { useEffect, useState } from 'react';
import { useGetAnnouncementQuery } from '@/redux/features/home/homeApi';
import AnimateMarquee from './slider/animate-marquee';

// import useAnnouncementScroll from '@/utils/use-annoucement-height';

const Announcement = ({ design }: any) => {
    const store_id = design?.store_id || null;

    const [announcements, setAnnouncements] = useState([]);

    const { data: announcementsData, isSuccess: announcementsSuccess } =
        useGetAnnouncementQuery({ store_id });

    useEffect(() => {
        if (announcementsSuccess) {
            const announcementsArr = announcementsData?.data || [];
            setAnnouncements(announcementsArr);
        }
    }, [announcementsData, announcementsSuccess]);

    // const aH = useAnnouncementScroll()
    // console.log("aH",aH);

    return (
        announcements?.length > 0 && (
            <div id="annoucement" className="bg-[var(--header-color)]">
                <div className="relative overflow-x-hidden container">
                    <AnimateMarquee>
                        <div className="p-1 md:py-2 whitespace-nowrap">
                            {announcements?.map((an: any, index: number) => (
                                <span
                                    key={index}
                                    className="text-sm md:text-xl mx-4 text-[var(--text-color)]"
                                >
                                    {an.announcement}
                                </span>
                            ))}
                        </div>
                    </AnimateMarquee>
                </div>
            </div>
        )
    );
};

export default Announcement;
