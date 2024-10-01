import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

import logo from "../assets/logo1e.png"

function Navbar() {

    return (
        <header className="shadow  z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            className="mr-3 h-8"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2 gap-4">
                        <Link
                            to="/tracking"
                            className="hover:border-b-2 hover:border-purple-500"
                        >
                            Tracking
                        </Link>
                        <Link
                            to="/login"
                            
                        >
                            <Button className="border-2 border-purple-400 bg-white text-purple-800 hover:text-white hover:bg-purple-400 px-2 rounded-md">
                            Log Out
                            </Button>
                            
                        </Link>

                    </div>


                </div>
            </nav>
        </header>
    )
}

export default Navbar