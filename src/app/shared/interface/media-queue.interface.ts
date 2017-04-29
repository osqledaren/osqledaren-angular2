import {Queue} from "../enums";
export interface MediaQueueList {
    [id: number]: Array<MediaQueueItem>
}

export interface MediaQueue {
    name: Queue,
    items: Array<MediaQueueItem>
}

export interface MediaQueueItem {
    id: number,
    slug: string
}