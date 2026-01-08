"use client"
import { fonts } from "@/lib/fonts"
import { useRouter } from "next/navigation";

export function Hero() { 
    const router = useRouter();
    return (
        <div>
            <div className="flex justify-center">
                <div className={`font-sans text-6xl font-semibold text-center pt-14 max-w-4xl ${fonts.averia_libre.className}`}>
                    Automate Ai workflow by drap and drop Elements
                </div>
            </div>

            <div className="flex justify-center relative mt-32">
                <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div>
                    <img src="/LOGO1.svg" alt="My Picture" width={1000} />
                </div>

            </div>
            <div className={`${fonts.bungee_hairline.className} flex justify-center text-5xl mt-8 text-white/70`}>
                LEARN, FIX
            </div>
            <div className={`${fonts.averia_libre.className} flex justify-center text-md mt-16 text-white/40`}>
                FLUXO BRING AI TO A NEW ERA OF SOFTWARE DEVELOPMENT BEYOND THE CODE EDITOR
            </div>

            <div className={`${fonts.averia_libre.className} flex justify-center text-xl mt-14 `}>
                <div className="relative inline-block">
                    <div className="absolute -inset-[1px] bg-white blur-lg rounded-xl"></div>
                    <button className="bg-white text-black rounded-3xl p-2 relative border-gray-500 border-2" onClick={() => {
                        router.push("/dashboard");
                    }}>Req for Demo</button>
                </div>
            </div>
        </div>

    )
}