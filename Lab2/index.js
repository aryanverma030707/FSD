import { writeFile, readFile, appendFile } from "fs/promises";

// await writeFile("stud.txt", "Ravikant Singh\nRollNo: 28");
// console.log("File written successfully");

// const data = await readFile("stud.txt", "utf-8");
// console.log(`File contents: ${data}`);

const addContent = async (fname, content) => {
    await writeFile(fname, content);
    console.log(`${content} written in file: ${fname}`);
};

const readContent = async (fname) => {
    return await readFile(fname, "utf-8");
};

const appendData = async (fname, content) => {
    await appendFile(fname, "\n" + content);
    console.log(`Appended content to file: ${fname}`);
};

await addContent("notes.txt", "This is a new note.");
console.log("Contents\n", await readContent("notes.txt"));

await appendData(
    "notes.txt",
    "This is an appended note. It can read, write and append data in a file."
);

console.log("Updated Contents\n", await readContent("notes.txt"));