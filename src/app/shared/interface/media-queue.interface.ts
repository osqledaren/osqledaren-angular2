import {MediaType} from "../enums";
export interface MediaQueueList {
    [id: number]: Array<MediaQueueItem>
}

export interface MediaQueue {
    name: MediaType,
    items: Array<MediaQueueItem>
}

export interface MediaQueueItem {
    id: number,
    slug: string
}