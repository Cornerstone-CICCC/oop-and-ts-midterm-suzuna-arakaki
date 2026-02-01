export class CartContext {
  constructor() {
    this.cart = []; // product cart array
    this.listeners = []; // array of methods
  }

  getCart() {
    return this.cart;
  }

  addProduct(item) {
    const found = this.cart.find((product) => product.id === item.id);
    // console.trace("called");
    if (!found) {
      this.cart.push({
        ...item,
        quantity: 1,
      });
    } else {
      this.cart = this.cart.map((product) =>
        product.id === item.id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product,
      );
    }

    this.notifyListeners(); // notify all listeners
  }

  incrementProduct(id) {
    this.cart = this.cart.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product,
    );
    this.notifyListeners();
  }

  decrementProduct(id) {
    const found = this.cart.find((product) => product.id === id);
    if (found.quantity > 1) {
      this.cart = this.cart.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product,
      );
    } else {
      this.cart = this.cart.filter((product) => product.id !== id);
    }
    this.notifyListeners();
  }

  deleteCart(id) {
    this.cart = this.cart.filter((product) => product.id !== id);
    this.notifyListeners();
  }

  subscribe(listener) {
    // listener is a method
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.cart));
  }
}
