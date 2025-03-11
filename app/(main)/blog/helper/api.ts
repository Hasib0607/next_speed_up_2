import { notFound } from 'next/navigation';

// Blog sitemap
export const fetchBlogSitemapData = async (store_id: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/site-map/${store_id}`,
            {
                next: { revalidate: 10 },
            }
        );
        const data = await response.json();

        return data?.data?.data;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};

// recent blog data
export const fetchBlogRecentData = async (store_id: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/recent/${store_id}`,
            {
                next: { revalidate: 10 },
            }
        );
        const data = await response.json();

        return data?.data?.data?.data;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};
// popular blog data
export const fetchBlogPopularData = async (store_id: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/popular/${store_id}`,
            {
                next: { revalidate: 10 },
            }
        );
        const data = await response.json();

        return data?.data?.data?.data;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};
// blog type data
export const fetchBlogTypeData = async (store_id: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/get-types/${store_id}`,
            {
                next: { revalidate: 10 },
            }
        );
        const data = await response.json();

        return data?.data?.data;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};
// typewise blog data
export const fetchTypeWiseBlogData = async (blogTypeId: any, page: any) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/types/${blogTypeId}?page=${page}`,
            { next: { revalidate: 10 } }
        );
        const data = await response.json();

        return data?.data;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};

// single blog data
export const fetchBlogDetailsData = async (slug: any, url: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/details/${slug}?name=${url}`,
            {
                next: { revalidate: 10 },
            }
        );

        if (!response.ok) {
            notFound();
        }

        const resData = await response.json();
        const blogDetails = resData?.data?.data;

        return blogDetails;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};

// all blog
export const fetchAllBlogData = async (store_id: any, page?: any) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_BLOG}/blog/get/${store_id}?page=${page}`,
            {
                next: { revalidate: 10 },
            }
        );
        const resData = await response.json();

        const allBlogData = resData?.data;
        return allBlogData;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};
// Blog api end

// Product khujo api start

export const fetchIp = async () => {
    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/client-ip`
        );
        const data = await response.json();
        return data.ipString;
    } catch (error) {
        console.error('There was an error fetching the data', error);
    }
};

export const visitorData = async (item: any, ip: any) => {
    if (item) {
        const data = {
            store_id: item?.store_id,
            pse_id: item?.id,
            product_id: item?.product_id,
            ip: ip,
            domain: item?.store_url,
        };
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(
                `https://admin.ebitans.com/api/v1/pse/products/visitor`,
                requestOptions
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error; // rethrow the error to the caller
        }
    }
    return null;
};

// Product khujo api end
