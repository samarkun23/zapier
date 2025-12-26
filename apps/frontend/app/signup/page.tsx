"use client"

import { Appbar } from "@/components/Appbar"
import { fonts } from "@/lib/fonts"

export default function Signup() {
    return <div>
        <Appbar />

        <div className="mt-10 flex justify-center">

            <div className={`mt-30 max-w-2xl flex justify-center ${fonts.gruppo.className} text-4xl text-white animate-pulse`}>
                <h2 className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">Join millions worldwide who automate their work using Fluxo</h2>
            </div>
            <div className={` m-20 flex items-center justify-center ${fonts.averia_libre.className}`}>
                <div className="relative">
                    <div className="absolute inset-[1px] bg-white/50 blur-xl "></div>
                    {/* White Glow Behind Card */}

                    {/* Glass Card */}
                    <div className="relative w-[400px] rounded-3xl 
                    bg-white/15 
                    border border-white/30 
                    shadow-2xl p-6">

                        <h2 className="text-black text-xl font-semibold text-center mb-4">
                            Sign Up
                        </h2>

                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full mb-3 px-4 py-2 rounded-lg 
                        bg-white/20 text-black placeholder-black 
                        border border-black focus:outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-3 px-4 py-2 rounded-lg 
                        bg-white/20 text-black placeholder-black 
                        border border-black focus:outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-4 px-4 py-2 rounded-lg 
                        bg-white/20 text-black placeholder-black 
                        border border-black focus:outline-none"
                        />

                        <button className="w-full bg-white text-black rounded-xl py-2 font-medium">
                            Create Account
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}
