import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/content/home";
import About from "./components/content/about";
import Product from "./components/content/products";
import Rifazox from "./components/products-detail/rifazox";
import Calocit from "./components/products-detail/calocit";
import Nexodol from "./components/products-detail/nexodol";
import Drogin from "./components/products-detail/drogin";
import Doxyvit from "./components/products-detail/doxyvit";
import Cefopox from "./components/products-detail/cefopox";
import Moxiv from "./components/products-detail/moxiv";
import Carvitazyme from "./components/products-detail/carvitazymedrop";
import Conrest from "./components/products-detail/conrest";
import Prefroz from "./components/products-detail/prefroz";
import Cefopoxdry from "./components/products-detail/cefopoxdry";
import Carvitazymesyrup from "./components/products-detail/carvitazyme";
import Oxizest from "./components/products-detail/oxizest";
import Shenom from "./components/products-detail/shenom";
import Rextyl from "./components/products-detail/rextyl";
import Firstpage from "./components/content/about-pages/first-page";
import GoodsBalance from "./components/content/goods/goods";
import Stockstatement from "./components/content/stockstatement/stockstatement";
import Outstanding from "./components/content/Outstanding/outstanding";
import Sk from "./components/content/stockstatement/stockists/sk";
import Self from "./components/content/stockstatement/stockists/self";
import Ganesh from "./components/content/stockstatement/stockists/ganesh";
import Soutstanding from "./components/content/StockistOutstanding/soutstanding";
import Profit from "./components/content/profit/profit";
import Transaction from "./components/content/transactions/transaction";
import Sale from "./components/content/sale/sale";
import Price from "./components/content/price/price";
import ProtectedRoute from "./components/auth/protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/home"
  element={
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <Home />
    </ProtectedRoute>
  }
/>
        <Route path="/about" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <About />
    </ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Product/>
    </ProtectedRoute>} />
        <Route path="/rifazox" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Rifazox />
    </ProtectedRoute>} />
        <Route path="/calocit" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Calocit />
    </ProtectedRoute>} />
        <Route path="/nexodol" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Nexodol />
    </ProtectedRoute>} />
        <Route path="/drogin" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Drogin />
    </ProtectedRoute>} />
        <Route path="/doxyvit" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Doxyvit />
    </ProtectedRoute>} />
        <Route path="/cefopox" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Cefopox />
    </ProtectedRoute>} />
        <Route path="/moxiv" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Moxiv />
    </ProtectedRoute>} />
        <Route path="/carvitazymedrop" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Carvitazyme />
    </ProtectedRoute>} />
        <Route path="/conrest" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Conrest />
    </ProtectedRoute>} />
        <Route path="/prefroz" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Prefroz />
    </ProtectedRoute>} />
        <Route path="/cefopoxdry" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Cefopoxdry />
    </ProtectedRoute>} />
        <Route path="/carvitazyme" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Carvitazymesyrup />
    </ProtectedRoute>} />
        <Route path="/oxizest" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Oxizest />
    </ProtectedRoute>} />
        <Route path="/shenom" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Shenom />
    </ProtectedRoute>} />
        <Route path="/rextyl" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Rextyl />
    </ProtectedRoute>} />
        <Route path="/first-page" element={<ProtectedRoute allowedRoles={["admin", "user"]}>
      <Firstpage />
    </ProtectedRoute>} />
        <Route path="/goods" element={<ProtectedRoute allowedRoles={["admin"]}>
      <GoodsBalance />
    </ProtectedRoute>} />
        <Route path="/stockstatement" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Stockstatement />
    </ProtectedRoute>} />
        <Route path="/outstanding" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Outstanding />
    </ProtectedRoute>} />
        <Route path="/sk" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Sk />
    </ProtectedRoute>} />
     <Route path="/self" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Self />
    </ProtectedRoute>} />
        <Route path="/ganesh" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Ganesh />
    </ProtectedRoute>} />
        <Route path="/soutstanding" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Soutstanding />
    </ProtectedRoute>} />
        <Route path="/profit" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Profit />
    </ProtectedRoute>} />
        <Route path="/transaction" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Transaction />
    </ProtectedRoute>} />
        <Route path="/price" element={<Price />} />
        <Route path="/sale" element={<Sale />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

