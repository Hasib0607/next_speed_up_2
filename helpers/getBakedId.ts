export const makeUniqueid = (length: any) => {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export const generateEventId = () => {
    let firstSegment = '';
    let lastSegment = '';
    let moment = Date.now();
    let middleSegment = Math.floor(Math.random() * 100000);
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = 4;
    let length = 6;
    for (let i = 0; i < length; i++) {
        firstSegment += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    for (let i = 0; i < length; i++) {
        lastSegment += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    const generatedId = `${firstSegment}-${middleSegment}-${lastSegment}-${firstSegment}-${moment.toString().slice(6)}-${lastSegment}`;
    return generatedId.toLowerCase();
};
