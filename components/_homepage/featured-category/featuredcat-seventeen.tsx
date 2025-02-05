import img2 from '@/components/_homepage/featured-category/seventeen-bg-img/border.webp';
import img1 from '@/components/_homepage/featured-category/seventeen-bg-img/icon_wrapper_bg_1.webp';
import image from '@/components/_homepage/featured-category/seventeen-bg-img/show_divider_1_104x62.webp';
import SectionHeadingSeventeen from '@/components/section-heading/section-heading-seventeen';
import { catImg, iconImg } from '@/site-settings/siteUrl';
import Image from 'next/image';
import Link from 'next/link';
import {
    ParallaxBanner,
    ParallaxBannerLayer,
    ParallaxProvider,
} from 'react-scroll-parallax';
import './featuredcat-seventeen.css';

const FeaturedSeventeen = ({ category, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } = featureCategory || {};
    const cat = category.filter((item: any) => item?.cat !== null);

    return (
        <div className="">
            <div className="relative z-0 md:max-h-[500px] overflow-hidden">
                {/* yet to implement */}
                <ParallaxProvider>
                    <ParallaxBanner className="aspect-[2/1] bg-[#ff7380] w-full">
                        <ParallaxBannerLayer
                            image={img1.src}
                            speed={-50}
                            style={{
                                backgroundSize: 'auto',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'repeat-x',
                            }}
                        />
                    </ParallaxBanner>
                </ParallaxProvider>

                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[1] grid grid-cols-3 justify-between items-center sm:container px-5 xl:px-80 mx-auto">
                    {category?.slice(0, 3)?.map((cat: any) => (
                        <Link key={cat?.id} href={`/category/${cat.id}`}>
                            <div className="hover:-translate-y-6 duration-500 h-full w-full justify-self-center">
                                <div
                                    className={`relative max-h-[200px] w-max mx-auto`}
                                >
                                    <Image
                                        src={img2.src}
                                        alt=""
                                        fill
                                        className="h-20 md:h-auto"
                                    />
                                    <img
                                        src={iconImg + cat?.icon}
                                        alt=""
                                        className="md:max-h-[50px] h-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                    />
                                </div>
                                <p className="text-center md:mt-5 mt-2 text-xl xl:text-3xl text-white text-style">
                                    {cat?.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="catSeventeenBottomBackGroundImage absolute -bottom-1 z-10"></div>
            </div>

            <div className="styleSeventeenbackgroundImage">
                <div className="flex justify-center pt-10">
                    <SectionHeadingSeventeen
                        text={title}
                        title_color={title_color}
                    />
                </div>
                <div className="flex justify-center pt-2">
                    <div
                        style={{
                            position: 'relative',
                            width: '120px',
                            height: '80px',
                        }}
                    >
                        <Image
                            src={image.src}
                            fill
                            alt="Description of the image"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg2:grid-cols-4 gap-y-10 md:gap-x-10 mt-14 z-10 sm:container px-5 xl:px-80 mx-auto pb-10 xl:pb-32">
                    {cat?.slice(0, 4)?.map((item: any) => (
                        <div key={item?.id}>
                            <Link href={`/category/${item?.id}`}>
                                <div>
                                    <img
                                        src={catImg + item?.banner}
                                        alt=""
                                        className="h-auto min-w-full hover:scale-105 duration-500"
                                    />
                                    <p className="text-center mt-6 text-style text-xl lg:text-3xl">
                                        {item?.name}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedSeventeen;
