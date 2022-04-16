import Link from 'next/link'
import Footer from './Footer'

export default function Header(props) {
  return (
    <>
      <div className='flex justify-evenly bg-gray-800 text-gray-200 h-14 items-center text-2xl font-bold'>
        <Link
          href='/nasa-photo-of-the-day'
          className='font-extralight text-4xl text-neutral-800'
        >
          Nasa Photo of the Day
        </Link>
      </div>
      <div className='bg-gray-900 text-gray-400'>{props.children}</div>
      <Footer />
    </>
  )
}
