// This is taken from the mocha-pegjs-compiler package*. In that package,
// two of the file extensions are missing the dot ('.'). We need it and
// the package seems not to be maintained anymore, so here is our own
// (adapted) version.
//
// *see https://www.npmjs.com/package/mocha-pegjs-compiler

const fs = require("fs");
const peg = require("pegjs");

['.pjs', '.peg', '.pegjs'].forEach(ext => require.extensions[ext] = function (module, filename) {
    const grammar = fs.readFileSync(filename, 'utf8');
    module.exports = peg.generate(grammar);
});
