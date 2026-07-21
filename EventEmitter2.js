import {EventEmitter} from 'node:events';

const sayHi = (name) => {
    console.log(`${name} Logged in`);
};

const task = new EventEmitter();

task.once("greet", () =>{
    console.log("System Started");
});

task.on("greet", sayHi);
task.on("greet", (name)=>{
    console.log(`${name} starts working`);
});

task.on("greet", (name)=>{
    console.log(`${name} Logged Out`);
});

task.once("exit", (name) => {
    console.log(`System Shutting Down by ${name}`);
});

task.emit("greet", "Aryan Verma");
console.log();
task.emit("greet", "Arjun Singh");
console.log();
task.off("greet", sayHi);
task.emit("greet", "Abhimanyu Singh");
console.log();
task.emit("exit", "Manager");//Execute only once
task.emit("exit", "Admin");//Will not execute because it is already executed once

console.log("total listeners for greet event: ", task.listenerCount("greet"));
task.removeAllListeners("greet");