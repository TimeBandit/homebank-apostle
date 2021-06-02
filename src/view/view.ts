// @ts-ignore
import { Prompt, prompt, PromptOptions } from "enquirer";
import Mediator from "../mediator/mediator";
import { BaseComponent } from "../types";
import { getLogger } from "../utils/utils";

const logger = getLogger(__filename);

class View extends BaseComponent {
  mediator: Mediator | null = null;
  choices: string[] = [];
  prompt: Prompt | null = null;
  runningPrompt?: Promise<void>;
  selection: any | null = null;
  prompts: PromptOptions[] = [
    {
      type: "confirm",
      name: "parseOnly",
      message: "Parse to file (hit enter for NO)?",
    },
  ];

  setQuestion(message: string, choices: string[]) {
    if (!this.mediator) throw new Error("View: No mediator set");
    if (choices.length === 0) throw new Error("No files found");

    this.prompts.push({
      type: "select",
      message,
      name: "fileName",
      choices,
    });
  }

  async promptUser() {
    try {
      const response = await prompt(this.prompts);
      this.mediator?.request({
        action: "view:promptUser",
        data: { ...response },
      });
    } catch (error) {
      logger.error(error);
    }
  }

  // TODO consider removing this
  async submit() {
    await this.runningPrompt;
    if (!this.selection) throw new Error("view: no selection made");

    this.mediator?.request({
      action: `view:select`,
      data: { selection: this.selection },
    });
  }
}

export default View;
