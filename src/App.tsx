import { h, FunctionalComponent } from 'preact';

import { FormulaInput } from './components/FormulaInput';
import { VariablesTable } from './components/VariablesTable';
import { AppController } from './app-controller';
import { Map } from './components/Map';

const App: FunctionalComponent = () => {
    const controller = new AppController();

    const result = (!controller.northFormula.haveError && !controller.eastFormula.haveError)
        ? <div class="result">
            <div>{controller.northFormula.result} - {controller.northFormula.decimalResult}</div>
            <div>{controller.eastFormula.result} - {controller.eastFormula.decimalResult}</div>
          </div>
        : <div class="error">
            At least one of the formulas has an error or cannot be calculated.
          </div>

    return (
        <div style="height: 100vh">
            <div class="sidebar" style="z-index: 9999">
                <div class="content">
                    <h1>Geocaching Formula Calculator</h1>

                    {/* <div>N 51 ° 0(C-L+1).([G/6-F]+2)(I-H+D)(F-I-4)</div>
                    <div>E 013° L(A+2).(K-F)(G/K-E+D)(A+E)</div> */}

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