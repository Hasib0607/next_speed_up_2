// define types
export type ParamsAnyProps = {
    params: Promise<any>;
};

export interface UpdateData {
    product_id: string;
    store_id: number;
    slug: string;
  }