export const saveToLocalStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }
};

export const getFromLocalStorage = (key: string): any => {
    if (typeof window === 'undefined') return null;
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn(`Error parsing localStorage key "${key}":`, error);
        return null;
    }
};

export const removeFromLocalStorage = (key: string): any => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('Failed to remove from localStorage:', error);
        }
    }
};

export const clearLocalStorage = (): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.clear();
        } catch (error) {
            console.warn('Unable to clear localStorage:', error);
        }
    }
};
