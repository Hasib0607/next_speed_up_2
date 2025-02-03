'use client';

import Marquee from 'react-fast-marquee';
import { useEffect, useState } from 'react';
import { useGetAnnouncementQuery } from '@/redux/features/home/homeApi';

// import useAnnouncementScroll from '@/utils/use-annoucement-height';

const Announcement = ({ design, store_id }: any) => {
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
        <>
            {store_id && design && announcements?.length > 0 && (
                <div
                    id="annoucement"
                    style={{ background: design?.header_color }}
                >
                    <div className="relative flex overflow-x-hidden container">
                        <Marquee speed={50} pauseOnHover={true}>
                            <div className="py-2  whitespace-nowrap">
                                {announcements?.map(
                                    (an: any, index: number) => (
                                        <span
                                            style={{
                                                color: design?.text_color,
                                            }}
                                            key={index}
                                            className="text-[9px] md:text-xl mx-4"
                                        >
                                            {an.announcement}
                                        </span>
                                    )
                                )}
                            </div>
                        </Marquee>
                    </div>
                </div>
            )}
        </>
    );
};

export default Announcement;
