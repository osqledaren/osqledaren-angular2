import {Series} from "./series.interface";
import {EpisodeRendition} from "./media-rendition.interface";
import {Rendition} from "../shared/interface/rendition.interface";
import {Byline} from "../shared/interface/byline.interface";

export interface Episode {
    id: number,
    slug: string,
    content: string,
    excerpt: string,
    byline: Array<Byline>,
    renditions: {[id:string]: Rendition},
    episode_number: number | string,
    media: EpisodeRendition,
    series: Series,
    headline: string,
    versioncreated: string
}