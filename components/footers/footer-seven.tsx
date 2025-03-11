import Link from 'next/link';
import {
    AiFillLinkedin,
    AiOutlineInstagram,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { BsFacebook, BsYoutube } from 'react-icons/bs';
import Newsletter from './components/newsletter';
import WhatsApp from './components/whatsApp';
import { customizeFooter } from '@/utils/customizeDesign';
import AllPaymantGateway from './components/all-payment-gateway';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FooterSeven = ({
    headersetting,
    menu,
    page,
    design
}: any) => {
    const date = new Date().getFullYear();
    const result = page.filter(
        (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
    );

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const {store} = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const footerData = customizeFooter.find((item) => item.id == store_id);

    const styleCss = `

    .footer-seven-menu .active {
        color:  ${design?.header_color};
        font-weight: 700;
    }
    `;

    return (
<<<<<<< HEAD
        <div>
          <style>{styleCss}</style>
          <div className="container px-5 mt-10">
            <Newsletter headersetting={headersetting} store_id={store_id} />
            <div className="grid lg:grid-cols-4 grid-cols-2 py-6 lg2:flex justify-between lg:gap-0 gap-5 pb-14">
              <div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-lg font-semibold">Social</h1>
                  <div className="flex flex-col gap-3 text-gray-500 text-sm ">
                    {headersetting?.facebook_link && (
                      <a
                        href={headersetting?.facebook_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsFacebook className="text-xl menu-hover lg:cursor-pointer inline mr-2" />
                        <span className="menu-hover">Facebook</span>
                      </a>
                    )}
                    {headersetting?.youtube_link && (
                      <a
                        href={headersetting?.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsYoutube className=" text-xl menu-hover lg:cursor-pointer inline mr-2" />
                        <span className="menu-hover">Youtube</span>
                      </a>
                    )}
                    {headersetting?.instagram_link && (
                      <a
                        href={headersetting?.instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiOutlineInstagram className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                        <span className="menu-hover">Instagram</span>
                      </a>
                    )}
                    {headersetting?.lined_in_link && (
                      <a
                        href={headersetting?.lined_in_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillLinkedin className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                        <span className="menu-hover">LinkedIn</span>
                      </a>
                    )}
                    {headersetting?.whatsapp_phone && (
                      <a
                        href={
                          "https://api.whatsapp.com/send?phone=" +
                          headersetting?.whatsapp_phone
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiOutlineWhatsApp className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                        <span className="menu-hover">WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-lg font-semibold">Contact</h1>
                </div>
                <div className="flex flex-col gap-3 text-gray-500 text-sm ">
                  <a href={"mailto:" + headersetting?.email}>
                    <p className="menu-hover">{headersetting?.email}</p>
                  </a>
                  <a href={"tel:+88" + headersetting?.phone}>
                    <p className="menu-hover">
                      {footerData?.support ? footerData?.support : "Call Us:"}{" "}
                      {headersetting?.phone}
                    </p>
                    {footerData?.help_line && (
                      <p className="menu-hover ">{footerData?.help_line}</p>
                    )}
                  </a>
                  <p className="menu-hover">Address: {headersetting?.address}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-lg font-semibold">Pages</h1>
                </div>
                <div className="flex flex-col gap-3 text-gray-500 text-sm footer-seven-menu">
                  {menu?.map((m: any) =>
                    m?.name !== "Category" ? (
                      <p key={m?.id}>
                        <Link href={m?.custom_link || (m?.url ? `/${m?.url}` : "/")} className="menu-hover">
                          {" "}
                          {m?.name}
                        </Link>
                      </p>
                    ) : null
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-lg font-semibold">Legal</h1>
                </div>
                <div className="flex flex-col gap-3 text-gray-500 text-sm footer-seven-menu">
                  {result?.map((m: any) => (
                    <p key={m?.id}>
                      <Link href={"/" + m?.link} className="menu-hover">
                        {" "}
                        {m?.name}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-lg font-semibold">Top Category</h1>
                </div>
                <div className="flex flex-col gap-3 text-gray-500">
                  {category?.slice(0, 6).map((item: any) => (
                    <div key={item.id} className="">
                      <li className="list-none text-sm menu-hover">
                        <Link href={"/category/" + item?.id}>
                          <h1>{item.name}</h1>
                        </Link>
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="sm:container px-5 mt-8">
            <AllPaymantGateway headersetting={headersetting} />
          </div>
          <hr />
          <p className="container px-5 py-5 text-sm text-gray-600 ">
            © {date} All Rights Reserved{" "}
            <Link href="/" className="font-semibold text-red-700 menu-hover">
              {headersetting?.website_name}
            </Link>{" "}
            | Developed by{" "}
            <a href="https://ebitans.com/" target="_blank">
              <span className="font-semibold text-red-700">eBitans </span>
            </a>
          </p>
          {/* <Messenger /> */}
          <WhatsApp />
        </div>
      );
=======
            <div>
                <style>{styleCss}</style>
                <div className="container px-5 mt-10">
                    <Newsletter
                        headersetting={headersetting}
                        store_id={store_id}
                    />
                    <div className="grid lg:grid-cols-4 grid-cols-2 py-6 lg2:flex justify-between lg:gap-0 gap-5 pb-14">
                        <div>
                            <div className="flex flex-col gap-4">
                                <h1 className="text-lg font-semibold">
                                    Social
                                </h1>
                                <div className="flex flex-col gap-3 text-gray-500 text-sm ">
                                    {headersetting?.facebook_link && (
                                        <a
                                            href={headersetting?.facebook_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <BsFacebook className="text-xl menu-hover lg:cursor-pointer inline mr-2" />
                                            <span className="menu-hover">
                                                Facebook
                                            </span>
                                        </a>
                                    )}
                                    {headersetting?.youtube_link && (
                                        <a
                                            href={headersetting?.youtube_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <BsYoutube className=" text-xl menu-hover lg:cursor-pointer inline mr-2" />
                                            <span className="menu-hover">
                                                Youtube
                                            </span>
                                        </a>
                                    )}
                                    {headersetting?.instagram_link && (
                                        <a
                                            href={headersetting?.instagram_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <AiOutlineInstagram className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                                            <span className="menu-hover">
                                                Instagram
                                            </span>
                                        </a>
                                    )}
                                    {headersetting?.lined_in_link && (
                                        <a
                                            href={headersetting?.lined_in_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <AiFillLinkedin className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                                            <span className="menu-hover">
                                                LinkedIn
                                            </span>
                                        </a>
                                    )}
                                    {headersetting?.whatsapp_phone && (
                                        <a
                                            href={
                                                'https://api.whatsapp.com/send?phone=' +
                                                headersetting?.whatsapp_phone
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <AiOutlineWhatsApp className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                                            <span className="menu-hover">
                                                WhatsApp
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-lg font-semibold">
                                    Contact
                                </h1>
                            </div>
                            <div className="flex flex-col gap-3 text-gray-500 text-sm ">
                                <a href={'mailto:' + headersetting?.email}>
                                    <p className="menu-hover">
                                        {headersetting?.email}
                                    </p>
                                </a>
                                <a href={'tel:+88' + headersetting?.phone}>
                                    <p className="menu-hover">
                                        {footerData?.support
                                            ? footerData?.support
                                            : 'Call Us:'}{' '}
                                        {headersetting?.phone}
                                    </p>
                                    {footerData?.help_line && (
                                        <p className="menu-hover ">
                                            {footerData?.help_line}
                                        </p>
                                    )}
                                </a>
                                <p className="menu-hover">
                                    Address: {headersetting?.address}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-lg font-semibold">Pages</h1>
                            </div>
                            <div className="flex flex-col gap-3 text-gray-500 text-sm footer-seven-menu">
                                {menu?.length > 0 &&
                                    menu?.map((m: any) =>
                                        m?.name !== 'Category' ? (
                                            <p key={m?.id}>
                                                <Link
                                                    href={'/' + m?.url}
                                                    className="menu-hover"
                                                >
                                                    {' '}
                                                    {m?.name}
                                                </Link>
                                            </p>
                                        ) : null
                                    )}
                                {result?.map((m: any) => (
                                    <p key={m?.id}>
                                        <Link
                                            href={'/' + m?.link}
                                            className="menu-hover"
                                        >
                                            {' '}
                                            {m?.name}
                                        </Link>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-lg font-semibold">
                                    Top Category
                                </h1>
                            </div>
                            <div className="flex flex-col gap-3 text-gray-500">
                                {category?.slice(0, 6).map((item: any) => (
                                    <div key={item.id} className="">
                                        <li className="list-none text-sm menu-hover">
                                            <Link
                                                href={'/category/' + item?.id}
                                            >
                                                <h1>{item.name}</h1>
                                            </Link>
                                        </li>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="container px-5 py-5 text-sm text-gray-600 space-x-2">
                    <span>© {date} All Rights Received</span>
                    <Link
                        href="/"
                        className="font-semibold text-red-700 menu-hover"
                    >
                        {headersetting?.website_name}
                    </Link>
                    <span>| Developed by</span>
                    <Link
                        href="https://ebitans.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-700 menu-hover"
                    >
                        eBitans
                    </Link>
                </p>
                {/* <Messenger /> */}
                <WhatsApp headersetting={headersetting} />
            </div>
    );
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
};

export default FooterSeven;
