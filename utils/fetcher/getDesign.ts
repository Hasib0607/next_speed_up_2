import { notFound } from 'next/navigation';

export default async function getDesign(name: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-domain/${name}/design`,
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
        const designDetails = resData?.data;

        return designDetails;
    } catch (error) {
        console.error('Fetch get-design data error:', error);
        return null;
    }
}
