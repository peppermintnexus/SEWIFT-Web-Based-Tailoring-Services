import { Route, Routes } from 'react-router-dom'
import SewiftHomepage from './MainHomepage/SewiftHomepage'
import About from './MainHomepage/About'
import TermsAndConditions from './MainHomepage/TermsAndConditions'
import Contact from './MainHomepage/Contact'
import Features from './MainHomepage/Features'
import SignUp from './Authentication/SignUp/SignUp'
import ClientSignUp from './Authentication/SignUp/ClientSignUp'
import AdminSignUp from './Authentication/SignUp/AdminSignUp'
import EmployeeSignUp from './Authentication/SignUp/EmployeeSignUp'
import MeasurementForm from './Client/MeasurementForm'
import MainLogin from './Authentication/Login/MainLogin'
import ClientHomepage from './Client/ClientHomepage'
import ClientProfile from './Client/ClientProfile'
import ClientSettings from './Client/ClientSettings'
import TailorShops from './Client/TailorShops'
import ViewShopProfile from './Client/ViewShopProfile'
import OrderForm from './Client/OrderForm'
import EmployeeHomepage from './Employee/EmployeeHomepage'
import OrderRequest from './Employee/OrderRequest'
import EmployeeJobOrder from './Employee/EmployeeJobOrder'
import EmployeeTransactionHistory from './Employee/EmployeeTransactionHistory'
import EmployeeSettings from './Employee/EmployeeSettings'
import AdminHomepage from './Admin/AdminHomepage'
import AdminShopProfile from './Admin/AdminShopProfile'
import AdminJobOrder from './Admin/AdminJobOrder'
import EmployeesList from './Admin/EmployeesList'
import AdminTransactionHistory from './Admin/AdminTransactionHistory'
import AdminSettings from './Admin/AdminSettings'
import AddProduct from './components/AddProduct'

function App() {

  return (
    <Routes>
      <Route path='/' element={<SewiftHomepage />} />
      <Route path='/About' element={<About />} />
      <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Features' element={<Features />} />

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
      <Route path='/ViewShopProfile' element={<ViewShopProfile />} />
      <Route path='/OrderForm' element={<OrderForm />} />

      <Route path='/EmployeeHomepage' element={<EmployeeHomepage />} />
      <Route path='/OrderRequest' element={<OrderRequest />} />
      <Route path='/EmployeeJobOrder' element={<EmployeeJobOrder />} />
      <Route path='/EmployeeTransactionHistory' element={<EmployeeTransactionHistory />} />
      <Route path='/EmployeeSettings' element={<EmployeeSettings />} />

      <Route path='/AdminHomepage' element={<AdminHomepage />} />
      <Route path='/AdminShopProfile' element={<AdminShopProfile />} />
      <Route path='/AdminJobOrder' element={<AdminJobOrder />} />
      <Route path='/EmployeesList' element={<EmployeesList />} />
      <Route path='/AdminTransactionHistory' element={<AdminTransactionHistory />} />
      <Route path='/AdminSettings' element={<AdminSettings />} />

      <Route path='/AddProduct' element={<AddProduct />} />
    </Routes>
  )
}

export default App
