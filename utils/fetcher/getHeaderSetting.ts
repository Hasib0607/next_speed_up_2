export default async function getHeaderSetting(name: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}header-settings/${name}/info`,
            {
                next: {
                    revalidate: 10,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.warn('⚠️ Header setting data not found (404).');
                return null; // Return null instead of crashing
            }
            throw new Error(
                `Failed to fetch header setting: ${response.statusText}`
            );
        }
        // if (!response.ok) {
        //     notFound();
        // }

        // Clone the response if needed elsewhere
        // const clonedResponse = response.clone();
        // const clonedResponseData = await clonedResponse.json();

        const resData = await response.json();
        const headersettingDetails = resData?.data;

        return headersettingDetails;
    } catch (error) {
        console.error('Fetch get-headersetting data error:', error);
        return null;
    }
}
