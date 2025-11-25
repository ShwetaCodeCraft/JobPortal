import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'   // fixed: single AvatarImage import

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Button className="p-1" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-7e22d4c04e6d781fc011fd09b2cc7ea3_screen.jpg?ts=1672287142"
              alt="company logo"
            />
          </Avatar>
        </Button>

        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ipsa sit velit dicta et.
        </p>
      </div>
    </div>
  )
}

export default Job
