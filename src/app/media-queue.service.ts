import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {isNullOrUndefined} from "util";
import {MediaType} from "./shared/enums";
import {MediaQueueList, MediaQueue, MediaQueueItem} from "./shared/interface/media-queue.interface";

@Injectable()
export class MediaQueueService {

    private _queues: MediaQueueList;
    public queue: BehaviorSubject<MediaQueue>;

    constructor() {
    }

    /**
     * Emits new queue values to subject
     * @param queue
     */
    private emit(queue: MediaType){

        let mediaQueue = {
            name: queue,
            items: this._queues[queue]
        };

        this.queue.next(mediaQueue);
    }

    /**
     * Registers a queue
     * @param queue
     */
    private registerQueue(queue: MediaType) {
        if (isNullOrUndefined(this._queues[queue])) {
            this._queues[queue] = [<MediaQueueItem>{}];
        }
    }

    /**
     * Appends items to active queue
     * @param queue
     * @param items
     */
    public add(queue: MediaType, items: MediaQueueItem[] | MediaQueueItem) {

        if (Array.isArray(items)) {
            this._queues[queue].concat(items);
        } else {
            this._queues[queue].push(items);
        }

        this.emit(queue);
    }

    /**
     * Removes items from active queue
     * @param queue
     * @param ids
     */
    public remove(queue: MediaType, ids?: number[] | number) {

        if (Array.isArray(ids)) {
            for (let id in ids) {
                let keyExists: number = ids.indexOf(parseInt(id), 0);
                if (keyExists > -1) {
                    this._queues[queue].splice(parseInt(id));
                }
            }
        }

        this.emit(queue);
    }

    /**
     * Activates specified queue
     * @param queue
     */
    public activate(queue: MediaType) {
        this.emit(queue);
    }

    /**
     * Deactivates specified queue
     * @param queue
     */
    public deactivate(queue: MediaType) {
        this.queue.next(null);
    }

}
