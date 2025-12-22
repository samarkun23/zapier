"use client"
import { Button } from './Button'
import { fonts } from '@/lib/fonts'

export function Appbar() {
    return (
        <div className="flex border-b-white justify-between">

            <div className={fonts.gruppo.className}>
                Zapier
            </div>

            <div>
                <div>
                    Contact Sales
                </div>

                <div>
                    Login
                </div>

                <div>
                    Login
                </div>
            </div>
            <Button children="I am button" variant='nav' className='' onClick={() => alert('hy')} ></Button>
        </div>
    )
}