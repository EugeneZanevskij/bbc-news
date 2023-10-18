import React from 'react';
import logo from '../assets/logo.png';
import {AiOutlineUserAdd} from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';

const Navbar = ({setQuery, setSearch}) => {
  const navigate = useNavigate();
  const menu = [
    { title: 'Home', query: 'All' },
    { title: 'Science' },
    { title: 'Sport' },
    { title: 'Food' },
    { title: 'Worklife' },
    { title: 'Travel' },
    { title: 'Future' },
    { title: 'Culture' },
  ];

  const logout = async () => {
    try {
      await signOut(auth);
      console.log(auth.currentUser)
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  console.log(auth.currentUser)

  return (
    <nav className='flex justify-between px-2 bg-black text-white w-full fixed'>
      <div className="flex">
        <img src={logo} alt="logo" className='h-12 w-fit'/>
        {auth.currentUser ? 
        <button onClick={logout} className='flex items-center hover:border-b-2 w-16'>
          Logout
        </button>
        : <Link to='/signin'>
          <button className='flex items-center hover:border-b-2 w-24 h-full'>
            <AiOutlineUserAdd className='text-3xl'/>
            Sign in
          </button>
        </Link>}
      </div>
      <ul className='flex items-center gap-2'>
        {menu.map((item) => (
          <li onClick={() => setQuery(item.query || item.title)} key={item.title} className='font-semibold text-sm'>
            {item.title}
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <AiOutlineSearch className='text-3xl'/>
        <input onChange={(e) => setSearch(e.target.value)} className='bg-black' placeholder='Search BBC'/>
      </div>
    </nav>
  )
}

export default Navbar