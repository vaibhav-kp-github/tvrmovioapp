import React from 'react'
import { MobileNavigation as Mobilenavigation} from '../contents/navigation';
import { NavLink } from 'react-router-dom';


const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-16 bg-black/60 backdrop-blur-3xl text-neutral-400 fixed bottom-0 w-full z-50'>
      <div className='flex items-center justify-between h-full'>
        {Mobilenavigation.map( (nav , index) => {
            return (
              <NavLink
                key={nav.label + "Mobilenavigation"}
                to={nav.href}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-col items-center px-3 h-full justify-center text-white"
                    : "flex flex-col items-center px-3 h-full justify-center text-neutral-400"
                }
              >
                <div className="text-2xl">{nav.icon}</div>
                <p className="text-sm">{nav.label}</p>
              </NavLink>
            );
        })}
      </div>
    </section>
  )
}

export default MobileNavigation
