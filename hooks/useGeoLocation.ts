import { useState } from 'react';

const useGeoLocation = () => {
    const [address, setAddress] = useState('');

    const fetchAddress = async (lat: string, lng: string) => {
        try {
            if (!lat || !lng) {
                return;
            }

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
            );

            const data = await response.json();
            setAddress(data.display_name || 'Address not available');
        } catch (error:any) {
            console.error('Error fetching address:', error);
        }
    };

    return { address, fetchAddress };
};

export default useGeoLocation;
