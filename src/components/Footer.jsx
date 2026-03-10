import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-sm text-center bg-neutral-600/35 text-neutral-400 py-3'>
      <div className="flex items-center justify-center gap-5">
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>

      <p>Created By the TVR Entertainment</p>
    </footer>
  )
}

export default Footer
