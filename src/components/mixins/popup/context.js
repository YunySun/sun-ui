export var context = {
  zIndex: 2000,
  stack: [],
  get top() {
    return this.stack[this.stack.length - 1];
  }
};
