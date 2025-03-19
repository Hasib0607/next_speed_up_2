export const sendConversionApiEvent = async (
    eventName: string,
    customData: any
) => {
    const eventBody = {
        event_name: eventName,
        ...customData,
    };

    // Send data to Facebook Conversion API
    try {
        await fetch('/api/meta-conversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventBody),
        });
    } catch (error) {
        console.error('Error sending server events to Facebook:', error);
    }
};
