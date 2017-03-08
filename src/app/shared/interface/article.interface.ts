export interface Article {
    body_html: string,
    byline: string,
    copyrightholder: string,
    copyrightnotice: string,
    description_text: string,
    headline: string,
    id: number,
    related_posts: string,
    renditions?: {[id: string] : Rendition},
    representationtype: string,
    slug: string,
    type: string,
    uri: string,
    urgency: number,
    versioncreated: string
}

export interface Rendition {
    height: number;
    width: number;
    href: string;
    mime_type: string;
    title: string;
}