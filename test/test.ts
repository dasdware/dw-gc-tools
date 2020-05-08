import { expect } from 'chai';
import 'mocha';

import { parseCoordinateFormula } from '../src/formulas/formula-parser';
import { CoordinateKind } from '../src/formulas/formula';

const testCoordType = (type: CoordinateKind, formula: string) => {
    const result = parseCoordinateFormula(formula);
    expect(result.haveError).to.equal(false);
    expect(result.formula!.coordType).to.equal(type);

}

describe('parseCoordinateFormula', () => {
    it('should have error on empty formula', () => {
        const result = parseCoordinateFormula('');
        expect(result.haveError).to.equal(true);
    });

    it('should parse coordinate type \'N\' correctly', () => testCoordType('N', 'N 12° 34.567'));
    it('should parse coordinate type \'S\' correctly', () => testCoordType('S', 'S 12° 34.567'));
    it('should parse coordinate type \'E\' correctly', () => testCoordType('E', 'E 12° 34.567'));
    it('should parse coordinate type \'W\' correctly', () => testCoordType('W', 'W 12° 34.567'));
});