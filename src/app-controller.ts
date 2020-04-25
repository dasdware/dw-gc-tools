import { CoordinateFormula } from "./formulas/formula";
import { Map } from "immutable";
import { useState, StateUpdater } from "preact/hooks";
import { Variable, Variables } from "./formulas/variables";

interface AppState {
    northFormula: string;
    eastFormula: string;
    variables: Map<string, number>;
}

export class AppController {
    private _state: AppState;
    private _setState: StateUpdater<AppState>;

    northFormula: CoordinateFormula;
    eastFormula: CoordinateFormula;

    variables: Variables;

    constructor() {
        [this._state, this._setState] = useState(() => <AppState>{
            northFormula: JSON.parse(localStorage.getItem('northFormula') || '""'),
            eastFormula: JSON.parse(localStorage.getItem('eastFormula') || '""'),
            variables: Map<number>(JSON.parse(localStorage.getItem('variables') || '{"A": 3, "B": 8}'))
        });

        this.northFormula = new CoordinateFormula(this._state.northFormula,
            (value) => this.setNorthFormula(value));
        this.eastFormula = new CoordinateFormula(this._state.eastFormula,
            (value) => this.setEastFormula(value));

        this.variables = new Variables(
            this._state.variables.toArray().map(value => new Variable(value[0], value[1], false, true)),
            [ this.northFormula, this.eastFormula ],
            (name: string, value?: number) => this.setVariable(name, value)
        );
    }

    private setState(changes: any) {
        this._setState(
            {
                ...this._state,
                ...changes
            }
        );
    }

    setNorthFormula(value: string) {
        localStorage.setItem('northFormula', JSON.stringify(value));
        this.setState({ northFormula: value });
    }

    setEastFormula(value: string) {
        localStorage.setItem('eastFormula', JSON.stringify(value));
        this.setState({ eastFormula: value });
    }

    setVariable(name: string, value?: number) {
        let variables = this._state.variables;
        if (value === undefined) {
            variables = this._state.variables.remove(name);
        } else {
            variables = this._state.variables.set(name, value);
        }
        localStorage.setItem('variables', JSON.stringify(variables.toJSON()));
        this.setState({ variables });
    }
}