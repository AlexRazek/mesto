export default class Section {
    constructor({ renderer }, containerSelector) {
      // this._renderedItems = items;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  
    setItem(element) {  
      this._container.prepend(element);
    };
  
    renderItems(data) {  
      data.forEach(item => {
            this._renderer(item)
      });
    }
  };


