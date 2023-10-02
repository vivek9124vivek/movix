import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contectWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      // when we change the page it will set the scroll value to 0,0 because sometime we change the page we scroll the page to see the content
      window.scrollTo(0,0);
    },[location])
    
    //This logic is used to set header with scrolling in webpage if scroll is more than 200 then hide the navbar else show
    const controlNavbar = () => {
      console.log(window.scrollY);
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");
        }else{
          setShow("show")
        }
      }else{
        setShow("top");
      }
      setLastScrollY(window.scrollY);

    };
    useEffect(()=>{
      window.addEventListener("scroll",controlNavbar);
      return ()=>{
        window.removeEventListener("scroll",controlNavbar);
      };
    },[lastScrollY]);


    const searchQueryHandler = (event) =>{
      if(event.key==="Enter"){
     navigate(`/search/${query}`);
     setTimeout( ()=>{
      setShowSearch(true);
     },1000)
      }
    }

    const openSearch = () =>{
      setMobileMenu(false);
      setShowSearch(true);
      
    }
    const openMobileMenu = () =>{
      setMobileMenu(true);
      setShowSearch(false);

    }
    const navigationHandler = (type) => {
     if(type === "movie"){
       navigate("/explore/movie");
     }else{ 
      navigate("/explore/tv");
     }
     setMobileMenu(false);
    }
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""}  ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={() => navigate(`/`)}>
              <img src={logo} alt="" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={() => { navigationHandler("movie")}} >Movies</li>
              <li className="menuItem" onClick={() => { navigationHandler("tv")}} >TV Shows</li>
              <li className="menuItem" >
                <HiOutlineSearch onClick={openSearch} />
              </li>
            </ul>

            <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? <VscChromeClose onClick={()=>{
              setMobileMenu(false);
            }} /> : <SlMenu 
            onClick={openMobileMenu} />}

            </div>
          </ContentWrapper>
          { showSearch && <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
              <input type="text" placeholder="Search for a movie or TV show...." 
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler} 
              />
              <VscChromeClose onClick={()=>{
              setShowSearch(false);
            }} />
             </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;