export type AppDataOptions = {
    paramsResult?: boolean;
    headersList?: boolean;
    cookieStore?: boolean;
    appStore?: boolean;
    design?: boolean;
    headersetting?: boolean;
    layout?: boolean;
    products?: boolean;
    featureProduct?: boolean;
    bestSellProducts?: boolean;
    slider?: boolean;
    banner?: boolean;
    menu?: boolean;
    page?: boolean;
    brands?: boolean;
    category?: boolean;
    subcategory?: boolean;
    testimonials?: boolean;
};

export type TaskConfig =
    // eslint-disable-next-line no-unused-vars
    | { type: 'domain'; fetcher: (domain: string) => Promise<any> }
    | { type: 'custom'; fetcher: () => Promise<any> };
