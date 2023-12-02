import React from 'react'
import { LuChevronLeft } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

const BackButton = () => {
  return (
    <>
      <div className="container px-6 md:px-20 pt-16 dark:bg-slate-700">
          <NavLink to="/">
            <LuChevronLeft className="w-10 h-10 p-1 hover:bg-indigo-400 hover:text-white text-gray-900 rounded-full bg-gray-200 dark:bg-slate-500 font-bold hover:cursor-pointer dark:text-white" />
          </NavLink>
        </div>
    </>
  )
}

export default BackButton
