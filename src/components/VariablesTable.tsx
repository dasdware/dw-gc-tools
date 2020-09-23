import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent, h } from "preact";
import { Variables } from "../formulas/variables";
import { variableTable } from "../styles";
import { Button } from "./Button";

export interface VariablesTableProps {
  variables: Variables;
}

export const VariablesTable: FunctionalComponent<VariablesTableProps> = (
  props
) => {
  return (
    <div class="variables">
      {props.variables.entries.map((entry) => (
        <div className={variableTable.entry}>
          <div>{entry.name}</div>
          <input
            type="text"
            value={entry.value}
            onInput={(e: any) =>
              props.variables.set(entry.name, parseInt(e.target.value))
            }
          />
          <div>
            <Button
              icon={faTrashAlt}
              enabled={entry.canDelete}
              onClick={() => props.variables.set(entry.name, undefined)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
