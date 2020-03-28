import { useState, useEffect, StateUpdater } from "preact/hooks"

export type Creator<T> = () => T; 

function invokeOrReturn(f: any) {
	return typeof f == 'function' ? f() : f;
}

export function useLocalStorageState<T>(initialValue: T | Creator<T>, key: string): [T, StateUpdater<T>] {
    const initFunction = () => {
        const json = localStorage.getItem(key);
        if (json !== null) {
            return <T>JSON.parse(json);
        }
        return <T>invokeOrReturn(initialValue);
    };
    const [value, setValue] = useState(initFunction);

    useEffect(
        () => localStorage.setItem(key, JSON.stringify(value)),
        [value]
    );

    return [value, setValue];
}