import {Response, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import {Injectable} from "@angular/core";
import {Rendition} from "./rendition.interface";
import {Byline} from "./byline.interface";

@Injectable()
export abstract class ContentService{

    protected endpoint;
    protected http;

    constructor(http: Http, endpoint: string, ){
        this.endpoint = endpoint;
        this.http = http;
    }

    /**
     * Strips html from text.
     * @param text: string
     * @returns {string}
     */
    public static htmlToPlainText(text: string): string {
        return text ? (text).replace(/<[^>]+>/gm, '').replace('[&hellip;]', '') : '';
    }

    protected parseByline(post){

        let byline = null;

        try {
            let author: Array<string>;
            let bylineAuthors = post.acf.cred.match(/[^\r\n]+/g);

            for (let j in bylineAuthors) {
                author = bylineAuthors[j].split("="); // Split name and role at separator, in this case the "=" character.

                author[0] = author[0].trim(); // Remove leading and trailing whitespaces.
                author[1] = author[1].trim(); // Remove leading and trailing whitespaces.

                // If successful convert raw strings into byline element.
                if (author[0] !== "" && author[1] !== "") {
                    byline.push(<Byline>{
                        role: author[0],
                        author: author[1]
                    });
                }
            }

        } catch (Exception) {}

        return byline;
    }

    protected parseRenditions(post){

        let renditions = null, media, sizes;

        try {
            renditions = <Rendition>{};
            media = post._embedded['wp:featuredmedia'];
            sizes = media[0].media_details.sizes;

            for (let j in sizes) {
                renditions[j] = <Rendition>{
                    title: media[0].title.rendered,
                    href: sizes[j].source_url,
                    mime_type: sizes[j].mime_type,
                    height: sizes[j].height,
                    width: sizes[j].width
                };
            }
        } catch (Exception) {}

        return renditions;
    }

    protected handleError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            let body = error.json() || '';
            let err = body.error || JSON.stringify(body);
            errMsg = error.status + ' ' + error.statusText + ' ' + err;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(error);
    }
}