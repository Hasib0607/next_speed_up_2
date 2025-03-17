import React from 'react';

const DefaultBrand = ({ design, headersetting, brands }: any) => {
    // console.log("brands",brands);

    return brands?.map((item:any) => <div className="center"key={item.id}>DefaultBrand {item.name}</div>)
};

export default DefaultBrand;
