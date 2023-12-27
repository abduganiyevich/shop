import { IoSunny } from "react-icons/io5";
import { TbMoonStars } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header() {


  const[showMode,setShowMode]=useState(true);

  useEffect(()=>{
    document.querySelector('body').setAttribute('thema','light');
  },[]);
  function lightMode() {
    document.querySelector('body').setAttribute('thema','dark');
    setShowMode(false)
  }

  function darkMode() {
    document.querySelector('body').setAttribute('thema','light');
    setShowMode(true)
  }


function handleClick() {
  window.location.href='/Cart'
}

  return (
    <>
      <div >
        <div className="header-top">
         <div className="container">
         <div className="header-auth">
         <Link to="/signIn">Sign in/Guest</Link>
          <Link to="/signUp">Create Account</Link>
         </div>
         </div>
        </div>

        <div className="header-bottom">

        <div className="container">
          <div className="header-bottom">
          <div className="header-logo">
            <Link to="/">C</Link>
          </div>

          <div className="header-nav">
            <ul>
              <li>
                <Link className="first-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="header-icon">
            {
              !showMode&&(<IoSunny className="sunny"  onClick={darkMode}/>)
            }                
            {
             showMode&&(<TbMoonStars className="sunny" onClick={lightMode}/>)
            }                
            <LuShoppingCart className="shop-cart" onClick={handleClick}/>
          </div>
          
          </div>
        </div>
        </div>

      </div>
    </>
  );
}
