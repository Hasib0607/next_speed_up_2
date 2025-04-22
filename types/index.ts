// define types
export type AuthType = 'phone' | 'EasyOrder' | 'email' | 'EmailEasyOrder';
export type RequiredItems = 'isPhoneRequired' | 'isEmailRequired';
export type OrderRequireTypes = Record<RequiredItems, boolean>;

export type VercelGeo = {
    city?: string;
    country?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
};

export type FormValues = {
    name: string;
    phone_code: string;
    code: string;
    phone: number;
    email: string;
    address: string;
    note: string;
    district: string;
    language: string;
    error: string;
};

export type ParamsAnyProps = {
    params: Promise<any>;
};

export interface UpdateData {
    product_id: string;
    store_id: number;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    [key: string]: any; // Allows additional optional properties
}

export interface CategoryProducts {
    [key: string]: any;
}

export interface MobileNavProps {
    design: any;
}

export interface Banner {
    id: number;
    image: string;
    link?: string;
    status: string;
    uid: string;
    customer_id: string;
    store_id: string;
    type: number;
    creator: string;
    editor: string;
    created_at: string;
    updated_at: string;
}

export interface BannerProps {
    banner: Banner[];
}


export type ProductDetailsParamProps = {
    params: Promise<{ productId: any }>;
};