import { BaseComponent } from "../types";

class View extends BaseComponent {
  selectFile(files: string[]) {
    if (!this.mediator) throw new Error("View: No mediator set");

    this.mediator.request({ action: "view:set-selection" });
  }
}

export default View;
