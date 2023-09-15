"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The shared header component.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggle");
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="text-center sm:text-left">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-black">
        <a className="text-3xl font-bold leading-none" href="/">
          <Image
            className="h-12 w-12"
            src="/latin.svg"
            alt="ChitChat Logo"
            width="12"
            height="12"
          />
        </a>
        <div className="">
          <button
            className="flex items-center text-white p-3"
            onClick={toggleMenu}
          >
            <svg
              className={`block h-4 w-4 fill-current ${
                menuOpen ? "hidden" : ""
              }`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="invisible sm:visible absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a className="text-sm text-white hover:text-red-500" href="/">
              Home
            </a>
          </li>
          {/* Add your other list items here */}
        </ul>
      </nav>
      <div className={`navbar-menu relative z-50 ${menuOpen ? "" : "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/6 max-w-sm py-6 px-6 bg-black border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <svg className="h-12" viewBox="0 0 10240 10240">
                {/* Your SVG path */}
              </svg>
            </a>
            <button className="navbar-close" onClick={toggleMenu}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-red-600 rounded"
                  href="/"
                >
                  Home Mobile
                </a>
              </li>
              {/* Add your other menu items here */}
            </ul>
          </div>
          <div className="mt-auto">
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
