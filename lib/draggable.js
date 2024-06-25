let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let state = false;

export const draggable = (dragArea, draggableItem, item) => {
  const events = {
    mouse: {
      dragStart: "mousedown",
      drag: "mousemove",
      dragEnd: "mouseup",
    },
    touch: {
      dragStart: "touchstart",
      drag: "touchmove",
      dragEnd: "touchend",
    },
  };

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "touch";
    }
    return "mouse";
  };

  dragArea.addEventListener(
    events[deviceType()].dragStart,
    (e) => {
      e.preventDefault();
      let eventClientX =
        deviceType() === "touch" ? e.touches[0].clientX : e.clientX;
      let eventClientY =
        deviceType() === "touch" ? e.touches[0].clientY : e.clientY;

      initialX = eventClientX - xOffset;
      initialY = eventClientY - yOffset;

      e.target === draggableItem ? (state = true) : (state = false);

      if (state) {
        item.classList.add("active");
      }
    },
    { passive: false },
  );

  dragArea.addEventListener(
    events[deviceType()].drag,
    (e) => {
      let eventClientX =
        deviceType() === "touch" ? e.touches[0].clientX : e.clientX;
      let eventClientY =
        deviceType() === "touch" ? e.touches[0].clientY : e.clientY;

      if (state) {
        e.preventDefault();

        currentX = eventClientX - initialX;
        currentY = eventClientY - initialY;

        setTranslate(currentX, currentY, item);
      }
    },
    { passive: false },
  );

  dragArea.addEventListener(events[deviceType()].dragEnd, (e) => {
    initialX = currentX;
    initialY = currentY;
    state = false;
    item.classList.remove("active");
  });
};

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
