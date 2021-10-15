import rewire from "rewire"
const coordinate_calculation = rewire("./coordinate-calculation")
const calculateNumber = coordinate_calculation.__get__("calculateNumber")
const calculateExpression = coordinate_calculation.__get__("calculateExpression")
const calculate = coordinate_calculation.__get__("calculate")
// @ponicode
describe("calculateNumber", () => {
    test("0", () => {
        let callFunction: any = () => {
            calculateNumber({ kind: "number", operands: [], name: "", value: NaN }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("calculateExpression", () => {
    test("0", () => {
        let callFunction: any = () => {
            calculateExpression({ kind: "degrees", operands: [], name: "", value: -Infinity }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("calculate", () => {
    test("0", () => {
        let callFunction: any = () => {
            calculate(NaN, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
