export interface LinkPreview {
    uri: string;
    generated_at: Date;
    title?: string;
    description?: string;
    image_url?: string;
    site_name?: string;
    og_type?: string;
    locale?: string;
    published_at?: Date;
    author?: string;
    metadata?: Record<string, any>;
}

export type NewLinkPreview = Omit<LinkPreview, 'generated_at'>;
