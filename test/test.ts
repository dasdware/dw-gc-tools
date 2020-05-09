import { expect } from 'chai';
import 'mocha';

import { parseCoordinateFormula } from '../src/formulas/formula-parser';
import { CoordinateKind, CoordinateFormula } from '../src/formulas/formula';
import { Variables } from '../src/formulas/variables';

const testCoordType = (type: CoordinateKind, formula: string) => {
    const result = parseCoordinateFormula(formula);
    expect(result.haveError).to.equal(false);
    expect(result.formula!.coordType).to.equal(type);

}

const testCoordValue = (value: number, formula: string) => {
    const result = new CoordinateFormula(formula, (value) => {});
    expect(result.haveError).to.equal(false);
    expect(result.decimalResult).to.be.closeTo(value, 0.000001);
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

describe('CoordinateFormula', () => {
    it('should calculate a simple number formula correctly (N)', () => testCoordValue(12.576117, 'N 12° 34.567'));
    it('should calculate a negative simple number formula correctly (S)', () => testCoordValue(-12.576117, 'S 12° 34.567'));
    it('should calculate a simple number formula correctly (E)', () => testCoordValue(12.576117, 'E 12° 34.567'));
    it('should calculate a negative simple number formula correctly (W)', () => testCoordValue(-12.576117, 'W 12° 34.567'));
});