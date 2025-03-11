import { imgUrl } from '@/site-settings/siteUrl';
import Link from 'next/link';
import {
    AiFillLinkedin,
    AiFillYoutube,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { RiInstagramLine } from 'react-icons/ri';
import Newsletter from './components/newsletter';
import WhatsApp from './components/whatsApp';
import AllPaymantGateway from './components/all-payment-gateway';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const FooterThree = ({ headersetting, menu, page }: any) => {
    const date = new Date().getFullYear();

    const result = page.filter(
        (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
    );

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const {store} = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    return (
        <div className="mx-auto sm:container px-5 sm:pt-10 pt-5 pb-20 lg:pb-8 ">
          <Newsletter headersetting={headersetting} store_id={store_id} />
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 lg:justify-items-start justify-items-center">
            <div className="flex flex-col col-span-2 md:col-span-1 justify-center">
              <div className="text-center">
                <img
                  src={imgUrl + headersetting?.logo}
                  alt=""
                  className="h-12 mx-auto"
                />
              </div>
              <p className="text-sm leading-none text-gray-800 mt-4 text-center">
                © {date} All Rights Reserved{" "}
                <Link href="/" className="font-semibold text-red-700 menu-hover">
                  {headersetting?.website_name}
                </Link>
              </p>
              <p className="text-sm leading-none text-gray-800 mt-4 text-center">
                Developed by{" "}
                <a href="https://ebitans.com/" target="_blank">
                  <span className="font-semibold text-red-700">eBitans </span>
                </a>
              </p>
              <div className="flex items-center gap-x-4 mt-3 mb-5">
                <div className="flex gap-x-4 ">
                  {headersetting?.facebook_link && (
                    <div className="border-2 rounded-full p-2">
                      <a
                        href={`${headersetting?.facebook_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <FaFacebookF className="text-2xl footerColor  " />
                      </a>
                    </div>
                  )}
                  {headersetting?.youtube_link && (
                    <div className="border-2 rounded-full p-2">
                      <a
                        href={`${headersetting?.youtube_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <AiFillYoutube className="text-2xl footerColor" />
                      </a>
                    </div>
                  )}
                  {headersetting?.instagram_link && (
                    <div className="border-2 rounded-full p-2">
                      <a
                        href={`${headersetting?.instagram_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <RiInstagramLine className="text-2xl footerColor" />
                      </a>
                    </div>
                  )}
                  {headersetting?.whatsapp_phone && (
                    <div className="border-2 rounded-full p-2">
                      <a
                        href={
                          "https://api.whatsapp.com/send?phone=" +
                          headersetting?.whatsapp_phone
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <AiOutlineWhatsApp className="text-2xl footerColor" />
                      </a>
                    </div>
                  )}
                  {headersetting?.lined_in_link && (
                    <div className="border-2 rounded-full p-2">
                      <a
                        href={headersetting?.instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <AiFillLinkedin className="text-2xl footerColor" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:justify-self-center">
              <h2 className="text-base font-semibold leading-4 text-gray-800">
                Menu
              </h2>
              {menu?.map((item: any) => (
                <p
                  key={item.id}
                  className="menu-hover text-base leading-4 mt-6 text-gray-800 lg:cursor-pointer"
                >
                  <Link href={item?.custom_link || (item?.url ? `/${item?.url}` : "/")}>{item.name}</Link>
                </p>
              ))}
            </div>
            <div className="md:justify-self-center">
              <h2 className="text-base font-semibold leading-4 text-gray-800">
                Legal
              </h2>
              {result?.map((item: any) => (
                <p
                  key={item.id}
                  className="menu-hover text-base leading-4 mt-6 text-gray-800 lg:cursor-pointer"
                >
                  <Link href={"/" + item.url}>{item.name}</Link>
                </p>
              ))}
            </div>
            <div className="md:justify-self-end">
              <h2 className="text-base font-semibold leading-4 text-gray-800">
                Categories
              </h2>
              {category?.slice(0, 6).map((item: any) => (
                <p
                  key={item.id}
                  className="menu-hover text-base leading-4 mt-6 text-gray-800 lg:cursor-pointer"
                >
                  <Link href={"/category/" + item.id}>{item.name}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="sm:container px-5 mt-8">
            <AllPaymantGateway headersetting={headersetting} />
          </div>
          {/* <Messenger /> */}
          <WhatsApp />
        </div>
      );
};

export default FooterThree;
