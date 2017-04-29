import {ContentService} from "./abstract.content.service";
import {Injectable} from "@angular/core";
import {MediaType} from "../enums";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {PodcastQueryParams} from "../interface/query-params.interface";
import {isNullOrUndefined} from "util";
import {Episode} from "../interface/episode.interface";
import {Series} from "../interface/series.interface";
import {Media} from "../interface/media.interface";
@Injectable()
export abstract class MediaContentService extends ContentService {
    protected type: MediaType;
    protected episodeEndpoint: string;
    protected seriesEndpoint: string;
    protected episodebatchCount: number = 5;
    protected episodeOffset: number = 0;
    protected seriesbatchCount: number = 5;
    protected seriesOffset: number = 0;

    constructor(type: MediaType, http: Http, endpoint: string){
        super(http, endpoint);
        let filter = '?filter[meta_query][0][key]=episode_type&filter[meta_query][0][value]=' + MediaType[type];
        this.episodeEndpoint = this.endpoint + '/podcast' + filter;
        this.seriesEndpoint = this.endpoint + '/series' + filter;
    }

    public getEpisodes(filters?: PodcastQueryParams): Observable<Episode[]> {
        this.episodeOffset = 0;
        return this.getNextBatchOfEpisodes(filters);
    }

    public getNextBatchOfEpisodes(filters?: PodcastQueryParams) {
        //let timeQuery = !isNullOrUndefined(lastPostDate) ? '&before=' + lastPostDate : '';
        let query: string;

        query = this.episodeEndpoint + '&_embed&order=desc';
        query += 'per_page=' + this.episodebatchCount + '&offset=' + this.episodeOffset * this.episodebatchCount;

        try {
            if (!isNullOrUndefined(filters.series)) query += '&filter[series]=' + filters.series;
        } catch (error) {
            this.handleError(error);
        }

        return this.http.get(query)
            .map((res: Response) => res.json())
            .map((podcasts: Array<any>) => this.parseEpisodes(podcasts));
    }

    public getEpisodesOfSeries(series: string): Observable<Episode[]> {

        let filters: PodcastQueryParams = <PodcastQueryParams>{
            series: series
        };

        return this.getEpisodes(filters);
    }

    private parseEpisodes(episodes) {
        let result: Array<Episode> = [];
        let media, sizes, renditions, byline;

        try {
            episodes.forEach((p) => {

                let renditions = this.parseRenditions(episodes);
                let byline = this.parseByline(episodes);
                let videoData: Media = <Media>{
                    url: p.meta.audio_file,
                    duration: p.meta.duration,
                    filesize: p.meta.filesize,
                    date_recorded: p.meta.date_recorded
                };

                let seriesData: Series = <Series>{
                    id: p.pure_taxonomies.series[0].term_id,
                    name: p.pure_taxonomies.series[0].name,
                    slug: p.pure_taxonomies.series[0].slug,
                    description: p.pure_taxonomies.series[0].description,
                    episodes_count: p.count
                };

                let episode: Episode = <Episode>{
                    id: p.id,
                    versioncreated: p.date,
                    content: p.content.rendered,
                    excerpt: p.excerpt.rendered,
                    byline: byline,
                    renditions: renditions,
                    episode_number: p.acf.avsnittsnummer,
                    media: videoData,
                    series: seriesData,
                    headline: p.title.rendered,
                };
            });
        } catch (e) {
            this.handleError(e);
        }

        return result;
    }

    private search(searchTerm: string) {

        let filters: PodcastQueryParams = <PodcastQueryParams>{
            search: searchTerm
        };

        this.getEpisodes(filters);
    }

    private getSeries() {
        this.episodeOffset = 0;
        return this.getNextBatchOfEpisodes();
    }

    private getNextBatchOfSeries() {

        let query = this.seriesEndpoint + '&_embed&order=desc';
        query += 'per_page=' + this.seriesbatchCount + '&offset=' + this.seriesOffset * this.seriesbatchCount;

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