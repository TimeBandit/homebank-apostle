import FileManager from "../file-manager/file-manager";
import Parser from "../parser/parser";
import View from "../view/view";
export interface Handler {
    action: string;
    handle: (data?: {
        [key: string]: any;
    }) => any;
}
export interface Payload {
    action: string;
    data?: Record<string, any>;
    cb?: (data: {
        [key: string]: string;
    }) => void;
}
export interface BaseMediator {
    addHandler: (handler: Handler) => void;
    getHandlers: () => Handler[];
    request: (payload: Payload) => void;
}
export declare class Mediator implements BaseMediator {
    private view;
    private filemanager;
    private translator;
    private handlers;
    constructor(config?: {
        view?: View;
        fileManager?: FileManager;
        translator?: Parser;
    });
    addHandler(handler: Handler): void;
    getHandlers(): Handler[];
    request(payload: Payload): void;
}
export default Mediator;
