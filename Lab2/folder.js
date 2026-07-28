import {mkdir, rm} from 'fs/promises';

// await mkdir("uploads");
// await rmdir("uploads/images");

// await mkdir("docs/resumes/data", { recursive: true });

//Selective deletion of files and folders. It will delete the folder if it exists, otherwise it will not throw an error.
// await rm("docs/resumes/data", { recursive: true, force: true });

// This will delete the folder and all its contents. It will throw an error if the folder does not exist.
await rm("docs", { recursive: true });