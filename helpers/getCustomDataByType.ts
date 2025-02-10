type CustomDataType = {
    id: number;
    title: string;
    title_color: string;
    subtitle: string;
    subtitle_color: string;
    button: string;
    button_color: string;
    button_bg_color: string;
    button1: string;
    button1_color: string;
    button1_bg_color: string;
    image_description: string | null;
    is_buy_now_cart?: string | number;
    is_buy_now_cart1?: string | number;
    type: string;
};

// Function to get data by type
export const getDataByType = (data: any, type: string): CustomDataType => {
    return data?.custom_design?.[type]?.[0] || {}; // Return the first object or an empty object
};

// export const getDataByType = (data: any, type: string): CustomDataType | null => {
//     switch (type) {
//         case "product":
//             return data.custom_design.product[0] || {};
//         case "feature_product":
//             return data.custom_design.feature_product[0] || {};
//         case "best_sell_product":
//             return data.custom_design.best_sell_product[0] || {};
//         case "new_arrival":
//             return data.custom_design.new_arrival[0] || {};
//         case "slider":
//             return data.custom_design.slider[0] || {};
//         case "single_product_page":
//             return data.custom_design.single_product_page[0] || {};
//         default:
//             return null; // Return null if type is not found
//     }
// };