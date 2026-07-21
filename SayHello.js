function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

const sayHi = (name) => {
    console.log(`Logged in ${name}`);
};

const findSum = (a, b) => {
    return a + b;
}       

const sum = (a,b) => a+b;

sayHello("Aryan Verma");
sayHi("Abhimanyu Singh");
console.log("Sum =", findSum(5, 10));
console.log("Sum =", sum(5, 10));