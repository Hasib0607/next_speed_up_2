import { notFound } from 'next/navigation';
import getStore from './getStore';

export default async function getAnnouncement() {
    const store = await getStore();
    const store_id = store?.id || null;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-announcement/${store_id}`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            notFound();
        }

        // Clone the response if needed elsewhere
        const clonedResponse = response.clone();
        const clonedResponseData = await clonedResponse.json();

        // const resData = await response.json();
        const announcementDetails = clonedResponseData?.data;

        return announcementDetails;
    } catch (error) {
        console.error('Fetch get-announcement data error:', error);
        return null;
    }
}
