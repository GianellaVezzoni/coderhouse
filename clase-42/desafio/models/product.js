export default class ProductModel {
  _id;
  _title;
  _price;
  _image;

  constructor({ id, title, price, image }) {
    this._id = id;
    this._title = title;
    this._price = price;
    this._image = image;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    this._price = price;
  }

  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image;
  }

  getProduct() {
    return {
      id: this._id,
      title: this._title,
      price: this._price,
      image: this._image,
    };
  }
}
