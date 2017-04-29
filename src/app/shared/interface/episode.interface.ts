import {Series} from "./series.interface";
import {Media} from "./media.interface";
import {Rendition} from "./rendition.interface";
import {Byline} from "./byline.interface";

export interface Episode {
    id: number,
    slug: string,
    content: string,
    excerpt: string,
    byline: Array<Byline>,
    renditions: {[id:string]: Rendition},
    episode_number: number | string,
    media: Media,
    series: Series,
    headline: string,
    versioncreated: string
}