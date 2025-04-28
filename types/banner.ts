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