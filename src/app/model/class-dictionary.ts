import {IKeyedCollection} from "./interface-keyed-collection";

export class Dictionary<T> implements IKeyedCollection<T> {
    private items: {[index: string]: T} = {};

    private size: number = 0;

    public containsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public count(): number {
        return this.size;
    }

    public add(key: string, value: T) {
        this.items[key] = value;
        this.size++;
    }

    public remove(key: string): T {
        let val = this.items[key];
        delete this.items[key];
        this.size--;
        return val;
    }

    public item(key: string): T {
        return this.items[key];
    }

    public keys(): string[] {
        let keySet: string[] = [];

        for (let prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }

        return keySet;
    }

    public values(): T[] {
        let values: T[] = [];

        for (let prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }
}