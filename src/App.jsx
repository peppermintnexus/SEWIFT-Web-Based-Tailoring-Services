import { Route, Routes } from "react-router-dom";
import SewiftHomepage from "./MainHomepage/SewiftHomepage";
import About from "./MainHomepage/About";

import Contact from "./MainHomepage/Contact";
import SignUp from "./Authentication/SignUp/SignUp";
import ClientSignUp from "./Authentication/SignUp/ClientSignUp";
import AdminSignUp from "./Authentication/SignUp/AdminSignUp";
import EmployeeSignUp from "./Authentication/SignUp/EmployeeSignUp";
import MeasurementForm from "./Client/MeasurementForm";
import MainLogin from "./Authentication/Login/MainLogin";
import ClientHomepage from "./Client/ClientHomepage";
import ClientProfile from "./Client/ClientProfile";
import ClientSettings from "./Client/ClientSettings";
import TailorShops from "./Client/TailorShops";
import ViewShopProfile from "./Client/ViewShopProfile";
import ClientOrder from "./Client/ClientOrder";
import EmployeeJobOrder from "./Employee/EmployeeJobOrder";
import EmployeeTransactionHistory from "./Employee/EmployeeTransactionHistory";
import EmployeeSettings from "./Employee/EmployeeSettings";
import AdminShopProfile from "./Admin/AdminShopProfile";
import AdminJobOrder from "./Admin/AdminJobOrder";
import EmployeesList from "./Admin/EmployeesList";
import AdminTransactionHistory from "./Admin/AdminTransactionHistory";
import AdminSettings from "./Admin/AdminSettings";
import AddProduct from "./Admin/AddProduct";
import EditProduct from "./Admin/EditProduct";
import OrderModal from "./components/OrderModal";

function App() {
  return (
    <Routes>
      <Route path='/' element={<SewiftHomepage />} />
      <Route path='/About' element={<About />} />
      <Route path='/Contact' element={<Contact />} />

      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/ClientSignUp' element={<ClientSignUp />} />
      <Route path='/AdminSignUp' element={<AdminSignUp />} />
      <Route path='/EmployeeSignUp' element={<EmployeeSignUp />} />
      <Route path='/MeasurementForm' element={<MeasurementForm />} />

      <Route path='/MainLogin' element={<MainLogin />} />

      <Route path='/ClientHomepage' element={<ClientHomepage />} />
      <Route path='/ClientProfile' element={<ClientProfile />} />
      <Route path='/ClientSettings' element={<ClientSettings />} />
      <Route path='/TailorShops' element={<TailorShops />} />
      <Route path='/ViewShopProfile/:shopId' element={<ViewShopProfile />} />
      <Route path='/ClientOrder' element={<ClientOrder />} />

      <Route path='/EmployeeJobOrder' element={<EmployeeJobOrder />} />
      <Route
        path='/EmployeeTransactionHistory'
        element={<EmployeeTransactionHistory />}
      />
      <Route path='/EmployeeSettings' element={<EmployeeSettings />} />

      <Route path='/AdminShopProfile' element={<AdminShopProfile />} />
      <Route path='/AdminJobOrder' element={<AdminJobOrder />} />
      <Route path='/EmployeesList' element={<EmployeesList />} />
      <Route
        path='/AdminTransactionHistory'
        element={<AdminTransactionHistory />}
      />
      <Route path='/AdminSettings' element={<AdminSettings />} />
      <Route path='/AddProduct' element={<AddProduct />} />
      <Route path='/EditProduct' element={<EditProduct />} />
      <Route path='/OrderModal' element={<OrderModal />} />
    </Routes>
  );
}

export default App;
