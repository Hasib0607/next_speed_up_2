export const getQueryString = (
    activeColor: any,
    priceValue: any,
    sort: any
) => {
    let queryString = '';
    const encodedColor = encodeURIComponent(activeColor);
    if (activeColor) {
        queryString += `&colorFilter=${encodedColor}`;
    }
    if (priceValue) {
        queryString += `&priceFilter=${priceValue}`;
    }
    if (sort) {
        queryString += `&filter=${sort}`;
    }
    // Remove the leading `&` if it exists
    // queryString = queryString.startsWith('&')
    //     ? queryString.substring(1)
    //     : queryString;

    return queryString;
};
