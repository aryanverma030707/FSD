const f1 = () => {
    console.log('f1 starts');
    f2();
    console.log("f1 running");
    console.log('f1 ends');
};
const f2 = () => {
    console.log('f2 starts');
    f3();
    console.log("f2 running");
    console.log('f2 ends');
};
const f3 = () => {
    console.log('f3 starts');
    console.log("f3 running");
    console.log('f3 ends');
};
function main(){
    console.log("main");
    f1();
    console.log("end main");
}
main();

// Js is  synchronous and single threaded
// in asynchronous we use Eventloop to manage call stackls
// Asynchronous using Timer ==> 1. Set Time out 
// 2. Set immediate 
// 3. Set process.nextTick
//