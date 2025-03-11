'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { classNames } from '@/helpers/littleSpicy';

interface DangerouslySafeHTMLProps {
    content: string;
    className?: string;
}

const DangerouslySafeHTML: React.FC<DangerouslySafeHTMLProps> = ({
    content,
    className,
}) => {
    const sanitizedContent = useMemo(
        () =>
            DOMPurify.sanitize(content, {
                CUSTOM_ELEMENT_HANDLING: {
                    // tagNameCheck: /^img/, // allow all tags starting with "img"
                    // attributeNameCheck: /baz/, // allow all attributes containing "baz"
                    // allowCustomizedBuiltInElements: true, // customized built-ins are allowed
                },
            }),
        [content]
    );

    return (
        <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className={classNames('apiHtml', className)}
        />
    );
};

export default DangerouslySafeHTML;

// {
//     // ALLOWED_TAGS: ['ul', 'li'],
//     // ALLOWED_ATTR: ['style'],
// }
