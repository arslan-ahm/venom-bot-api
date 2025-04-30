export type SendRequestBody = {
    to: string | string[];
    type: 'text' | 'file' | 'contact' | 'location';
    message?: string;
    file?: string;
    filename?: string;
    contact?: {
        name: string;
        phone: string;
    };
    location?: {
        latitude: string;
        longitude: string;
        description?: string;
    };
};