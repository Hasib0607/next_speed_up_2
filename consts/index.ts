// numbers
export const DEFAULT = 'default';
export const ONE = 'one';
export const TWO = 'two';
export const THREE = 'three';
export const FOUR = 'four';
export const FIVE = 'five';
export const SIX = 'six';
export const SEVEN = 'seven';
export const EIGHT = 'eight';
export const NINE = 'nine';
export const TEN = 'ten';
export const ELEVEN = 'eleven';
export const TWELVE = 'twelve';
export const THIRTEEN = 'thirteen';
export const FOURTEEN = 'fourteen';
export const FIFTEEN = 'fifteen';
export const SIXTEEN = 'sixteen';
export const SEVENTEEN = 'seventeen';
export const EIGHTEEN = 'eighteen';
export const NINETEEN = 'nineteen';
export const TWENTY = 'twenty';
export const TWENTY_ONE = 'twentyone';
export const TWENTY_TWO = 'twentytwo';
export const TWENTY_THREE = 'twentythree';
export const TWENTY_FOUR = 'twentyfour';
export const TWENTY_FIVE = 'twentyfive';
export const TWENTY_SIX = 'twentysix';
export const TWENTY_SEVEN = 'twentyseven';
export const TWENTY_EIGHT = 'twentyeight';
export const TWENTY_NINE = 'twentynine';
export const THIRTY = 'thirty';
export const THIRTY_ONE = 'thirtyone';
export const THIRTY_TWO = 'thirty-two';
export const THIRTY_THREE = 'thirtythree';
export const THIRTY_FOUR = 'thirtyfour';
export const THIRTY_FIVE = 'thirtyfive';
export const THIRTY_SIX = 'thirtysix';
export const THIRTY_SEVEN = 'thirtyseven';
export const THIRTY_EIGHT = 'thirtyeight';
export const THIRTY_NINE = 'thirtynine';
export const FORTY = 'forty';
export const FORTY_ONE = 'fortyone';
export const FORTY_TWO = 'fortytwo';
export const FORTY_THREE = 'fortythree';
export const FORTY_FOUR = 'fortyfour';
export const FORTY_FIVE = 'fortyfive';
export const FORTY_SIX = 'fortysix';
export const FORTY_SEVEN = 'fortyseven';
export const FORTY_EIGHT = 'fortyeight';

// modules
export const ABANDAN_CART = 131
export const AFFILIATE_MARKETING = 120

// dynamic colors
export const HeaderColor = 'var(--header-color)';
export const TextColor = 'var(--text-color)';

// regex
export const HTML_TAG_PATTERN = /<[^>]*>/g;
export const IFRAME_SRC_PATTERN = /src="([^"]+)"/;

// export const PHONE_NUMBER_REGEX = /^(01\d{9}|8801\d{9}|\+8801\d{9})$/;
export const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// all persist localStorage key
export const REDUX_PERSIST = 'persist:root';
export const DB_CART_STATUS = 'dbcart:status'
export const ANALYTICS_PERSIST = 'analytics:data';
export const TRIGGER_E_TRACK = 'trigger:trackvisitor';
export const ANALYTICS_PREV_PERSIST = 'analytics-prev:data';
export const EXTRACT_HEADER_INFORMATION = 'headersettings:data'
export const EXTRACT_SHIPPING_INFORMATION = 'headersettings:shippingmethods'
export const FINGERPRINT_DATA_PERSIST = 'fingerprint-result:data';

// tracking deviation
export const TRACK_DEVIATION = 120 //  10 * 60 * 1000

// blog page
export const BLOG_PAGE_NUMBER = 1;

// host
export function url() {
    if (typeof window !== 'undefined') {
        return window.location.host.startsWith('www.')
            ? window.location.host.slice(4)
            : window.location.host;
    }
    return ''; // Optional: return an empty string if window is undefined (e.g., in server-side rendering)
}

let urlName;

// urlName = 'muazuddinfurniture.ebitans.store';
// urlName = "kc.design";
// urlName = "swifttrading.store";
// urlName = "lokmantraders.shop";
// urlName = "nayeil.com";
// urlName = "bikroyhutbd.com";
// urlName = "witnessclassic.com";
urlName = "moon.localhost:3000";

if (process.env.NODE_ENV === 'production') {
    urlName = url();
}

export const name = urlName;