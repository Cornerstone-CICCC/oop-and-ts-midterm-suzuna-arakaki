import { Component } from "../common/Component.js";
import { ProductListItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        this.state.products = data;
        container.appendChild(this.render());
      })
      .catch((err) => console.error(err));
  }

  render() {
    const productList = document.createElement("div");
    productList.className = "product-list";
    productList.innerHTML = "<h2>My Products</h2>";

    const ul = document.createElement("ul");
    this.state.products.forEach((product) => {
      const productItem = new ProductListItem({
        product,
        cartContext: this.props.cartContext,
      }).render();
      ul.appendChild(productItem);
    });
    productList.appendChild(ul);

    return productList;
  }
}
