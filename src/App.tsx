import { h, FunctionalComponent } from 'preact';

import { FormulaInput } from './components/FormulaInput';
import { useVariables } from './hooks/useVariables';
import { VariablesTable } from './components/VariablesTable';
import { useCoordinateFormula } from './hooks/useCoordinateFormula';
import { AppController } from './app-controller';

const App: FunctionalComponent = () => {
    const controller = new AppController();

    return (
        <div>
            <h1>Geocaching Formula Calculator</h1>

            <div>N 51 ° 0(C-L+1).([G/6-F]+2)(I-H+D)(F-I-4)</div>
            <div>E 013° L(A+2).(K-F)(G/K-E+D)(A+E)</div>

            <FormulaInput formula={controller.northFormula} />
            <FormulaInput formula={controller.eastFormula} />

            <VariablesTable variables={controller.variables} />
        </div>
    );
};

export default App;