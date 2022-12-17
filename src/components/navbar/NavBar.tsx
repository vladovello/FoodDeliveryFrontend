import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileIcon from 'components/icons/ProfileIcon'
import Dropdown from 'components/primitives/dropdown/Dropdown'
import DropdownLink from 'components/primitives/dropdown/DropdownLink'
import TokenEvents from 'events/TokenEvents'
import { Form, redirect, useNavigate } from 'react-router-dom'
import {
  cartUrl,
  dishesUrl,
  loginUrl,
  logoutUrl,
  ordersUrl,
  profileGetUrl,
  registerUrl,
} from 'routes/Routes'
import AuthService from 'services/AuthService'
import TokenService from 'services/TokenService'
import useAuth from 'utils/hooks/UseAuth'
import NavBarLink from './NavBarLink'

const items = [
  { name: 'Меню', to: dishesUrl, current: true },
  { name: 'Заказы', to: ordersUrl, current: false },
  { name: 'Корзина', to: cartUrl, current: false },
]

export default function NavBar() {
  const isAuthorized = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    await AuthService.logout()
    await TokenService.saveToken(null)
    TokenEvents.dispatch(TokenEvents.events.expired, 'User logged out')
    return navigate(dishesUrl)
  }

  return (
    <header className="w-screen fixed z-50 top-0 left-0">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* // TODO: break down into components */}
                <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                  <div className="flex flex-shrink-0  p-2 items-center">
                    <span className="block font-bold text-white lg:hidden">Кушац</span>
                    <span className="hidden font-bold text-white lg:block">Delivery.Кушац</span>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:items-center">
                    <div className="flex space-x-4">
                      {items.map((item) => (
                        <NavBarLink key={item.name} to={item.to}>
                          {item.name}
                        </NavBarLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                  <Menu as="div" className="relative ml-3">
                    {isAuthorized ? (
                      // Authorized
                      <>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          {/* TODO: svg looks sharp. Do smth with it */}
                          <ProfileIcon className="h-8 w-8 text-gray-300" />
                        </Menu.Button>
                        <Dropdown>
                          <DropdownLink to={profileGetUrl}>Профиль</DropdownLink>
                          <DropdownLink to={logoutUrl} onClick={logout}>
                            Выйти
                          </DropdownLink>
                        </Dropdown>
                      </>
                    ) : (
                      // Unauthorized
                      <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
                        <NavBarLink to={loginUrl}>Войти</NavBarLink>
                        <span className="h-6 w-px bg-gray-400" aria-hidden="true"></span>
                        <NavBarLink to={registerUrl}>Создать аккаунт</NavBarLink>
                      </div>
                    )}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div>
                <div
                  className={
                    isAuthorized
                      ? 'space-y-1 px-2 pt-2 pb-3'
                      : 'space-y-1 px-2 py-2 border-b border-gray-300'
                  }
                >
                  {items.map((item) => (
                    <NavBarLink key={item.name} to={item.to}>
                      <Disclosure.Button
                        as="span"
                        className="block rounded-md text-base font-medium"
                      >
                        {item.name}
                      </Disclosure.Button>
                    </NavBarLink>
                  ))}
                </div>

                {!isAuthorized && (
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    <NavBarLink to={loginUrl}>
                      <Disclosure.Button
                        as="span"
                        className="block rounded-md text-base font-medium"
                      >
                        Войти
                      </Disclosure.Button>
                    </NavBarLink>
                    <NavBarLink to={registerUrl}>
                      <Disclosure.Button
                        as="span"
                        className="block rounded-md text-base font-medium"
                      >
                        Создать аккаунт
                      </Disclosure.Button>
                    </NavBarLink>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}
