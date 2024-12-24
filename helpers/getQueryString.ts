export const getQueryString = (
    filtersData: any,
) => {
    let queryString = '';
    if (filtersData) {
        const {
            color: activeColor,
            price: priceValue,
            sort,
        } = filtersData || {};
        if (activeColor || priceValue || sort) {
            queryString = setQueryString(
                activeColor,
                priceValue,
                sort
            );
        }
    }
    return queryString;
};

export const setQueryString = (
    activeColor: any,
    priceValue: any,
    sort: any
) => {
    let queryString = '';
    const encodedColor = encodeURIComponent(activeColor);
    if (activeColor) {
        queryString += `&colorFilter=${encodedColor}`;
    }
    if (priceValue && priceValue != '0') {
        queryString += `&priceFilter=${priceValue}`;
    }
    if (sort && sort != 'null') {
        queryString += `&filter=${sort}`;
    }
    // Remove the leading `&` if it exists
    // queryString = queryString.startsWith('&')
    //     ? queryString.substring(1)
    //     : queryString;

    return queryString;
};
