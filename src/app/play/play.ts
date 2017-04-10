import { Series } from './series';

interface Author {
    id: number;
    name: string;
    link: string;
}

interface Video {
    url: string;
    duration: string;
    filesize: string;
    date_recorded: string;
}

export interface Podcast{
    id: number;
    date: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    imageURL: string;
    episode_number: number | string;
    audio: Video;
    author: Author;
    series: Series;
}

export class Podcast implements Podcast{
    constructor(
        public id: number,
        public date: string,
        public slug: string,
        public title: string,
        public content: string,
        public excerpt: string,
        public imageURL: string,
        public episode_number: number | string,
        public video: Video,
        public author: Author,
        public series: Series
    ){}
}