'use client';
import Link from 'next/link';
import styles from '@/styles/contact.module.css';
import { numberParser } from '@/helpers/numberParser';
import { classNames } from '@/helpers/littleSpicy';
import { useState } from 'react';
import { FaComments, FaTimes, FaWhatsapp, FaPhone } from 'react-icons/fa';

const WhatsApp = ({ headersetting }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const { button_status, rtl_status, whatsapp_phone, phone } =
        headersetting || {};

    // Check if floating Msg on
    const floatingMsg = numberParser(button_status) === 1;

    const rtlStatus = numberParser(rtl_status) === 0;

    const toggleServices = () => {
        setIsOpen((prev) => !prev); // Toggle icons visibility
    };

    return (
        floatingMsg &&
        whatsapp_phone && ( // Render the icon only if whatsapp_phone is available
            <div
                className={classNames(
                    'fixed bottom-16 z-50',
                    rtlStatus ? 'left-12' : 'right-12'
                )}
            >
                <div id="sy-whatshelp">
                    {/* Floating service icons */}
                    <div
                        className={`${styles.services} ${isOpen ? styles.active : ''}`}
                    >
                        <Link
                            href={`https://api.whatsapp.com/send?phone=${whatsapp_phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.serviceItem} ${styles.whatsapp}`}
                            title="WhatsApp"
                        >
                            <FaWhatsapp />
                        </Link>
                        <a
                            href={`tel:${phone}`}
                            className={`${styles.serviceItem} ${styles.call}`}
                            title="Call"
                        >
                            <FaPhone />
                        </a>
                    </div>
                    {/* Floating button that toggles icons */}
                    <button
                        onClick={toggleServices}
                        className={`${styles.openServices} bg-[var(--header-color)] text-[var(--text-color)]`}
                        title="Contact Us"
                    >
                        {isOpen ? <FaTimes /> : <FaComments />}
                    </button>
                </div>
            </div>
        )
    );
};

export default WhatsApp;