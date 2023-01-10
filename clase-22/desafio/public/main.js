const socket = io();

socket.on("products", (data) => {
 const html = data.map((product) => {
  return `
        <tr class="tData">
            <td><p>${product.productName}</p></td>
            <td><p>${product.productPrice}</p></td>
            <td><img width="50" height="50" src={${product.prodoductImage}} /></td>
        </tr>
        `;
 });
 document.getElementById("products").innerHTML = html;
});

function addProduct() {
 const product = {
  productName: document.getElementById("productName").value,
  productPrice: document.getElementById("productPrice").value,
  productImage: document.getElementById("productImage").value,
 };

 socket.emit("new-product", product);
 return;
}

socket.on("messages", (mess) => {
 const html = mess.map((msje) => {
  return `<div>
            <p style="color:blue;font-weight:600;">${msje.name} ${msje.lastname} (${msje.age})</p>
            <p style="color:blue;font-weight:600;"><${msje.alias}> ${msje.email}</p>
            <p style="color:brown;margin-bottom: 0px;
            margin-top: -15px;
            font-size: 12px;">${msje.date}</p>
            <p style="color:green;font-style: italic;">${msje.text}</p>
            <img src=${msje.avatar} height=50px width=50px />
           </div>`;
 }).join(" ");
 document.getElementById("messages").innerHTML = html;
});

async function addMessage() {
 const message = {
  email: document.getElementById("email").value,
  text: document.getElementById("text").value,
  name: document.getElementById("name").value,
  lastname: document.getElementById("lastname").value,
  alias: document.getElementById("alias").value,
  age: document.getElementById("age").value,
  avatar: document.getElementById("avatar").value,
  date: new Date().toLocaleString(),
 };
 socket.emit("new-message", message);
 return;
}
