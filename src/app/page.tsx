"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black1 p-4">
      <h1 className="text-7xl font-bold mb-8 text-white">Welcome to Shinsta!</h1>
      <div className="space-y-9 space-x-7">
        <button
          onClick={() => router.push('/login')}
          className="w-64 py-3 bg-fireOrange hover:bg-fireOrange/90 text-white rounded-lg font-medium"
        >
          Log In
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="w-64 py-3 bg-fireOrange hover:bg-fireOrange/90 text-white rounded-lg font-medium"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}