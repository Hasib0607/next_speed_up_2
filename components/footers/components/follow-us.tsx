import React from 'react';
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaWhatsappSquare,
    FaYoutubeSquare,
} from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import Link from 'next/link';

const FollowUs = ({ cls, headersetting, design }: any) => {
    const bgColor = design?.header_color;

    return (
        <>
            {headersetting?.facebook_link && (
                <Link
                    href={`${headersetting?.facebook_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaFacebookSquare
                        style={{ color: bgColor }}
                        className={cls}
                    />
                </Link>
            )}
            {headersetting?.youtube_link && (
                <Link
                    href={`${headersetting?.youtube_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaYoutubeSquare
                        style={{ color: bgColor }}
                        className={cls}
                    />
                </Link>
            )}
            {headersetting?.instagram_link && (
                <Link
                    href={`${headersetting?.instagram_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaInstagramSquare
                        style={{ color: bgColor }}
                        className={cls}
                    />
                </Link>
            )}
            {headersetting?.whatsapp_phone && (
                <Link
                    href={`https://api.whatsapp.com/send?phone=${headersetting?.whatsapp_phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsappSquare
                        style={{ color: bgColor }}
                        className={cls}
                    />
                </Link>
            )}
            {headersetting?.lined_in_link && (
                <Link
                    href={`${headersetting?.lined_in_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillLinkedin
                        style={{ color: bgColor }}
                        className={cls}
                    />
                </Link>
            )}
        </>
    );
};

export default FollowUs;
