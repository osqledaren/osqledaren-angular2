import {PodcastType} from "../enums";
export interface MediaQueueList {
    [id: number]: Array<MediaQueueItem>
}

export interface MediaQueue {
    name: PodcastType,
    items: Array<MediaQueueItem>
}

export interface MediaQueueItem {
    id: number,
    slug: string
}