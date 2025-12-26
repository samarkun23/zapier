"use client"
import { useRouter } from 'next/navigation'
import { Button } from './Button'
import { fonts } from '@/lib/fonts'

export function Appbar() {
    const router = useRouter();
    return (
        <div className="flex justify-between m-5">

            <div className={`${fonts.gruppo.className} text-4xl ml-5`}>
                Fluxo
            </div>

            <div className={`gap-8  flex items-center ${fonts.averia_libre.className}`}>
                <Button size='default' variant='nav'  >Contact Sales</Button>
                <Button onClick={() => { router.push('/login') }} size='default' variant='nav'>Login</Button>
                <Button onClick={() => { router.push("/signup")}} size='default' variant='nav'>Sign Up</Button>
            </div>
        </div>
    )
}