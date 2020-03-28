import { Variables } from "../utils/variables";

export function useVariables(name: string) {
    return new Variables(name);
}