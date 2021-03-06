// @ts-ignore
import { Prompt, Select } from "enquirer";
import Mediator from "../Mediator/Mediator";
import { BaseComponent } from "../types";

class View extends BaseComponent {
  mediator: Mediator | null = null;
  fileNames: string[] = [];
  prompt: Prompt | null = null;
  runningPrompt?: Promise<void>;
  selection: any | null = null;

  setChoices(list: string[]) {
    if (!this.mediator) throw new Error("View: No mediator set");
    if (list.length === 0) throw new Error("No files found");
    this.fileNames = list;
    this.prompt = new Select({
      message: "Select a csv file",
      choices: list,
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

  async submit(selection?: string) {
    await this.runningPrompt;

    if (!this.selection) throw new Error("view: no selection made");

    this.mediator?.request({
      action: "view:select-file",
      data: { selection: this.selection },
    });
  }
}

export default View;
