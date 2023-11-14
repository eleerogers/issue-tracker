import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'


const NavBar = () => {
  return (
    <nav className='flex items-center px-5 mb-5 space-x-6 border-b h-14'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        <li><Link className='transition-colors text-zinc-500 hover:text-zinc-800' href="/">Dashboard</Link></li>
        <li><Link className='transition-colors text-zinc-500 hover:text-zinc-800' href="/issues">Issues</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar