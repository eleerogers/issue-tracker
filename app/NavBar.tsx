"use client"

import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'


const NavBar = () => {
  const currentPath = usePathname();
  
  return (
    <nav className='flex items-center px-5 mb-5 space-x-6 border-b h-14'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        <li><Link className={classnames({
          'text-zinc-900': currentPath === '/',
          'text-zinc-500': currentPath !== '/',
          'hover:text-zinc-800 transition-colors': true
        })} href="/">Dashboard</Link></li>
        <li><Link className={classnames({
          'text-zinc-900': currentPath === '/issues/list',
          'text-zinc-500': currentPath !== '/issues/list',
          'hover:text-zinc-800 transition-colors': true
        })} href="/issues/list">Issues</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar