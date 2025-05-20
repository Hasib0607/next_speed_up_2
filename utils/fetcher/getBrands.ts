export default async function getBrands(name: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-domain/${name}/brand`,
            {
                next: { revalidate: 60 }, // Revalidates every 10 seconds
            }
        );

        if (!response.ok) {
            console.warn('No brand found!');
        }

        // Clone the response if needed elsewhere
        // const clonedResponse = response.clone();
        // const clonedResponseData = await clonedResponse.json();

        const resData = await response.json();
        const brandDetails = resData?.data;

        return brandDetails;
    } catch (error) {
        console.error('Fetch get-brand data error:', error);
        return null;
    }
}
