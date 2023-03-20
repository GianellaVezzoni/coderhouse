export default class MessageModel {
  _id;
  _email;
  _name;
  _lastname;
  _age;
  _alias;
  _avatar;
  _text;
  _timestamp;

  constructor({
    id,
    email,
    name,
    lastname,
    age,
    alias,
    avatar,
    text,
    timestamp,
  }) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._lastname = lastname;
    this._age = age;
    this._alias = alias;
    this._avatar = avatar;
    this._text = text;
    this._timestamp = timestamp;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get lastname() {
    return this._lastname;
  }

  set lastname(lastname) {
    this._lastname = lastname;
  }

  get age() {
    return this._age;
  }

  set age(age) {
    this._age = age;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get alias() {
    return this.alias;
  }

  set alias(alias) {
    this._alias = alias;
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(avatar) {
    this._avatar = avatar;
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    this._timestamp = timestamp;
  }

  getMessage() {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      lastname: this._lastname,
      age: this._age,
      alias: this._alias,
      avatar: this._avatar,
      text: this._text,
      timestamp: this._timestamp,
    };
  }
}
