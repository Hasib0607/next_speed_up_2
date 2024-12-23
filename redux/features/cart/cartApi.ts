import { apiSlice } from '../api/apiSlice';

// Inject the getHome mutation endpoint into apiSlice
export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({}),
    overrideExisting: false, // Optional: prevents overwriting if already defined
});

export const {} = cartApi;
