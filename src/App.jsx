import { Route, Routes } from 'react-router-dom'
import SewiftHomepage from './MainHomepage/SewiftHomepage'
import About from './MainHomepage/About'
import TermsAndConditions from './MainHomepage/TermsAndConditions'
import Contact from './MainHomepage/Contact'
import Features from './MainHomepage/Features'
import SignUp from './Authentication/SignUp/SignUp'
import ClientLogin from './Authentication/Login/ClientLogin'
import AdminLogin from './Authentication/Login/AdminLogin'
import EmployeeLogin from './Authentication/Login/EmployeeLogin'

function App() {

  return (
    <Routes>
      <Route path='/' element={<SewiftHomepage />} />
      <Route path='/About' element={<About />} />
      <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Features' element={<Features />} />

      <Route path='/SignUp' element={<SignUp />} />

      <Route path='/ClientLogin' element={<ClientLogin />} />
      <Route path='/AdminLogin' element={<AdminLogin />} />
      <Route path='/EmployeeLogin' element={<EmployeeLogin />} />
    </Routes>
  )
}

export default App
