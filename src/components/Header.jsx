import React , {useState , useEffect} from 'react'
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import { NavLink , Link , Navigate, useNavigate, useLocation} from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { navigation } from '../contents/navigation';


const Header = () => {

  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInputValue, setSearchInputValue] = useState(removeSpace);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchInputValue){
      navigate(`/search?q=${searchInputValue}`);
    }
  }

  return (
    <header className="fixed top-0 h-16 w-full bg-black opacity-75 z-40">
      <div className="container mx-auto px-4 flex items-center h-full">
        <div className="flex w-full items-center">
          <Link to="/">
            <img src={logo} alt="Logo" width={120} />
          </Link>
          <nav className="ml-4  hidden lg:flex gap-4">
            {navigation.map((nav, index) => {
              return (
                <div> 
                  <NavLink
                    key={nav.label}
                    to={nav.href}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-bold"
                        : "text-neutral-200 hover:text-white"
                    }
                  >
                    {nav.label}
                  </NavLink>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-5">
            <form action="" className='flex gap-2' onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search......"
                className="bg-transparent text-white px-2 py-1 outline-none border-none hidden lg:block"
                onChange={(e) => setSearchInputValue(e.target.value)}
                value={searchInputValue}
              />
              <button className='text-2xl text-white'>
                <FiSearch/>
              </button>
            </form>

            <div className="w-10 h-10  active:scale-50 transition-all">
              <img src={user} alt="user" width={60} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header
