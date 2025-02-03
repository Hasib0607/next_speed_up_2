/**
 * Default tags used by the cacher helpers
 */
const defaultTags = ['UNAUTHORIZED', 'UNKNOWN_ERROR', 'Category'] as const;

/**
 * Utility helpers for common provides/invalidates scenarios
 */
export const cacher = {
    defaultTags,
};
