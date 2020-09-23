export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  
    renderItems(initialCards) {
      this._renderedItems.forEach(item => this._renderer(item))
      /*initialCards.forEach(item => this._renderer(item))*/
    }
  
    addItem(cardElement, isArray) { 
        if (isArray) { 
          this._container.append(cardElement); 
        } else { 
          this._container.prepend(cardElement); 
        } 
      } 
    
  }
