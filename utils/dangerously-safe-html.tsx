
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface DangerouslySafeHTMLProps {
  content: string;
}

const DangerouslySafeHTML: React.FC<DangerouslySafeHTMLProps> = ({ content }) => {
  const sanitizedContent = useMemo(() => ({
    __html: DOMPurify.sanitize(content)
  }), [content]);

  return <div dangerouslySetInnerHTML={sanitizedContent} className="apiHtml" />;
}

export default DangerouslySafeHTML;

