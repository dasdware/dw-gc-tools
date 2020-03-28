import { h, FunctionalComponent } from 'preact';

import { FormulaInput } from './components/FormulaInput';
import { useVariables } from './hooks/useVariables';
import { VariablesTable } from './components/VariablesTable';

const App: FunctionalComponent = () => {
    const variables = useVariables('variables');

    return (
        <div>
            <h1>Geocaching Formula Calculator</h1>
            <FormulaInput name="northFormula" initialValue="" variables={variables}/>
            <FormulaInput name="eastFormula" initialValue="" variables={variables}/>
            <VariablesTable variables={variables} />
        </div>
    );
};

export default App;