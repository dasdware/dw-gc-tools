import { StateUpdater, useEffect, useState } from "preact/hooks";

export type Creator<T> = () => T;

export interface Mapper<T, U> {
  mapToStorage: (input: T) => U;
  mapFromStorage: (input: U) => T;
}

function invokeOrReturn(f: any) {
  return typeof f == "function" ? f() : f;
}

export function useLocalStorageState<T>(
  initialValue: T | Creator<T>,
  key: string
): [T, StateUpdater<T>] {
  const initFunction = () => {
    const json = localStorage.getItem(key);
    if (json !== null) {
      return <T>JSON.parse(json);
    }
    return <T>invokeOrReturn(initialValue);
  };
  const [value, setValue] = useState(initFunction);

  useEffect(() => {
    console.log("writing to local storage", key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export function useMappedLocalStorageState<T, U>(
  initialValue: U | Creator<U>,
  key: string,
  mapper: Mapper<T, U>
): [T, StateUpdater<T>] {
  const [mappedValue, setMappedValue] = useLocalStorageState<U>(
    initialValue,
    key
  );

  return [
    mapper.mapFromStorage(mappedValue),
    (value: T | ((prevState: T) => T)) => {
      const anyValue = <any>value;
      if (typeof anyValue === "function") {
        setMappedValue((oldValue: U) =>
          mapper.mapToStorage(anyValue(mapper.mapFromStorage(oldValue)))
        );
      } else {
        setMappedValue(mapper.mapToStorage(anyValue));
      }
    },
  ];
}
