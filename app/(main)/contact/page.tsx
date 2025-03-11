import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import { GMAP_IFRAME_SRC_LINK } from '@/consts';
import Link from 'next/link';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa';

const ContactPage = async () => {
    const bangla = false;
    const headersetting = await getHeaderSetting();

    const {
        facebook_link,
        phone,
        email,
        address,
        instagram_link,
        youtube_link,
        lined_in_link,
        map_address,
    }: any = headersetting || {};

    const srcMatch = map_address?.match(GMAP_IFRAME_SRC_LINK);
    const iframeSrc = srcMatch ? srcMatch[1] : null;

    return (
        <div>
            <hr className="lg:mt-5" />
            <section className="lg:px-20 bg-emerald-50">
                <div className="container px-6 py-12 mx-auto">
                    <div>
                        <p className="font-medium text-blue-500 text-3xl dark:text-blue-400">
                            𝙲𝚘𝚗𝚝𝚊𝚌𝚝 𝚞𝚜
                        </p>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            {bangla
                                ? 'আমাদের বন্ধুত্বপূর্ণ দল আপনার সাথে কথা বলতে ভালোবাসবে।'
                                : 'Our friendly team would love to hear from you.'}
                        </p>
                        <hr className="w-[20%]" />
                        <div className="flex divide-x space-x-4">
                            <Link
                                href={facebook_link}
                                aria-label={
                                    bangla
                                        ? 'Facebook দিয়ে লগইন করুন'
                                        : 'Log in with Facebook'
                                }
                                className="p-3 rounded-sm"
                            >
                                <FaFacebookF className="w-5 h-5 fill-current" />
                            </Link>
                            <Link
                                href={youtube_link}
                                aria-label={
                                    bangla
                                        ? 'YouTube দিয়ে লগইন করুন'
                                        : 'Log in with YouTube'
                                }
                                className="p-3 rounded-sm"
                            >
                                <FaYoutube className="w-5 h-5 fill-current" />
                            </Link>
                            <Link
                                href={instagram_link}
                                aria-label={
                                    bangla
                                        ? 'Instagram দিয়ে লগইন করুন'
                                        : 'Log in with Instagram'
                                }
                                className="p-3 rounded-sm"
                            >
                                <FaInstagram className="w-5 h-5 fill-current" />
                            </Link>
                            <Link
                                href={lined_in_link}
                                aria-label={
                                    bangla
                                        ? 'LinkedIn দিয়ে লগইন করুন'
                                        : 'Log in with LinkedIn'
                                }
                                className="p-3 rounded-sm"
                            >
                                <FaLinkedinIn className="w-5 h-5 fill-current" />
                            </Link>
                        </div>
                        <hr className="w-[20%]" />
                    </div>

                    <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="flex divide-x-2">
                                <div className="mr-2">
                                    <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                    </span>
                                    <h2 className="mt-4 text-base font-medium text-gray-800">
                                        {bangla ? 'ইমেইল' : 'Email'}
                                    </h2>

                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                        {email}
                                    </p>
                                </div>

                                <div className="pl-2">
                                    <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>
                                    </span>
                                    <h2 className="mt-4 text-base font-medium text-gray-800">
                                        {bangla ? 'অফিস' : 'Office'}
                                    </h2>

                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                        {address}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                        />
                                    </svg>
                                </span>
                                <h2 className="mt-4 text-base font-medium text-gray-800">
                                    {bangla ? 'ফোন' : 'Phone'}
                                </h2>
                                {/* <p className="mt-2 text-sm text-gray-500">
                  {bangla
                    ? "শনিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত।"
                    : "Sat-Thus from 9am to 6pm."}
                </p> */}
                                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                                    {phone}
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
                            <iframe
                                src={iframeSrc}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="map"
                                className="border-none"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
