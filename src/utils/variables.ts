import { useState, StateUpdater } from "preact/hooks";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export class Variable {
    constructor(
        public name: string,
        public value: number = 0
    ) {}
}

export class Variables {
    private _entries: Array<Variable>;
    private _setEntries: StateUpdater<Array<Variable>>;

    // private [entries, setEntries] = useState(() => new Array<Variable>);

    constructor(name: string) {
        [this._entries, this._setEntries] = useLocalStorageState(() => new Array<Variable>(), name);
    }

    has(name: string) {
        return this._entries.find(e => e.name === name) !== undefined;
    }

    set(name: string, value: number = 0) {
        this._setEntries(oldEntries => {
            const newEntries = [...oldEntries];
            const entry = newEntries.find(e => e.name === name);
            if (entry !== undefined) {
                entry.value = value;
            } else {
                newEntries.push(new Variable(name, value));
                newEntries.sort((e1, e2) => e1.name.localeCompare(e2.name));
            }
            this._entries = newEntries;
            return newEntries;
        });
    }

    register(name: string) {
        if (this.has(name)) {
            return;
        }
        this.set(name);
    }

    get(name: string) {
        const entry = this._entries.find(e => e.name === name);
        if (entry !== undefined) {
            return entry.value;
        }
        return NaN;
    }

    get entries() { return this._entries };

    update(name: string, value: number) {
        this.set(name, value);
        // const newTable = new Variables();
        // newTable._entries = [...this._entries];
        // newTable.set(name, value);
        // return newTable;
    }
}