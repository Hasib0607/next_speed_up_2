export const getQueryString = (filtersData: any) => {
    let queryString = '';

    if (filtersData) {
        const {
            color: activeColor,
            price: priceValue,
            activeBrands,
            sort,
        } = filtersData || {};

        const activeBrandIdList = activeBrands
            ?.map((item: any) => item.id)
            .join(',');

        if (activeColor || priceValue || sort || activeBrandIdList) {
            queryString = setQueryString(
                activeColor,
                priceValue,
                activeBrandIdList,
                sort
            );
        }
    }
    return queryString;
};

export const setQueryString = (
    activeColor: any,
    priceValue: any,
    activeBrandIdList: any,
    sort: any
) => {
    let queryString = '';

    const encodedColor = encodeURIComponent(activeColor);

    if (activeBrandIdList && activeBrandIdList != '') {
        queryString += `&brand=${activeBrandIdList}`;
    }
    if (activeColor && activeColor != '') {
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
