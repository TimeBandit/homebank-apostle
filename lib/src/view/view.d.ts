import { Prompt } from "enquirer";
import Mediator from "../mediator/mediator";
import { BaseComponent } from "../types";
declare class View extends BaseComponent {
    mediator: Mediator | null;
    choices: string[];
    prompt: Prompt | null;
    runningPrompt?: Promise<void>;
    selection: any | null;
    setQuestion(message: string, choices: string[]): void;
    promptUser(): void;
    submit(): Promise<void>;
}
export default View;
