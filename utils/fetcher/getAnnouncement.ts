import { notFound } from 'next/navigation';

export default async function getAnnouncement(store_id: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-announcement/${store_id}`,
            {
                next: {
                    revalidate: 10,
                },
            }
        );

        if (!response.ok) {
            notFound();
        }

        // Clone the response if needed elsewhere
        // const clonedResponse = response.clone();
        // const clonedResponseData = await clonedResponse.json();

        const resData = await response.json();
        const announcementDetails = resData?.data;

        return announcementDetails;
    } catch (error) {
        console.error('Fetch get-announcement data error:', error);
        return null;
    }
}
