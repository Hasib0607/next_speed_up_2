type LangObj = { [key: string]: any };

const langArr: LangObj[] = [
    {
        name: 'নাম',
    },
    {
        phone: 'ফোন',
    },
    {
        address: 'ঠিকানা',
    },
    {
        district: 'জেলা',
    }
];

export const getValueByKey = (key:string): string => {
    const foundObj = langArr.find(obj => key in obj);
    return foundObj ? foundObj[key] : key; // Return the value if found, otherwise return null
}