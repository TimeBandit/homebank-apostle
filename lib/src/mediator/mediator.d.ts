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
    init: () => void;
}
export declare class Mediator implements BaseMediator {
    private view;
    private filemanager;
    private parser;
    private handlers;
    constructor(config?: {
        view?: View;
        fileManager?: FileManager;
        parser?: Parser;
    });
    addHandler(handler: Handler): void;
    getHandlers(): Handler[];
    request(payload: Payload): void;
    init(): void;
}
export default Mediator;
