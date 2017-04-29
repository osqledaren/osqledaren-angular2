import {Rendition} from "./rendition.interface";
import {Byline} from "./byline.interface";
export interface Article {
    body_html: string,
    byline: Array<Byline>,
    categoriesById: Array<any>,
    copyrightholder: string,
    copyrightnotice: string,
    cred: string,
    description_text: string,
    headline: string,
    id: number,
    related_posts: Array<any>,
    renditions?: {[id: string]: Rendition},
    representationtype: string,
    slug: string,
    type: string,
    uri: string,
    urgency: number,
    versioncreated: string
}