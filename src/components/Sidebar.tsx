import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent, h } from "preact";
import { AppController, AppView } from "../app-controller";
import { errorMessage } from "../styles/error";
import { sidebarClasses, sidebarStyle } from "../styles/sidebar";
import { Button } from "./Button";
import { FormulaInput } from "./FormulaInput";
import { VariablesTable } from "./VariablesTable";

export interface SidebarProps {
  controller: AppController;
}

export const Sidebar: FunctionalComponent<SidebarProps> = (props) => {
  const result =
    !props.controller.northFormula.haveError &&
    !props.controller.eastFormula.haveError ? (
      <div class="result">
        <div>{props.controller.northFormula.result}</div>
        <div>{props.controller.eastFormula.result}</div>
      </div>
    ) : (
      <div className={errorMessage}>
        At least one of the formulas has an error or cannot be calculated.
      </div>
    );

  return (
    <div
      className={sidebarClasses(props.controller.view === AppView.SETTINGS)}
      style="z-index: 9999"
    >
      <div className={sidebarStyle.content}>
        <h1 className={sidebarStyle.mainHeader}>
          Geocaching Formula Calculator
          <div className={sidebarStyle.headerActions}>
            <Button
              icon={faMap}
              onClick={() => props.controller.toggleView()}
            />
          </div>
        </h1>

        <h2 className={sidebarStyle.subHeader}>North coordinate</h2>
        <FormulaInput formula={props.controller.northFormula} />
        <h2 className={sidebarStyle.subHeader}>East coordinate</h2>
        <FormulaInput formula={props.controller.eastFormula} />
        <h2 className={sidebarStyle.subHeader}>Variables</h2>
        <VariablesTable variables={props.controller.variables} />

        <h2 className={sidebarStyle.subHeader}>Result</h2>
        {result}
      </div>
    </div>
  );
};
