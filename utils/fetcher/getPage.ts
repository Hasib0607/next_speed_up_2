import { notFound } from 'next/navigation';

export default async function getPage(name: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-domain/${name}/page`,
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
        // const clonedResponse = response.clone();
        // const clonedResponseData = await clonedResponse.json();

        const resData = await response.json();
        const pageDetails = resData?.data;

        return pageDetails;
    } catch (error) {
        console.error('Fetch get-page data error:', error);
        return null;
    }
}
