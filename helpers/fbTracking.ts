export const PageView = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const Purchase = (value: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", { value });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const AddToCart = (item: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", { item });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const Checkout = ( price: any, sku: any, currency: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Checkout", { price, sku, currency });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};

export const ViewContent = (
  content_ids: any,
  content_type: any,
  content_name: any,
  content_category: any,
  value: any,
  currency: any,
  sku: any
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_ids,
      content_type,
      content_name,
      content_category,
      value,
      currency,
      sku,
    });
  } else {
    console.warn("Facebook Pixel (fbq) is not initialized.");
  }
};
