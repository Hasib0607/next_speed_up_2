import React from 'react';
import { DEFAULT } from '@/consts';
import { contact_pages } from '@/utils/dynamic-import/contactPages/contactPages';

const Contact = ({ design, headersetting }: any) => {
    const ContactComponent =
        contact_pages[design?.contact] || contact_pages[DEFAULT];

    return (
        design?.contact !== 'null' &&
        ContactComponent && <ContactComponent headersetting={headersetting} />
    );
};

export default Contact;
