import { useState } from 'react'
import { BrowserRouter ,Route,Routes,Link} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import About from './components/About/About'
import Products  from './components/Products/Products'
import Cart from './components/Cart/Cart'
import SignIN from './components/SignIn'
import SignUp from './components/SignUp'
import Productdetail from './components/ProductDetail/Productdetail'
import './App.css'
function App() {
 

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path='/about' element={<About></About>}/>
        <Route  path='/products' element={<Products></Products>}/>
        <Route  path='/cart' element={<Cart></Cart>}/>
        <Route  path='/signIn' element={<SignIN></SignIN>}/>
        <Route  path='/signUp' element={<SignUp></SignUp>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
