/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'

const AboutUsPoints = ({ tag, tittle, bg}) => {
  return (
    <div className="flex gap-3 zind2">
        <div>
            <span className={`text-[0.8rem] md:text-[1.5rem] lg:text-[1.2rem] 2xl:text-[1.5rem] p-2 rounded-full text-white ${bg} inline-block`}><IoMdCheckmark /></span>
        </div>
        <div>
            <h1  className="text-xl md:text-2xl lg:text-[1.35rem] font-semibold">{tag}</h1>
            <p className="max-w-[600px] text-gray-700 mt-1 text-sm md:text-base lg:text-sm 2xl:text-base">{tittle}</p>
        </div>
      </div>
  )
}

export default AboutUsPoints
