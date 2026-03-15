// Original version
function greeter(person: string) {
    return "Hello, " + person;
}

var user = "Jane User";
console.log(greeter(user));

// ES6 version using let, arrow function, and template literals
let greeterES6 = (firstName: string, lastName: string): string => {
    return `Hello, ${firstName} ${lastName}`;
};

let firstName = "Jane";
let lastName = "User";
console.log(greeterES6(firstName, lastName));
