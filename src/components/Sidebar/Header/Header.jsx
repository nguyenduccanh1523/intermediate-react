import React from 'react'

const Header = () => {
  return (
    <div>
      <nav className='flex items-center justify-between p-4 bg-blue-500 text-white'>
        <h1 className="text-2xl font-bold">My Application Intermediate</h1>
        <ul className="flex space-x-4">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
