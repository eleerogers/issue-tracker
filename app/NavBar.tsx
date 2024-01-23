"use client"

import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'


const NavBar = () => {  
  return (
    <nav className='px-5 mb-5 space-x-6 border-b py-3'>
      <Container>
        <Flex justify='between' className='minHt32'>
          <Flex align='center' gap='3'>
            <Link href="/"><AiFillBug /></Link>
            <NavLinks />
          </Flex>
          <Flex align='center'>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className='flex space-x-6'>
      <li><Link className={classnames({
        'nav-link': true,
        '!text-zinc-900': currentPath === '/'
      })} href="/">Dashboard</Link></li>
      <li><Link className={classnames({
        'text-zinc-900': currentPath === '/issues/list',
        'text-zinc-500': currentPath !== '/issues/list',
        'hover:text-zinc-800 transition-colors': true
      })} href="/issues/list">Issues</Link></li>
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data:session } = useSession()

  if (status === 'loading') return <Skeleton width='3rem' />

  if (status === 'unauthenticated') return <Link className='nav-link' href='/api/auth/signin'>Log In</Link>

  return <Box>
    {status === 'authenticated' && (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">
              {session!.user!.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )}
  </Box>
}

export default NavBar