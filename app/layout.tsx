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
import { GoogleTagManager } from '@next/third-parties/google';
import NextTopLoader from 'nextjs-toploader';

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
    const googleSearchConsole = headersetting?.google_search_console;

    // console.log("headersetting",headersetting);

    // console.log("googleAnalytics",googleAnalytics);
    // console.log("googleSearchConsole",googleSearchConsole);
    // console.log("FACEBOOK_PIXEL_ID",FACEBOOK_PIXEL_ID);

    // Check if the current route is the homepage
    // const pathname = headersList.get('x-nextjs-route');
    // const isHomepage = pathname;

    return (
        <html lang="en">
            <head>
                {gtmId && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
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
                                gtag('config', '${gtmId}');
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
                <GoogleTagManager gtmId={gtmId} />

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

                {FACEBOOK_PIXEL_ID && (
                    <>
                        {/* Facebook Pixel Script */}
                        <Script
                            id="facebook-pixel"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${FACEBOOK_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `,
                            }}
                        />

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
                    </>
                )}
                <AppWrapper design={design} appStore={appStore}>
                    {children}
                </AppWrapper>
                {/* {fbPixel && (
                    <>
                        <Script id="facebook-pixel" strategy="afterInteractive">
                            {`
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', ${fbPixel});
                            `}
                        </Script>
                        <noscript>
                            <img
                                alt="pixel"
                                height="1"
                                width="1"
                                style={{ display: 'none' }}
                                src={`https://www.facebook.com/tr?id=${fbPixel}&ev=PageView&noscript=1`}
                            />
                        </noscript>
                    </>
                )} */}
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
