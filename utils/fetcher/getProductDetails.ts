import { notFound } from 'next/navigation';

export default async function getProductDetails(
    store_id: string,
    product_id: string
) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}product-details/${store_id}/${product_id}`,
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
        const productDetails = resData?.data;

        return productDetails;
    } catch (error) {
        console.error('Fetch get-product-details data error:', error);
        return null;
    }
}
