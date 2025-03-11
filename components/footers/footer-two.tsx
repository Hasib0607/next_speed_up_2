import React from 'react';
import Newsletter from './components/newsletter';
import Link from 'next/link';
import WhatsApp from './components/whatsApp';
import AllPaymantGateway from './components/all-payment-gateway';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FooterTwo = ({ menu, headersetting }: any) => {
    const date = new Date().getFullYear();

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const styleCss = `
  .footer-page .active{
      color:#f1593a;
      font-weight: 700;
     }
  `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <Newsletter headersetting={headersetting} store_id={store_id} />
            <div>
                <div className="flex flex-wrap md:space-x-5 space-x-3 justify-center">
                    {menu?.map((item: any) => (
                        <div key={item.id} className="footer-page">
                            <Link
                                href={item?.custom_link || (item?.url ? `/${item?.url}` : "/")}
                                className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="sm:container px-5 mt-8">
                    <AllPaymantGateway headersetting={headersetting} />
                </div>
                <p className="text-center pt-5 lg:pb-5 pb-20">
<<<<<<< HEAD
                    © {date} All Rights Reserved{' '}
=======
                    <span>© {date} All Rights Received </span>
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                    <Link
                        href="/"
                        className="font-semibold text-red-700 menu-hover"
                    >
                        {headersetting?.website_name}
                    </Link>{' '}
<<<<<<< HEAD
                    | Developed by{' '}
                    <a href="https://ebitans.com/" target="_blank">
                        <span className="font-semibold text-red-700">
                            eBitans{' '}
                        </span>
                    </a>
=======
                    <span>| Developed by </span>
                    <Link
                        href="https://ebitans.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-700 menu-hover"
                    >
                        eBitans
                    </Link>
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                </p>
            </div>

            {/* <Messenger /> */}
            <WhatsApp />
        </div>
    );
};

export default FooterTwo;
