import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/ui/common/NavBar/NavBar";

import PrivateRoute from "./Components/PrivateRoute";
import Detalles from "./Components/screens/Detalles/ArticuloDetails";
import { useAuth } from "./contexts/AuthContext";
import { useCart } from "./contexts/CartContext";
import NotFound from "./Components/screens/NotFound/NotFound";

import VerInstrumentos from "./Components/screens/VerArticulos/VerArticulos";
import PromotionDetails from "./Components/screens/Detalles/PromocionDetails";
import VerArticulos from "./Components/screens/VerArticulos/VerArticulos";
import VerSucursales from "./Components/screens/VerSucursal/VerSucursal";
import HomeSucursal from "./Components/screens/Home/HomeSucursal";
import VerPromociones from "./Components/screens/VerPromociones/VerPromociones";

const App: React.FC = () => {
  const { login, userRole } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const authInfo = localStorage.getItem("authInfo");
    if (authInfo) {
      const { username, role, id } = JSON.parse(authInfo);
      login(username, role, id);
    }
  }, [login]);

  return (
    <Router>
      <div style={{ paddingBottom: "56px", position: "relative" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<VerSucursales />} />
          <Route path="/sucursal/:id/home" element={<HomeSucursal />} />
          <Route path="/sucursal/:id/Articulos" element={<VerArticulos />} />
          <Route path="/sucursal/:id/Promociones" element={<VerPromociones />} />
          

          
          

          <Route
            path="/detalles/:id"
            element={<Detalles addToCart={addToCart} userRole={userRole} />}
          />
          <Route
            path="/detallesPromocion/:id"
            element={<PromotionDetails addToCart={addToCart} userRole={userRole} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
