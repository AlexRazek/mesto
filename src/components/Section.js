export default class Section {
    constructor({ renderer }, containerSelector) {
      // this._renderedItems = items;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  
    setItem(element) {  
      this._container.prepend(element);
    };

    //  renderItems(cardsData) {  
    //     Array.from(cardsData).forEach((item) => {
    //       this._renderer(item)
    //   });
    // }

    renderItems(cardsData) {  
      cardsData.reverse().forEach(this._renderer)
      };
    }
