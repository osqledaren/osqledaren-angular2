import {ContentService} from "../content/abstract.content.service";
import {Injectable} from "@angular/core";
import {Broadcast} from "./broadcast.enum";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {isNullOrUndefined} from "util";
import {Episode} from "./episode.interface";
import {Series} from "./series.interface";
import {EpisodeRendition} from "./media-rendition.interface";
import {BroadcastQueryParams} from "./broadcast-query-params.interface";
@Injectable()
export abstract class MediaContentService extends ContentService {
    protected type: Broadcast;
    protected episodeEndpoint: string;
    protected seriesEndpoint: string;
    protected episodebatchCount: number = 12;
    protected episodeOffset: number = 0;
    protected seriesbatchCount: number = 12;
    protected seriesOffset: number = 0;

    constructor(type: Broadcast, http: Http, endpoint: string){
        super(http, endpoint);
        let filter = '?filter[meta_query][0][key]=episode_type&filter[meta_query][0][value]=' + Broadcast[type];
        this.episodeEndpoint = this.endpoint + '/podcast' + filter;
        this.seriesEndpoint = this.endpoint + '/series' + filter;
    }

    public getEpisodeBatchCount(){
        return this.episodebatchCount;
    }

    public getSeriesBatchCount(){
        return this.seriesbatchCount;
    }

    public getEpisodes(filters?: BroadcastQueryParams): Observable<Episode[]> {
        this.episodeOffset = 0;
        return this.getNextBatchOfEpisodes(filters);
    }

    public getNextBatchOfEpisodes(filters?: BroadcastQueryParams) {
        //let timeQuery = !isNullOrUndefined(lastPostDate) ? '&before=' + lastPostDate : '';
        let query: string;

        query = this.episodeEndpoint + '&_embed&order=desc';
        query += '&per_page=' + this.episodebatchCount + '&offset=' + this.episodeOffset * this.episodebatchCount;

        try {
            if (!isNullOrUndefined(filters.series)) query += '&filter[series]=' + filters.series;
        } catch (e) {
        }

        this.episodeOffset++;

        return this.http.get(query)
            .map((res: Response) => res.json())
            .map((podcasts: Array<any>) => this.parseEpisodes(podcasts));
    }

    public getEpisodesOfSeries(series: string): Observable<Episode[]> {

        let filters: BroadcastQueryParams = <BroadcastQueryParams>{
            series: series
        };

        return this.getEpisodes(filters);
    }

    private parseSeriesMeta(p){

        let meta = null;

        try {
            meta = <Series>{
                id: p.pure_taxonomies.series[0].term_id,
                name: p.pure_taxonomies.series[0].name,
                slug: p.pure_taxonomies.series[0].slug,
                description: p.pure_taxonomies.series[0].description,
                episodes_count: p.pure_taxonomies.series[0].count
            }
        }
        catch (e){}

        return meta
    }

    private parseMediaMeta(p){

        let meta = null;

        try {
            meta = <EpisodeRendition>{
                url: p.meta.audio_file,
                duration: p.meta.duration,
                filesize: p.meta.filesize,
                date_recorded: p.meta.date_recorded
            }
        } catch (e) {}

        return meta
    }

    private parseEpisodes(episodes) {
        let results: Array<Episode> = [];

        try {
            episodes.forEach((p) => {

                let episode: Episode = <Episode>{
                    id: p.id,
                    versioncreated: p.date,
                    content: p.content.rendered,
                    excerpt: ContentService.htmlToPlainText(p.excerpt.rendered),
                    byline: this.parseByline(p),
                    renditions: this.parseRenditions(p),
                    episode_number: p.acf.avsnittsnummer,
                    media: this.parseMediaMeta(p),
                    series: this.parseSeriesMeta(p),
                    headline: p.title.rendered,
                };

                results.push(episode);
            });
        } catch (e) {
            this.handleError(e);
        }

        return results;
    }

    public search(searchTerm: string) {

        let filters: BroadcastQueryParams = <BroadcastQueryParams>{
            search: searchTerm
        };

        this.getEpisodes(filters);
    }

    public getSeries() {
        this.seriesOffset = 0;
        return this.getNextBatchOfEpisodes();
    }

    public getNextBatchOfSeries() {

        let query = this.seriesEndpoint + '&_embed&order=desc';
        query += '&per_page=' + this.seriesbatchCount + '&offset=' + this.seriesOffset * this.seriesbatchCount;

        this.seriesOffset++;

        return this.http
            .get(query)
            .map((res: Response) => res.json())
            .map((res: Array<any>) => this.parseSeries(res));
    }

    private parseSeries(series) {
        let result: Array<Series> = [];
        try {
            series.forEach((p) => {
                let seriesData: Series = {
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    episodes_count: p.count
                };
                result.push(seriesData);
            });
        } catch (e) {
            this.handleError(e);
        }
        return result;
    }
}