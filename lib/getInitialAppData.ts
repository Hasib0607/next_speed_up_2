import { AppDataOptions, TaskConfig } from '@/types/appData';
import getDomain from '@/helpers/getDomain';
import getBanner from '@/utils/fetcher/getBanner';
import getBrands from '@/utils/fetcher/getBrands';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getLayout from '@/utils/fetcher/getLayout';
import getMenu from '@/utils/fetcher/getMenu';
import getPage from '@/utils/fetcher/getPage';
import getSlider from '@/utils/fetcher/getSlider';
import getStore from '@/utils/fetcher/getStore';
import getProducts from '@/utils/fetcher/getProducts';
import getFeatureProducts from '@/utils/fetcher/getFeatureProducts';
import getBestSellProducts from '@/utils/fetcher/getBestSellProducts';
import getCategorys from '@/utils/fetcher/getCategorys';
import getTestimonial from '@/utils/fetcher/getTestimonial';
import { cookies, headers } from 'next/headers';

export async function getInitialAppData(
    options?: AppDataOptions,
    params?: Promise<any>
) {
    const domain = await getDomain();
    const tasks: Promise<any>[] = [];
    const keys: string[] = [];

    const taskConfig: Record<string, TaskConfig> = {
        appStore: { type: 'domain', fetcher: getStore },
        design: { type: 'domain', fetcher: getDesign },
        headersetting: { type: 'domain', fetcher: getHeaderSetting },
        layout: { type: 'domain', fetcher: getLayout },
        slider: { type: 'domain', fetcher: getSlider },
        products: { type: 'domain', fetcher: getProducts },
        featureProduct: { type: 'domain', fetcher: getFeatureProducts },
        bestSellProducts: { type: 'domain', fetcher: getBestSellProducts },
        banner: { type: 'domain', fetcher: getBanner },
        menu: { type: 'domain', fetcher: getMenu },
        page: { type: 'domain', fetcher: getPage },
        brands: { type: 'domain', fetcher: getBrands },
        category: { type: 'domain', fetcher: getCategorys },
        testimonials: { type: 'domain', fetcher: getTestimonial },
        paramsResult: {
            type: 'custom',
            fetcher: () => getParamsResult(params),
        }, // Special case with different params
        headersList: {
            type: 'custom',
            fetcher: () => headers(),
        }, // Special case with different params
        cookieStore: {
            type: 'custom',
            fetcher: () => cookies(),
        }, // Special case with different params
    };

    for (const [key, config] of Object.entries(taskConfig)) {
        if (options?.[key as keyof typeof options]) {
            tasks.push(
                config.type === 'domain'
                    ? config.fetcher(domain)
                    : config.fetcher()
            );
            keys.push(key);
        }
    }

    // if (options?.appStore) {
    //     tasks.push(getStore(domain));
    //     keys.push('appStore');
    // }

    // if (options?.design) {
    //     tasks.push(getDesign(domain));
    //     keys.push('design');
    // }

    // if (options?.headersetting) {
    //     tasks.push(getHeaderSetting(domain));
    //     keys.push('headersetting');
    // }

    // if (options?.layout) {
    //     tasks.push(getLayout(domain));
    //     keys.push('layout');
    // }

    // if (options?.slider) {
    //     tasks.push(getSlider(domain));
    //     keys.push('slider');
    // }

    // if (options?.products) {
    //     tasks.push(getProducts(domain));
    //     keys.push('products');
    // }

    // if (options?.featureProduct) {
    //     tasks.push(getFeatureProducts(domain));
    //     keys.push('featureProduct');
    // }

    // if (options?.bestSellProducts) {
    //     tasks.push(getBestSellProducts(domain));
    //     keys.push('bestSellProducts');
    // }

    // if (options?.banner) {
    //     tasks.push(getBanner(domain));
    //     keys.push('banner');
    // }

    // if (options?.menu) {
    //     tasks.push(getMenu(domain));
    //     keys.push('menu');
    // }

    // if (options?.page) {
    //     tasks.push(getPage(domain));
    //     keys.push('page');
    // }

    // if (options?.brands) {
    //     tasks.push(getBrands(domain));
    //     keys.push('brands');
    // }

    // if (options?.category) {
    //     tasks.push(getCategorys(domain));
    //     keys.push('category');
    // }

    // if (options?.testimonials) {
    //     tasks.push(getTestimonial(domain));
    //     keys.push('testimonials');
    // }

    // if (options?.paramsResult) {
    //     tasks.push(getParamsResult(params));
    //     keys.push('paramsResult');
    // }

    const results = await Promise.all(tasks);

    const data: Record<string, any> = {};

    results.forEach((res, idx) => {
        data[keys[idx]] = res;
    });

    const appData = data as {
        paramsResult?: Awaited<ReturnType<typeof getParamsResult>>;
        headersList?: Awaited<ReturnType<typeof headers>>;
        cookieStore?: Awaited<ReturnType<typeof cookies>>;
        appStore?: Awaited<ReturnType<typeof getStore>>;
        design?: Awaited<ReturnType<typeof getDesign>>;
        headersetting?: Awaited<ReturnType<typeof getHeaderSetting>>;
        products?: Awaited<ReturnType<typeof getProducts>>;
        featureProduct?: Awaited<ReturnType<typeof getFeatureProducts>>;
        bestSellProducts?: Awaited<ReturnType<typeof getBestSellProducts>>;
        layout?: Awaited<ReturnType<typeof getLayout>>;
        slider?: Awaited<ReturnType<typeof getSlider>>;
        banner?: Awaited<ReturnType<typeof getBanner>>;
        menu?: Awaited<ReturnType<typeof getMenu>>;
        page?: Awaited<ReturnType<typeof getPage>>;
        brands?: Awaited<ReturnType<typeof getBrands>>;
        category?: Awaited<ReturnType<typeof getCategorys>>;
        testimonials?: Awaited<ReturnType<typeof getTestimonial>>;
    };

    return { ...appData, domain };
}

// extract params as paramsResult
async function getParamsResult(params?: Promise<any>) {
    return await params;
}
