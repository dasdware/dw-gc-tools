import { h, FunctionalComponent } from 'preact';

import { FormulaInput } from './components/FormulaInput';
import { VariablesTable } from './components/VariablesTable';
import { AppController } from './app-controller';
import { Map } from './components/Map';

const App: FunctionalComponent = () => {
    const controller = new AppController();

    const result = (!controller.northFormula.haveError && !controller.eastFormula.haveError)
        ? <div class="result">
            <div>{controller.northFormula.result}</div>
            <div>{controller.eastFormula.result}</div>
          </div>
        : <div class="error">
            At least one of the formulas has an error or cannot be calculated.
          </div>

    return (
        <div style="height: 100vh">
            <div class="sidebar" style="z-index: 9999">
                <div class="content">
                    <h1>Geocaching Formula Calculator</h1>

                    <h2>North coordinate</h2>
                    <FormulaInput formula={controller.northFormula} />
                    <h2>East coordinate</h2>
                    <FormulaInput formula={controller.eastFormula} />
                    <h2>Variables</h2>
                    <VariablesTable variables={controller.variables} />

                    <h2>Result</h2>
                    {result}
                </div>
            </div>
            <Map tileLayerURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                latitude={controller.northFormula.decimalResult} longitude={controller.eastFormula.decimalResult}></Map>
        </div>
    );
};

export default App;