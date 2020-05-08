import { expect } from 'chai';
import 'mocha';

import { parseCoordinateFormula } from '../src/formulas/formula-parser';

describe('parseCoordinateFormula', () => {
    it('should have error on empty formula', () => {
        const result = parseCoordinateFormula('');
        expect(result.haveError).to.equal(true);
    })
});