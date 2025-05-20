type ComponentType =
    | 'header'
    | 'hero_slider'
    | 'feature_category'
    | 'banner'
    | 'banner_bottom'
    | 'product'
    | 'new_arrival'
    | 'best_sell_product'
    | 'feature_product'
    | 'testimonial'
    | 'youtube'
    | 'blog'
    | 'brand'
    | 'footer';

export type RenderSectionProps = {
    sections: ComponentType;
}
