import DatauriParser from "datauri/parser";
import path from "path";




const getBuffer = (file : any) => {
    try {
        const parser = new DatauriParser();
        const extName = path.extname(file.originalname).toString();
        return parser.format(extName, file.buffer);

    } catch (error) {
        console.error("Error getting buffer:", error);
    }
};


export default getBuffer