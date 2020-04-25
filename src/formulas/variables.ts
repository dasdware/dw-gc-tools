import { useState, StateUpdater } from "preact/hooks";
import { useLocalStorageState, useMappedLocalStorageState } from "../hooks/useLocalStorageState";
import { CoordinateFormula } from "./formula";

export class Variable {
    constructor(
        public name: string,
        public value: number,
        public registered: boolean,
        public stored: boolean
    ) { }

    get canDelete() {
        return !this.registered && this.stored;
    }
}

export class Variables {

    constructor(
        private _entries: Array<Variable>,
        private formulas: CoordinateFormula[],
        private _variableUpdater: (name: string, value?: number) => void
    ) {
        for (const formula of this.formulas) {
            formula.variables = this;
        }
        this.registerVariables();
    }

    private findEntry(name: string) {
        return this._entries.find(e => e.name === name);
    }    

    private updateEntry(name: string, value?: number, registered?: boolean) {
        const entry = this.findEntry(name);
        if (entry !== undefined) {
            if (value !== undefined) {
                entry.value = value;
            }
            if (registered !== undefined) {
                entry.registered = registered;
            }
        } else {
            this._entries.push(new Variable(name, value || 0, registered || false, false));
            this._entries.sort((e1, e2) => e1.name.localeCompare(e2.name));
        }
    }    

    has(name: string) {
        return this.findEntry(name) !== undefined;
    }

    set(name: string, value?: number) {
        this._variableUpdater(name, value);
    }    

    register(name: string) {
        this.updateEntry(name, undefined, true);
    }

    get(name: string) {
        const entry = this._entries.find(e => e.name === name);
        if (entry !== undefined) {
            return entry.value;
        }
        return NaN;
    }

    get entries() { return this._entries };    

    registerVariables() {
        for (const entry of this._entries) {
            entry.registered = false;
        }
        for (const formula of this.formulas) {
            formula.registerVariables();
        }
    }
}
