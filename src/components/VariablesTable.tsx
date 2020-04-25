import { h, FunctionalComponent } from "preact";

import { Variables } from "../formulas/variables";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "./FontAwesomeIcon";

export interface VariablesTableProps {
    variables: Variables;
}

export const VariablesTable: FunctionalComponent<VariablesTableProps> = (props) => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Actions</th>
            </tr>
            {props.variables.entries.map(
                entry => (
                    <tr>
                        <td>
                            {entry.name}
                        </td>
                        <td>
                            <input 
                                type="text" 
                                value={entry.value}
                                onInput={(e: any) => props.variables.set(entry.name, parseInt(e.target.value))}
                            />
                        </td>
                        <td>
                            <div onClick={() => props.variables.set(entry.name, undefined)}>
                                {entry.canDelete ? <FontAwesomeIcon icon={faTrashAlt} /> : ''}
                            </div>
                        </td>
                    </tr>
                )
            )}
        </table>
    );
};
