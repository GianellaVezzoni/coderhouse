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

socket.on("messages", (data) => {
 const html = data.map((msje) => {
  return `<div>
            <p style="color:blue;font-weight:600;">${msje.email}</p>
            <p style="color:brown;margin-bottom: 0px;
            margin-top: -15px;
            font-size: 12px;">${msje.date}</p>
            <p style="color:green;font-style: italic;">${msje.text}</p>
           </div>`;
 }).join(" ");
 document.getElementById("messages").innerHTML = html;
});

async function addMessage() {
 const message = {
  email: document.getElementById("email").value,
  text: document.getElementById("text").value,
  date: new Date().toLocaleString(),
 };
 socket.emit("new-message", message);
 return;
}
