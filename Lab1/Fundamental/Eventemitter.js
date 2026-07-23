import { EventEmitter } from "node:events";

const task = new EventEmitter();

const sayHi = (name) => {
    console.log(`Logged in ${name}`);
};

task.on("greet", sayHi);

task.on("greet", () => {
    console.log("Logged out");
});
task.once("greet",()=>{
    console.log("System started...")
});

task.off("exit",()=>{
    console.log("System is shutting down");
});

task.emit("greet","Deepank Chauhan");
task.emit("greet","Deepank");
task.emit("greet","Rahul");
task.emit("greet","Raju");