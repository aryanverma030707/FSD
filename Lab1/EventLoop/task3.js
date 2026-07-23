import fs from "fs/promises";

const writeData = async () => {
    try {
        console.log("about to write data ...");
        await fs.writeFile('stud.txt', "Name: John Doe\nAge: 25\nCourse: Computer Science");
        console.log("Data written successfully");

    } catch (error) {
        console.log("Error", error);
    }
};

const main = async () => {
    console.log("main");
    writeData();
    console.log("end ")
};
main();