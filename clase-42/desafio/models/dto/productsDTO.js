export default class ProductsDto {
  constructor({ id, title, price, image }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
  }
}

export function transformToDTO(products) {
  if (Array.isArray(products)) {
    return products.map((product) => new ProductsDto(product));
  } else {
    return new ProductsDto(products);
  }
}
