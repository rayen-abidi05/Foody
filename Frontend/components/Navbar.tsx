import Link from 'next/link'
import homeCss from '../app/homeCss.module.css';

export default function Navbar() {
  return (
    <div className={`flex justify-between h-[80px] items-center w-full px-4 md:px-10 ${homeCss.navbar}`}>
      
      
      <div className="flex text-2xl shrink-0">
        <h1>Foody</h1>
      </div>

      
      <div className={`${homeCss.navbarLinks} hidden md:flex gap-4 justify-center items-center`}>
        <Link href="/" className="flex justify-center items-center w-24 h-10 text-xl hover:bg-amber-100 hover:text-emerald-700 rounded-lg">
          Home
        </Link>
        <Link href="/Recipes?cat=all" className="flex justify-center items-center w-24 h-10 text-xl hover:bg-amber-100 hover:text-emerald-700 rounded-lg">
          Recipes
        </Link>
        <Link href="/about" className="flex justify-center items-center w-24 h-10 text-xl hover:bg-amber-100 hover:text-emerald-700 rounded-lg">
          About us
        </Link>
      </div>

      {/* Auth Buttons — hidden on mobile */}
      <div className="hidden md:flex gap-5 text-lg shrink-0">
        <Link href="/signup"><button
        className="px-4 py-2 w-40 bg-transparent drop-shadow-lg border border-gray-500 rounded-lg hover:drop-shadow-xs hover:border-white hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"> 
          Sign in
          </button>
        </Link>
        <Link href="/login">
        <button className="px-4 py-2 w-40 bg-emerald-700 rounded-lg hover:text-emerald-700 hover:bg-emerald-100 hover:border-emerald-900 cursor-pointer hover:-translate-y-1 duration-500">
          Login
        </button>
        </Link>
      </div>

      
      <button className="md:hidden flex flex-col gap-1.5 p-2">
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

    </div>
  );
}