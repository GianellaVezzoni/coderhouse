import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Cart from "./views/Cart";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";

function App() {
 return (
  <div className="App">
   <header className="App-header">
    <Menu />
    <BrowserRouter>
     <Routes>
      <Route path="/">
       <Route index element={<Home />} />
       <Route path="carrito" element={<Cart />} />
       <Route path="productos" element={<Products />} />
       <Route path="detalle-producto/:id" element={<ProductDetail />} />
       <Route path="*" element={<NotFound />} />
      </Route>
     </Routes>
    </BrowserRouter>
   </header>
  </div>
 );
}

export default App;
