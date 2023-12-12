import React from 'react'

const HomeSectionCard = () => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg
     overflow-hidden w-[15rem] mx-3'>

        <div className='h-[13rem] w-[10rem]'>
        <img className='object-cover object-top w-full h-full' src="https://rukminim1.flixcart.com/image/612/612/l0wrafk0/dress/l/2/o/3xl-m2s13003-peach-madame-original-imagchhhwbypcann.jpeg?q=70" alt="mens kurta"/>
        </div>

        <div className='p-4'>
          <h3 className='text-lg font-medium text-gray-900'>my content</h3>
        </div>

    </div>
  )
}

export default HomeSectionCard