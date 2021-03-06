// @ts-ignore
import { Prompt, Select } from "enquirer";
import Mediator from "../Mediator/Mediator";
import { BaseComponent } from "../types";

class View extends BaseComponent {
  mediator: Mediator | null = null;
  fileNames: string[] = [];
  prompt: Prompt | null = null;

  promptUser(list: string[]) {
    if (!this.mediator) throw new Error("View: No mediator set");
    if (list.length === 0) throw new Error("No files found");
    this.fileNames = list;
    this.prompt = new Select({
      message: "Select a csv file",
      choices: list,
    });
    // this.prompt?.addListener('submit', and)
  }

  submit(selection: string) {
    this.mediator?.request({
      action: "view:select-file",
      data: { selection: selection },
    });
  }
  selectChoice() {
    this.prompt
      ?.run()
      .then((selection) => {
        this.mediator?.request({
          action: "view:select-file",
          data: { selection: selection },
        });
      })
      .catch(console.error);
  }
}

export default View;
