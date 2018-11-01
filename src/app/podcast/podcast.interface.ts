import {Rendition} from '../content/rendition.interface';
import {Byline} from '../content/byline.interface';

export interface Podcast {
  body_html: any,
  byline: Array<Byline>,
  categoriesById: Array<any>,
  copyrightholder: string,
  copyrightnotice: string,
  description_text: string,
  headline: string,
  id: number,
  related_posts: Array<any>,
  renditions?: { [id: string]: Rendition },
  representationtype: string,
  slug: string,
  type: string,
  uri: string,
  urgency: number,
  versioncreated: string,
  audio_file: string,
}
