import getDomain from '@/helpers/getDomain';
import { notFound } from 'next/navigation';

export default async function getStore() {
    const name = await getDomain();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/${name}/info`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            notFound();
        }

        //   Clone the response if needed elsewhere
        const clonedResponse = response.clone();
        const clonedResponseData = await clonedResponse.json();

        // const resData = await response.json();
        const storeDetails = clonedResponseData?.status
            ? clonedResponseData?.data
            : null;

        return storeDetails;
    } catch (error) {
        return null;
    }
}
