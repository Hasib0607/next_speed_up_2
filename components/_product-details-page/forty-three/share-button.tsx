import { useEffect, useState } from 'react';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
    FaCopy,
    FaEnvelope,
} from 'react-icons/fa';

const ShareButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const currentUrl =
        typeof window !== 'undefined' ? window.location.href : '';

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            document.documentElement.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: <FaFacebook className="text-xl" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
            color: 'bg-[#3b5998] hover:bg-[#2d4373]',
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="text-xl" />,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
            color: 'bg-[#1da1f2] hover:bg-[#1991db]',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="text-xl" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
            color: 'bg-[#0077b5] hover:bg-[#00669c]',
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp className="text-xl" />,
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
            color: 'bg-[#25d366] hover:bg-[#20bd5a]',
        },
        {
            name: 'Email',
            icon: <FaEnvelope className="text-xl" />,
            url: `mailto:?body=${encodeURIComponent(currentUrl)}`,
            color: 'bg-gray-600 hover:bg-gray-700',
        },
    ];

    return (
        <div className="relative">
            <button
                className="px-4 py-2 rounded-md transition-colors font-bold"
                onClick={() => setIsModalOpen(true)}
            >
                Share
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-4">
                            Share this page
                        </h3>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={currentUrl}
                                readOnly
                                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className={`px-3 py-2 rounded-md transition-colors inline-flex items-center gap-2 ${
                                    isCopied
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-gray-600 hover:bg-gray-700'
                                } text-white`}
                                onClick={handleCopy}
                            >
                                <FaCopy /> {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${social.color} text-white rounded-md p-3 flex flex-col items-center justify-center gap-1 transition-colors`}
                                >
                                    {social.icon}
                                    <span className="text-xs">
                                        {social.name}
                                    </span>
                                </a>
                            ))}
                        </div>

                        <button
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareButton;
