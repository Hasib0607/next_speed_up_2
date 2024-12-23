import getDomain from '@/helpers/getDomain';

export default async function getStore() {
    const name = await getDomain();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}store/${name}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    const resData = await res.json();
    const storeDetails = resData?.data;

    if (!res.ok) {
        throw new Error('Failed to fetch data!');
    }

    return storeDetails;
}
