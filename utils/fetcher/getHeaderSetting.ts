import getDomain from '@/helpers/getDomain';
import { notFound } from 'next/navigation';

export default async function getHeaderSetting() {
    const name = await getDomain();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}header-settings/${name}/info`,
        {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({ name: name }),
            next: {
                revalidate: 10,
            },
        }
    );

    if (!res.ok) {
        // throw new Error('Failed to fetch data!');
        notFound();
    }

    const resData = await res.json();
    const headersetting = resData?.data;

    return headersetting;
}
