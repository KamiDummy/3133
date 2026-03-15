// Original version
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
console.log(greeter(user));
// ES6 version using let, arrow function, and template literals
var greeterES6 = function (firstName, lastName) {
    return "Hello, ".concat(firstName, " ").concat(lastName);
};
var firstName = "Jane";
var lastName = "User";
console.log(greeterES6(firstName, lastName));
