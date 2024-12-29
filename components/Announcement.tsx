import { useGetAnnouncementQuery } from '@/redux/features/home/homeApi';
import Marquee from 'react-fast-marquee';

const Announcement = ({ design,store_id }: any) => {

    const { data: announcementsData, isSuccess: announcementsSuccess } =
        useGetAnnouncementQuery({ store_id });

    const announcements = announcementsData?.data || [];

    return (
        <>
            {announcementsSuccess &&
                (announcements || announcements?.length != 0) && (
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
