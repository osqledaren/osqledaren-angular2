import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import Dictionary from "typescript-collections/dist/lib/Dictionary";
import {isNullOrUndefined} from "util";
import {GUID} from "../shared/guid.class";
import {Episode} from "./episode.interface";
import LinkedList from "typescript-collections/dist/lib/LinkedList";


interface MediaQueueServiceSubjects {
    queue: BehaviorSubject <LinkedList<Episode>>,
    sidebarVisible: BehaviorSubject <boolean>
}

@Injectable()
export class MediaQueueService {

    private queues: Dictionary<GUID, LinkedList<Episode>> = new Dictionary<GUID, LinkedList<Episode>>();
    private activeQueue: GUID = undefined;
    private sidebarVisible: boolean = false;
    public subjects = <MediaQueueServiceSubjects>{
        queue: new BehaviorSubject<LinkedList<Episode>>(new LinkedList<Episode>()),
        sidebarVisible: new BehaviorSubject<boolean>(false)
    };

    constructor() {
    }

    /**
     * Emits new queue values to subject
     * @param queue
     */
    private emit(queue: GUID) {
        this.subjects.queue.next(this.queues.getValue(queue));
    }

    /**
     * Creates and registers a queue
     * @param queue
     */
    public registerQueue(queue: GUID) {

        let q = isNullOrUndefined(queue) ? new GUID() : queue;

        if (!this.queues.containsKey(q)) {
            this.queues.setValue(q, new LinkedList<Episode>());
        }

        return q;
    }

    /**
     * Removes a registered queue
     * @param queue
     */
    public deregisterQueue(queue: GUID) {
        this.queues.remove(queue);
    }

    /**
     * Removes all registered queues
     */
    public deregisterAll() {
        this.queues.clear();
        this.subjects.queue.next(undefined);
    }

    /**
     * Returns registered queues.
     * @returns {Dictionary<GUID, LinkedList<Episode>>}
     */
    public getQueues() {
        return this.queues;
    }

    /**
     * Activates specified queue
     * @param queue
     * @returns {GUID}
     */
    public activate(queue: GUID) {
        let q = this.registerQueue(queue);
        this.activeQueue = q;
        this.emit(q);
        return q;
    }

    /**
     * Deactivates specified queue
     * @param queue
     * @returns {GUID}
     */
    public deactivate(queue: GUID) {
        if (!this.queues.containsKey(queue)) return;
        this.subjects.queue.next(undefined);
        return queue;
    }

    /**
     * Appends item(s) to active queue
     * @param items
     */
    public enqueue(items: Episode[] | Episode) {

        let queue = this.activate(this.activeQueue); // Verify that there is a queue active.
        let v: Episode[] = <Episode[]>[].concat(items);
        let updatedQueue: LinkedList<Episode> = this.queues.getValue(queue);

        for (let i = 0; i < v.length; i++) {
            updatedQueue.add(v[i]);
        }

        this.queues.setValue(queue, updatedQueue);
        this.emit(queue);
    }

    /**
     * Removes item(s) from active queue
     * @param items
     */
    public dequeue(items: Episode[] | Episode) {

        if (isNullOrUndefined(this.activeQueue)) return;

        let updatedQueue: LinkedList<Episode> = this.queues.getValue(this.activeQueue);
        let v: Episode[] = <Episode[]>[].concat(items);

        for (let i = 0; i < v.length; i++) {
            updatedQueue.remove(v[i], MediaQueueService.compare);
        }
        this.queues.setValue(this.activeQueue, updatedQueue);
        this.emit(this.activeQueue);
    }

    /**
     * Quick way to determine if active queue contains item
     * @param item
     * @returns {boolean}
     */
    public contains(item: Episode) {

        if (isNullOrUndefined(this.activeQueue)) return false;

        return this.queues.getValue(this.activeQueue).contains(item, MediaQueueService.compare);
    }
    /**
     * Clears active queue
     */
    public clearQueue() {
        if (isNullOrUndefined(this.activeQueue)) return;
        let updatedQueue: LinkedList<Episode> = this.queues.getValue(this.activeQueue);

        updatedQueue.clear();
        this.emit(this.activeQueue);
    }

    /**
     * Returns whether two episodes' ids are equal
     * @param e1
     * @param e2
     * @returns {boolean}
     */
    public static compare(e1: Episode, e2: Episode){
        return e1.id === e2.id;
    }

    /**
     * Toggles sidebar state
     * @returns {boolean}
     */
    public toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
        this.subjects.sidebarVisible.next(this.sidebarVisible);
        return this.sidebarVisible;
    }

}
