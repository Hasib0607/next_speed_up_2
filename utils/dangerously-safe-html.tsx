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
        () => ({
            __html: DOMPurify.sanitize(content, {
                // ALLOWED_TAGS: ['ul', 'li'],
                // ALLOWED_ATTR: ['style'],
            }),
        }),
        [content]
    );

    return (
        <div
            dangerouslySetInnerHTML={sanitizedContent}
            className={classNames('apiHtml', className)}
        />
    );
};

export default DangerouslySafeHTML;
