
export const numberParser = (digit: any): number => {
    const parsed = parseFloat(digit);
    return isNaN(parsed) ? 0 : parseFloat(parsed.toFixed(2));
};
