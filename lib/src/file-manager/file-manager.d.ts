import { BaseComponent } from "../types";
declare class FileManager extends BaseComponent {
    reader: Reader | null;
    fileName: string;
    loadFile(fileName: any): Promise<boolean | Error>;
    readLine(): Promise<string | Error>;
    hasNextLine(): Promise<boolean | Error>;
}
export default FileManager;
