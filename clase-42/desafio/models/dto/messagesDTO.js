export default class MessagesDTO {
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
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.avatar = avatar;
    this.text = text;
    this.timestamp = timestamp;
    this.age = age;
    this.alias = alias;
  }
}

export function transformToDTO(messages) {
  if (Array.isArray(messages)) {
    return messages.map((message) => new MessagesDTO(message));
  } else {
    return new MessagesDTO(messages);
  }
}
