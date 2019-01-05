var CbliteXl = require("nativescript-cblite-xl").CbliteXl;
var cbliteXl = new CbliteXl();

describe("greet function", function() {
    it("exists", function() {
        expect(cbliteXl.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(cbliteXl.greet()).toEqual("Hello, NS");
    });
});