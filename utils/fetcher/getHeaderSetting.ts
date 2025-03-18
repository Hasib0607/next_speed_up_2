import getDomain from '@/helpers/getDomain';

export default async function getHeaderSetting() {
    const name = await getDomain();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}header-settings/${name}/info`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.warn("⚠️ Header setting data not found (404).");
                return null; // Return null instead of crashing
            }
            throw new Error(`Failed to fetch header setting: ${response.statusText}`);
        }

        // Clone the response if needed elsewhere
        const clonedResponse = response.clone();
        const clonedResponseData = await clonedResponse.json();

        // const resData = await response.json();
        const headersettingDetails = clonedResponseData?.data;

        return headersettingDetails;
    } catch (error) {
        console.error('Fetch get-headersetting data error:', error);
        return null;
    }
}
