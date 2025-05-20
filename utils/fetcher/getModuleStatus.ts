export default async function getModuleStatus(
    store_id: number,
    module_id: number
) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}get-module/${store_id}/${module_id}`,
            {
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            console.error('Failed to fetch module id data!');
        }

        // Clone the response if needed elsewhere
        // const clonedResponse = response.clone();
        // const clonedResponseData = await clonedResponse.json();

        const resData = await response.json();
        const moduleIdDetails = resData?.status;

        return moduleIdDetails;
    } catch (error) {
        console.error('Fetch module id data error:', error);
        return null;
    }
}
