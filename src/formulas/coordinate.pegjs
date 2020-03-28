Coordinate
    = coordType:("N" / "E") _ head:Expression tail:(_ Expression)* {
           coordType = coordType || "U";
           return { kind: 'formula', coordType, expressions: [head, ...(tail.map(expr => expr[1]))] };
   }

Expression = Addition
  / Degrees
  / Dot
 
Addition
  = head:Multiplication tail:(_ ("+" / "-") _ Multiplication)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return { kind: "add", operands: [ result, element[3] ] }; }
        if (element[1] === "-") { return { kind: "subtract", operands: [ result, element[3] ] }; }
      }, head);
    }
 
Multiplication
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return { kind: "multiply", operands: [ result, element[3] ] }; }
        if (element[1] === "/") { return { kind: "divide", operands: [ result, element[3] ] }; }
      }, head);
    }
 
Factor
  = "(" _ expr:Addition _ ")" { return expr; }
  / "[" _ expr:Addition _ "]" { return expr; }
  / Integer
  / Variable
 
Integer "integer"
  = _ [0-9]+ { return { kind: "number", value: parseInt(text(), 10) }; }
 
Variable "variable"
  = _ [a-zA-Z0-9] { return { kind: "variable", name: text() }; }
 
Degrees "deegrees"
  = _ "°" { return { kind: "degrees" }; }
 
Dot "dot"
  = _ "." { return { kind: "dot" }; }
 
_ "whitespace"
  = [ \t\n\r]*
