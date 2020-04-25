import { h, FunctionalComponent } from "preact";

import { Variables } from "../formulas/variables";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "./FontAwesomeIcon";
import { Button } from "./Button";

export interface VariablesTableProps {
    variables: Variables;
}

export const VariablesTable: FunctionalComponent<VariablesTableProps> = (props) => {
    return (
        <div class="variables">
            {props.variables.entries.map(
                entry => (
                    <div class="entry">
                        <div class="name">
                            {entry.name}
                        </div>
                        <div class="value">
                            <input 
                                type="text" 
                                value={entry.value}
                                onInput={(e: any) => props.variables.set(entry.name, parseInt(e.target.value))}
                            />
                        </div>
                        <div class="actions">
                            <Button icon={faTrashAlt} onClick={() => props.variables.set(entry.name, undefined)} />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};
