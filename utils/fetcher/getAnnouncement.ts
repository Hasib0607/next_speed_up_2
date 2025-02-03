import { redirect } from 'next/navigation';
import getStore from './getStore';

export default async function getAnnouncement() {
    const store = await getStore();
    const store_id = store?.id || null;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-announcement/${store_id}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    const resData = await res.json();
    const announcementDetails = resData?.data;

    if (!res.ok) {
        // throw new Error('Failed to fetch data!');
        redirect('/not-found')
    }

    return announcementDetails;
}
