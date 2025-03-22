import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import getDesign from '@/utils/fetcher/getDesign';
// import { headers } from 'next/headers';
// import { GetServerSideProps } from 'next';
import AppWrapper from './AppWrapper';
import getStore from '@/utils/fetcher/getStore';
import Script from 'next/script';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import { imgUrl } from '@/site-settings/siteUrl';
import SetFavicon from '@/utils/useSetFavicon';
import NextTopLoader from 'nextjs-toploader';

import { GoogleTagManager } from '@next/third-parties/google';
import FacebookPixel from '@/utils/FacebookPixel';
import CustomPageView from '@/utils/CustomPageView';
import { cookies, headers } from 'next/headers';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export async function generateMetadata(): Promise<Metadata> {
    const headersetting = await getHeaderSetting();
    const title = headersetting?.website_name;
    const description = headersetting?.short_description;
    const keywords = 'eBitans, eCommerce builder platform';
    return {
        title: `${title}`,
        description: description,
        icons: { icon: imgUrl + headersetting?.favicon },
        keywords: keywords,
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const headersList = await headers();
    const appStore = await getStore();
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const favicon = imgUrl + headersetting?.favicon;

    const FACEBOOK_PIXEL_ID = headersetting?.facebook_pixel;
    const gtmId = headersetting?.gtm;
    const googleAnalytics = headersetting?.google_analytics;
    const googleSearchConsole = headersetting?.google_search_console;

    // console.log("headersetting",headersetting);

    // Get current URL and referrer
//   const headersList = await headers()
//   const referer = headersList.get('referer') || ''
//   const currentUrl = headersList.get('x-url') || headersList.get('x-forwarded-host') || ''
  
//   // Store the current URL as the previous URL for the next page
//   const cookieStore = await cookies()
//   cookieStore.set('previousUrl', currentUrl, { path: '/' })

    // console.log("googleAnalytics",googleAnalytics);
    // console.log("googleSearchConsole",googleSearchConsole);
    // console.log("headersetting",headersetting);

    // Check if the current route is the homepage
    // const pathname = headersList.get('x-nextjs-route');
    // const isHomepage = pathname;

    return (
        <html lang="en">
            <head>
                {googleAnalytics && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
                            strategy="afterInteractive"
                        />
                        <Script
                            id="google-analytics"
                            strategy="afterInteractive"
                        >
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${googleAnalytics}');
                            `}
                        </Script>
                    </>
                )}
                {googleSearchConsole && (
                    <meta
                        name="google-site-verification"
                        content={googleSearchConsole}
                    />
                )}

                {FACEBOOK_PIXEL_ID && (
                    <FacebookPixel pixelId={FACEBOOK_PIXEL_ID} />
                )}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                style={
                    {
                        '--header-color': design?.header_color,
                        '--text-color': design?.text_color,
                    } as React.CSSProperties
                }
            >
                <SetFavicon faviconUrl={favicon} />

                {gtmId && (
                    <>
                        <GoogleTagManager gtmId={gtmId} />
                        <noscript>
                            <iframe
                                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                                height="0"
                                width="0"
                                style={{
                                    display: 'none',
                                    visibility: 'hidden',
                                }}
                            />
                        </noscript>
                    </>
                )}

                {/* NoScript Fallback for Users with Disabled JavaScript */}
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                        alt="Facebook Pixel"
                    />
                </noscript>

                <NextTopLoader
                    color={'#29D'}
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={2}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                />

                <CustomPageView />

                <AppWrapper design={design} appStore={appStore}>
                    {children}
                </AppWrapper>
            </body>
        </html>
    );
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     const currentUrl = req.url; // Get the full URL

//     return {
//         props: {
//             currentUrl,
//         },
//     };
// };
