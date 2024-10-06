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
import MeasurementForm from './components/MeasurementForm'
import ClientLogin from './Authentication/Login/ClientLogin'
import AdminLogin from './Authentication/Login/AdminLogin'
import EmployeeLogin from './Authentication/Login/EmployeeLogin'
import ClientHomepage from './Client/ClientHomepage'
import ClientProfile from './Client/ClientProfile'
import ClientSettings from './Client/ClientSettings'
import TailorShops from './Client/TailorShops'
import EmployeeHomepage from './Employee/EmployeeHomepage'
import AdminHomepage from './Admin/AdminHomepage'

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

      <Route path='/ClientLogin' element={<ClientLogin />} />
      <Route path='/AdminLogin' element={<AdminLogin />} />
      <Route path='/EmployeeLogin' element={<EmployeeLogin />} />

      <Route path='/ClientHomepage' element={<ClientHomepage />} />
      <Route path='/ClientProfile' element={<ClientProfile />} />
      <Route path='/ClientSettings' element={<ClientSettings />} />
      <Route path='/TailorShops' element={<TailorShops />} />

      <Route path='/EmployeeHomepage' element={<EmployeeHomepage />} />

      <Route path='/AdminHomepage' element={<AdminHomepage />} />
    </Routes>
  )
}

export default App
