'use client'

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex gap-6 p-4 bg-gray-800 text-white">
            <Link href= "/">Home</Link>
            <Link href= "/signup">Signup</Link>
            <Link href= "/login">Login</Link>
        </nav>
        );
    }