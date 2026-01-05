//shortcut = rafce

import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  // const user = false;
  const { user } = useSelector(store => store.auth);
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/jobs">Jobs</Link></li>
            <li> <Link to="/browse">Browse</Link></li>
          </ul>

          {
            !user ? (
              <div className='flex flex-wrap items-center gap-2 md:flex-row'>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#360983]'>Signup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className='flex gap-2 space-y-2'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>Shweta Singh</h4>
                      <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                  </div>

                  <div className='flex flex-col my-2 text-gray-600 space-y-2'>

                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="Link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button variant="Link">Logout</Button>
                    </div>

                  </div>

                </PopoverContent>
              </Popover>
            )
          }
        </div >
      </div >
    </div >
  )
}

export default Navbar