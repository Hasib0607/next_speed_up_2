import React from 'react';
import Newsletter from './components/newsletter';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import FollowUs from './components/follow-us';
import MenuList from './components/menu-list';
import CategoryList from './components/category-list';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';
import PageList from './components/page-list';
import AllPaymantGateway from './components/all-payment-gateway';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FooterNineteen = ({
    headersetting,
    design,
    page,
    menu,
}: any) => {
    const cls = 'text-2xl';

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const {store} = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    return (
        <>
          <div className="bg-[#f2efe4] pt-10">
            <div className="sm:container px-5">
              <Newsletter headersetting={headersetting} store_id={store_id} />
              <div className="py-10">
                <div className="grid grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-2 gap-y-10">
                  <div className="col-span-2 xl:col-span-4 lg:col-span-2 md:col-span-2">
                    {headersetting?.logo === null ? (
                      <Link href="/">
                        <p className="text-xl uppercase">
                          {headersetting?.website_name}
                        </p>
                      </Link>
                    ) : (
                      <Link href="/">
                        <img
                          className="h-10"
                          src={imgUrl + headersetting?.logo}
                          alt="logo"
                        />
                      </Link>
                    )}
                    <p className="mt-6">TEL:+ {headersetting?.phone}</p>
                    <p> Email: {headersetting?.email}</p>
                    <div className="flex gap-x-3 mt-4">
                      <FollowUs
                        cls={cls}
                        headersetting={headersetting}
                        design={design}
                      />
                    </div>
                  </div>
    
                  <div className="flex flex-col gap-y-2">
                    <MenuList menu={menu} />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <PageList page={page} />
                  </div>
    
                  <div className="flex flex-col gap-y-2">
                    <CategoryList category={category} />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:container px-5 mt-8">
              <AllPaymantGateway headersetting={headersetting} />
            </div>
          </div>
          <div className="border mb-16 lg:mb-0">
            <div className="sm:container px-5">
              <div className="py-2">
                <CopyrightAll headersetting={headersetting} />
              </div>
            </div>
          </div>
          <WhatsApp />
          {/* <Messenger /> */}
        </>
      );
};

export default FooterNineteen;
