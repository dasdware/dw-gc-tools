import { h, FunctionalComponent } from "preact";
import { Variables } from "../utils/variables";

export interface VariablesTableProps {
    variables: Variables;
}

export const VariablesTable: FunctionalComponent<VariablesTableProps> = (props) => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
            {props.variables.entries.map(
                // entry => console.log(entry)
                entry => (
                    <tr>
                        <td>{entry.name}</td>
                        <td>
                            <input 
                                type="text" 
                                value={entry.value}
                                onInput={(e: any) => props.variables.update(entry.name, parseInt(e.target.value))}
                            />
                        </td>
                    </tr>
                )
            )}
        </table>
    );
};
