import getDomain from "@/helpers/getDomain";
import { redirect } from "next/navigation";

export default async function getHeaderSetting() {
    const name = await getDomain();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}header-settings/${name}`,
        {
            next: {
                revalidate: 10,
            },
        }
    );
    const resData = await res.json();
    const headersetting = resData?.data;

    if (!res.ok) {
        // throw new Error('Failed to fetch data!');
        redirect('/not-found')
    }

    return headersetting;
}
