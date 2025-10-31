console.log("the file i s read by the admin only");
//inporting the library
import{readFile} from"fs/promises";
// read file 
const read_file=async (fileName)=>{ 
  const data =await readFile(fileName,"utf-8");
  console.log(data);
};
read_file("sample.txt")