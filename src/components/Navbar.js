import { useContext, Fragment } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { MovieContext } from '../context/MovieContext'
import { Disclosure, Menu, Transition } from "@headlessui/react";
import avatar from "../assets/icons/avatar.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { currentUser, logOut } = useContext(AuthContext)
  const { search, setSearch, handleSubmit } = useContext(MovieContext)

  return (

    <div>
      <Disclosure
        as="nav"
        className="bg-black py-3 fixed top-0 z-20 w-full flex flex-row flex-wrap items-center justify-between">
        <div className='ml-4'>
          <Link className="pr-2 text-2xl font-semibold text-blue-800" to="/">
            S-Movie App
          </Link>
        </div>
        <div className="md:mr-8">
          <div className="relative flex flex-row flex-wrap items-center">
            <div>
              <form
                onSubmit={handleSubmit}
              >
                <input
                  className='w-20 md:w-[200px] h-10 rounded-sm border-2 text-black'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search for movies'
                />
                <button
                  className='ml-4 w-20 h-10 rounded-sm border-2 text-white hover:text-black hover:bg-white ease-in-out duration-300'
                  type='submit'
                >
                  Search
                </button>
              </form>
            </div>
            <div className="flex items-center h-[100%] ">
              {currentUser && (
                <h5 className="mx-2 capitalize h-[100%] text-white flex justify-center items-center flex-wrap">{currentUser?.displayName}</h5>
              )}
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={currentUser?.photoURL || avatar}
                      alt="user"
                      referrerPolicy="no-referrer"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!currentUser ?
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/register"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Register
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                      :
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                              onClick={() => logOut()}
                            >
                              Log out
                            </span>
                          )}
                        </Menu.Item>
                      </>
                    }
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
      <div className="h-[55px]"></div>
    </div>


  )
}

export default Navbar