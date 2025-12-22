import {Gruppo} from 'next/font/google'
import { Averia_Libre } from 'next/font/google'

export const gruppo = Gruppo({subsets: ['latin'], weight: '400', variable: '--font-gruppo'})
export const averia_libre = Averia_Libre({subsets: ['latin'], weight: '400', variable: '--font-averia_libre'})

export const fonts = { gruppo , averia_libre}