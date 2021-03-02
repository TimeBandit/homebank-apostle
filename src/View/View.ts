import { BaseComponent } from "../types";

class View extends BaseComponent {
  selectFile(files: string[]) {
    if (!this.mediator) throw new Error("View: No mediator set");

    this.mediator.request({
      action: "view:select-file",
      data: { selection: "testFile2" },
    });
  }
}

export default View;
