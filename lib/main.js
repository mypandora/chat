import { h } from "./element.js";
import { draggable } from "./draggable.js";
import "./style.css";

export class Chat {
  constructor(options = {}) {
    this.targetEl = h("div", options.style || "absoulte right-9 bottom-9");

    this.chatBtn = null;
    this.chatMain = null;

    this.buildBtn(options);

    document.body.append(this.targetEl.el);
  }

  show() {
    //
    // this.targetEl.classList.add('w-[900px] h-[640px] bg-gray-200');
    // 隐藏图标，显示主窗口
    this.chatBtn?.hide();
    if (!this.chatMain) {
      this.buildMain();
    }
    this.chatMain.show();
  }

  close() {
    //
  }

  buildBtn(options) {
    const fragment = document.createDocumentFragment();

    this.chatBtn = h(
      "div",
      "w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer",
    );
    this.chatBtn.attr("title", options.tooltip || "展开");
    // 在这个 div 中添加 svg, img
    if (options.icon) {
      this.chatBtn.html(options.icon);
    }
    this.chatBtn.on("click", () => {
      this.show();
    });
    fragment.append(this.chatBtn.el);

    this.targetEl.el.append(fragment);
  }

  buildMain() {
    const fragment = document.createDocumentFragment();
    this.chatMain = h("div", "w-[900px] h-[640px] flex");

    const aside = h("div", "min-w-16 w-16 bg-[rgb(46,46,46)]");
    const section = h(
      "div",
      "min-w-52 w-52 bg-neutral-200 border-r border-neutral-300",
    );
    const main = h("div", "flex-1 flex flex-col");

    const toolbar = h(
      "div",
      "bg-neutral-100 h-12 flex items-center justify-end border-b border-neutral-300",
    );
    const closeIcon = h("span", "cursor-pointer");
    closeIcon.on("click", () => {
      this.chatBtn?.show();
      this.chatMain?.hide();
    });

    closeIcon.html(
      '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>',
    );
    toolbar.child(closeIcon);

    draggable(document.body, toolbar.el, this.targetEl.el);

    const foo = h("div", "flex-1 bg-neutral-100 border-b border-neutral-300");

    const message = h("div", "bg-neutral-100 h-40");
    const toolbar2 = h("div", "flex justify-end");
    toolbar2.h;
    const input = h(
      "textarea",
      "w-full h-full bg-neutral-100 border-none resize-none focus:outline-none p-4",
    );
    message.children(toolbar2, input);

    main.children(toolbar, foo, message);

    this.chatMain.children(aside, section, main);
    fragment.append(this.chatMain.el);

    this.targetEl.el.append(fragment);
  }
}

export default Chat;
