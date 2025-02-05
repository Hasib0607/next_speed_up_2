import getDomain from '@/helpers/getDomain';
import { notFound } from 'next/navigation';

export default async function getBanner() {
    const name = await getDomain();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-domain/${name}/banner`,
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
        const bannerDetails = clonedResponseData?.data;

        return bannerDetails;
    } catch (error) {
        console.error('Fetch get-banner data error:', error);
        return null;
    }
}
