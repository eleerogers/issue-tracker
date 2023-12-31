"use client"

import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes'


const NavBar = () => {
  const currentPath = usePathname();
  const { status, data:session } = useSession()
  
  return (
    <nav className='px-5 mb-5 space-x-6 border-b py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
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
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Log In</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar