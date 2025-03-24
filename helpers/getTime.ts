const formatDate = (date:any) => {
    return date.toLocaleString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).replace(',', '');
};

const now = new Date();
export const formattedDateTime = () => formatDate(now);
