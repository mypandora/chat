class Element {
  constructor(tag, className = "") {
    if (typeof tag === "string") {
      this.el = document.createElement(tag);
      this.el.className = className;
    } else {
      this.el = tag;
    }
  }

  on(eventNames, handler) {
    const [fen, ...modifiers] = eventNames.split(".");
    let eventName = fen;
    const listener = (evt) => {
      handler(evt);
      for (let i = 0; i < modifiers.length; i += 1) {
        const k = modifiers[i];
        if (k === "left" && evt.button !== 0) {
          return;
        }
        if (k === "right" && evt.button !== 2) {
          return;
        }
        if (k === "stop") {
          evt.stopPropagation();
        }
      }
    };
    this.listenerMap = new Map([[eventName, listener]]);
    this.el.addEventListener(eventName, listener);
    return this;
  }

  off(eventName) {
    const listener = this.listenerMap?.get(eventName);
    this.el.removeEventListener(eventName, listener);
    return this;
  }

  parent() {
    return new Element(this.el.parentElement);
  }

  children(...eles) {
    if (eles.length === 0) {
      return this.el.childNodes;
    }
    eles.map((el) => this.child(el));
    return this;
  }

  child(arg) {
    let ele = arg;
    if (typeof arg === "string") {
      ele = document.createTextNode(arg);
    } else if (arg instanceof Element) {
      ele = arg.el;
    }
    this.el.appendChild(ele);
    return this;
  }

  removeChild(el) {
    this.el.removeChild(el);
  }

  attr(key, value = undefined) {
    if (value !== undefined) {
      this.el.setAttribute(key, value);
    } else {
      if (typeof key === "string") {
        return this.el.getAttribute(key);
      }
      Object.keys(key).forEach((k) => {
        this.el.setAttribute(k, key[k]);
      });
    }
    return this;
  }

  removeAttr(key) {
    this.el.removeAttribute(key);
    return this;
  }

  html(content) {
    if (content !== undefined) {
      this.el.innerHTML = content;
      return this;
    }
    return this.el.innerHTML;
  }

  css(name, value) {
    if (value === undefined && typeof name !== "string") {
      Object.keys(name).forEach((k) => {
        this.el.style[k] = name[k];
      });
      return this;
    }
    if (value !== undefined) {
      this.el.style[name] = value;
      return this;
    }
    return this.el.style[name];
  }

  show() {
    this.removeClass("hidden");
    return this;
  }

  hide() {
    this.addClass("hidden");
    return this;
  }

  addClass(name) {
    if (Array.isArray(name)) {
      this.el.classList.add(...name);
    } else {
      this.el.classList.add(name);
    }
    return this;
  }

  removeClass(name) {
    if (Array.isArray(name)) {
      this.el.classList.remove(...name);
    } else {
      this.el.classList.remove(name);
    }
    return this;
  }

  toggle(cls = "active") {
    return this.toggleClass(cls);
  }

  toggleClass(name) {
    return this.el.classList.toggle(name);
  }
}

const h = (tag, className = "") => new Element(tag, className);
export { Element, h };
