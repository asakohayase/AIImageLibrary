"use client";

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { SignedIn } from '@clerk/nextjs'
import { navLinks } from '@/constants'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
        <div className="flex size-full flex-col gap-4">
          <Link href="/" className="sidebar-logo">
            <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28}/>
          </Link>

          <nav className="sidebar-nav">
            <SignedIn>
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={clsx('sidebar-nav-element group', {
                    'bg-purple-gradient': isActive,
                    'text-white': isActive,
                    'text-grey-700': !isActive,
                  })}>
                    {link.label}
                  </li>
                )
              })}
            </SignedIn>

          </nav>
        </div>
    </aside>
  )
}

export default Sidebar