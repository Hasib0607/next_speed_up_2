import { hexToRgba } from '@/helpers/littleSpicy';
import { imgUrl } from '@/site-settings/siteUrl';
import FacebookPixel from '@/utils/FacebookPixel';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getStore from '@/utils/fetcher/getStore';
import SetFavicon from '@/utils/useSetFavicon';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import AppWrapper from './AppWrapper';
import './globals.css';
// import CustomPageView from '@/utils/CustomPageView';

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
    const appStore = await getStore();
    const design = await getDesign();
    const headersetting = await getHeaderSetting();

    const favicon = imgUrl + headersetting?.favicon;

    const FACEBOOK_PIXEL_ID = headersetting?.facebook_pixel;
    const gtmId = headersetting?.gtm;
    const googleAnalytics = headersetting?.google_analytics;
    const googleSearchConsole = headersetting?.google_search_console;

    const headerColorRgb = hexToRgba(design?.header_color);
    const textColorRgb = hexToRgba(design?.text_color);

    // console.log("headerColorRgb",headerColorRgb);
    // console.log("FACEBOOK_PIXEL_ID",!FACEBOOK_PIXEL_ID);

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
                        '--header-color-rgb': headerColorRgb,
                        '--text-color': design?.text_color,
                        '--text-color-rgb': textColorRgb,
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

                <AppWrapper design={design} appStore={appStore}>
                    {children}
                </AppWrapper>
            </body>
        </html>
    );
}
