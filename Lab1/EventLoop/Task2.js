const f1 = () => {
    console.log('f1');
};
const f2 = () => {
    console.log('f2');
};
const f3 = () => { 
    console.log('f3');  
};
// const main = () => {
//     console.log('main');
//     setTimeout(f1,300);
//     f2();
//     console.log('end main');
// };
// main();
const main = () => {
    console.log('main');
    setTimeout(f1, 0);
    // setInterval(f2, 1000);
    setImmediate(f2);
    process.nextTick(f3);// process.nextTick is executed before setTimeout and setImmediate
    console.log('end main');
};
main()
//promise