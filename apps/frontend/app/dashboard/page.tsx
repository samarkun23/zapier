"use client"
import { Appbar } from "@/components/Appbar";
import { Button } from "@/components/Button";
import { fonts } from "@/lib/fonts";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        const res = axios.get(`${BACKEND_URL}/fluxo/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false);
            })
    }, [])

    return {
        loading, zaps
    }
}

export default function () {
    const { loading, zaps } = useZaps();

    return <div>
        <Appbar />
        <div className="flex pt-8 justify-center">
            <div className={` ${fonts.averia_libre.className} max-w-screen-lg w-full`}>
                <div className="flex  justify-between pr-10">
                    <div className="text-2xl font-bold">
                        My zaps
                    </div>
                    <Button children="Create" variant="darkButton" className={` ${fonts.gruppo.className}  hover:bg-green-200/20`} />
                </div>
            </div>

        </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return <div className={`${fonts.averia_libre.className} p-10 max-w-screen-lg w-full`}>
        <div className="flex ">
            <div className="flex-1">Name</div>
            <div className="flex-1">Running</div>
            <div className="flex-1">Go</div>
        </div>
        {zaps.map(z => <div className="flex border-b border-t py-4 border-white/20">
            <div> {z.trigger.type.name} {z.actions.map(x => x.type.name + " ")}</div>
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">Nov 13, 2023</div>
            <div className="flex-1"><Button variant="secondaryBlack" onClick={() => {
                router.push("/zap/" + z.id)
            }}>Go</Button></div>
        </div>
        )}
    </div>
}