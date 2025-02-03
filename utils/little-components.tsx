import React, { useState } from 'react';

export const NotFoundMsg = ({ message, className }: any) => {
    return (
        <div className="center flex-1">
            <h3
                className={
                    className ? className : 'text-xl font-sans font-bold py-5'
                }
            >
                {message}
            </h3>
        </div>
    );
};

export const AlertPopups = () => {
    const [showFirstAlert, setShowFirstAlert] = useState(true); // First alert visibility
    const [showSecondAlert, setShowSecondAlert] = useState(false); // Second alert visibility

    const handleFirstAlert = (proceed: boolean) => {
        setShowFirstAlert(false);
        if (proceed) {
            setShowSecondAlert(true);
        }
    };

    const handleSecondAlert = () => {
        setShowSecondAlert(false);
        // Perform any other actions for the second alert
    };

    return (
        <div>
            {/* First Alert Popup */}
            {showFirstAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">
                            Your vendor does not have any SMS left!
                        </p>
                        <p className="mb-6">Do you want to continue?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleFirstAlert(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => handleFirstAlert(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Second Alert Popup */}
            {showSecondAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">
                            You cannot get SMS for order confirmation and also cannot receive login credentials!
                        </p>
                        <button
                            onClick={handleSecondAlert}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
