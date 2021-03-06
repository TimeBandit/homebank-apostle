// @ts-ignore
import { Prompt, Select } from "enquirer";
import Mediator from "../Mediator/Mediator";
import { BaseComponent } from "../types";

class View extends BaseComponent {
  mediator: Mediator | null = null;
  choices: string[] = [];
  prompt: Prompt | null = null;
  runningPrompt?: Promise<void>;
  selection: any | null = null;

  setQuestion(message: string, choices: string[]) {
    if (!this.mediator) throw new Error("View: No mediator set");
    if (choices.length === 0) throw new Error("No files found");

    this.choices = choices;
    this.prompt = new Select({
      message,
      choices,
    });
  }

  promptUser() {
    this.runningPrompt = this.prompt
      ?.run()
      .then((selection) => {
        this.selection = selection;
      })
      .catch(console.error);
  }

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
