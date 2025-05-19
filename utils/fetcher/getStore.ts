import { notFound } from 'next/navigation';

export default async function getStore(name: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/${name}/info`,
            {
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            notFound();
        }

        // Clone the response if needed elsewhere
        // const clonedResponse = response.clone();
        // const clonedResponseData = await clonedResponse.json();

        const resData = await response.json();
        const storeDetails = resData?.status ? resData?.data : null;

        return storeDetails;
    } catch (error) {
        return null;
    }
}
