import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { z } from 'zod';

export const generateDynamicSchema = (fields: any[]) => {
    const schemaObject: Record<string, z.ZodTypeAny> = {};

    fields?.forEach((field) => {
        const { name } = field;

        const capitalName = capitalizeFirstLetter(name);

        const type = typeof name;
        // Base validation rules
        let validation: z.ZodTypeAny = z.string();

        // Customize validation based on field type
        if (type === 'number') {
            validation = z
                .number({
                    invalid_type_error: `${capitalName} must be a number`,
                })
                .int(); // Ensure integer numbers if required;
        } else if (type === 'string') {
            validation = z.string();
        } else {
            validation = z.any(); // Fallback for unsupported types
        }

        // Add required validation
        if (name === 'name' || name === 'address') {
            if (type === 'string') {
                validation = (validation as z.ZodString).min(1, {
                    message: `${capitalName} is required`,
                });
            }
        }

        if (name === 'district') {
            validation = z.any();
            // .refine(
            //     (val) => val !== "",
            //     {
            //         message: `${capitalName} is required`,
            //     }
            // );
        }

        // Add field-specific validations (e.g., phone regex)
        if (name === 'phone') {
            validation = z.string().optional();
        }
        // Add field-specific validations (e.g., email regex)
        if (name === 'email') {
            validation = z.string().optional();
        }
        // if (store?.auth_type === 'EasyOrder' && !isAuthenticated && !userPhone){
        // }

        // Assign to the schema object
        schemaObject[name] = validation;
    });

    // Return the Zod schema object
    const schema = z.object(schemaObject);

    // Add conditional validation for phone and email
    return schema.superRefine((data, ctx) => {
        const isPhoneEmpty = !data.phone?.trim();
        const isEmailEmpty = !data.email?.trim();

        if (isPhoneEmpty && isEmailEmpty) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Either Phone or Email must be provided',
                path: ['phone'], // Error for the phone field
            });

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Either Phone or Email must be provided',
                path: ['email'], // Error for the email field
            });
        }
    });
};

export const showfieldByKey = (fieldName: string, fields: any[]) => {
    return fields?.some((item: any) => item?.name == fieldName);
};

export const showfieldStatus = (fieldName: string, fields: any[]) => {
    return fields?.some((item: any) => item?.name == fieldName ? item.status == 1 : false);
};