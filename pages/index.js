import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

const currentDate = new Date()
const date = currentDate.getDate()
const month = currentDate.getMonth()
const year = currentDate.getFullYear()
const today = `${year}-${month + 1}-${date - 1}`

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const END_POINT = 'https://api.nasa.gov/planetary/apod?'

export default function NasaPhotoOfTheDay(props) {
  const [nasaData, setNasaData] = useState(props.data)
  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      const response = await fetch(
        `${END_POINT}date=${e.target.value}&api_key=${API_KEY}`
      )
      const data = await response.json()
      setNasaData(data)
    } else {
      e.preventDefault()
    }
  }

  const handleRandomSearch = async () => {
    const response = await fetch(`${END_POINT}count=1&api_key=${API_KEY}`)
    const data = await response.json()
    setNasaData(data[0])
  }
  return (
    <>
      <Head>
        <title>Photos Of The Day - NASA</title>
        <meta
          name='description'
          content='This web app shows nasa images using nasa free APIs- Integrated by Rajneesh Yadu; A full stack developer with nextjs framework hosted in vercel.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nasa
        data={nasaData}
        search={handleSearch}
        randomSearch={handleRandomSearch}
      />
    </>
  )
}

const Nasa = (props) => {
  const [isHd, setIsHd] = useState(false)
  const {
    data: { copyright, title, explanation, hdurl, media_type, url },
    search,
    randomSearch,
  } = props
  return (
    <div className={`flex-col flex ${!isHd && 'lg:flex-row'} p-2`}>
      <div
        className={`flex gap-2 justify-between ${!isHd && 'lg:hidden'} h-auto`}
      >
        <input
          type='date'
          className='border-black border-2 p-2  bg-gray-400 text-gray-900 w-full text-xs basis-1/2'
          onKeyPress={(e) => search(e)}
          min='1995-06-16'
          max={`${year}-${month.toString().length === 1 && 0}${month + 1}-${
            date - 1
          }`}
        ></input>
        <button
          onClick={() => setIsHd((p) => !p)}
          className='border-black border-2 p-2  bg-gray-400 text-gray-900 w-64 text-xs basis-1/4'
        >
          {isHd ? 'View Basic' : 'View HD'}
        </button>
        <button
          onClick={randomSearch}
          className='border-black border-2 p-2  bg-gray-400 text-gray-900 w-auto text-xs basis-1/4 text-center'
        >
          Random
        </button>
      </div>
      <div className={`w-full ${!isHd && 'lg:w-4/5'} p-2`}>
        <Image
          className='z-0'
          src={isHd ? hdurl : url}
          alt='image not exist'
          layout='responsive'
          sizes='60vw'
          width={100}
          height={isHd ? 100 : 62}
        />
      </div>
      <div className={`${!isHd && 'lg:w-1/3'} w-full p-2 flex-col flex gap-8`}>
        <div
          className={`gap-8 justify-between h-0 lg:h-auto flex ${
            !isHd && 'lg:visible'
          }  invisible`}
        >
          <input
            // onKeyDown={(e) => e.preventDefault()}
            type='date'
            className='border-black border-2 p-2  bg-gray-400 text-gray-900 w-64'
            onKeyPress={(e) => search(e)}
            min='1995-06-16'
            max={`${year}-${month.toString().length === 1 && 0}${month + 1}-${
              date - 1
            }`}
          ></input>
          <button
            onClick={() => setIsHd((p) => !p)}
            className='border-black border-2 p-2  bg-gray-400 text-gray-900 w-64'
          >
            {isHd ? 'View Basic' : 'View HD'}
          </button>
          <button
            onClick={randomSearch}
            className='border-black border-2 p-2  bg-gray-400 text-gray-900 w-64'
          >
            Random
          </button>
        </div>
        {/* <div> */}
        <h1 className='font-bold text-xl'>{title}</h1>
        <h3 className='text-md'>{explanation}</h3>
        {/* </div> */}
        <h5 className='text-xs italic'>
          {copyright && `Copyright - ${copyright}`}
        </h5>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch(
    `${END_POINT}date=${today}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  )
  const data = await response.json()
  return {
    props: {
      data,
    },
    revalidate: 86400,
  }
}
