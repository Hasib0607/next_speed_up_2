export const saveToSessionStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('Failed to save to sessionStorage:', error);
        }
    }
};

export const getFromSessionStorage = (key: string): any => {
    if (typeof window === 'undefined') return null;
    try {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn(`Error parsing sessionStorage key "${key}":`, error);
        return null;
    }
};

export const removeFromSessionStorage = (key: string): any => {
    if (typeof window !== 'undefined') {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.warn(
                `Failed to remove from sessionStorage key "${key}":`,
                error
            );
        }
    }
};
