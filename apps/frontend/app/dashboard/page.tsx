"use client"
import { Appbar } from "@/components/Appbar";
import { Button } from "@/components/Button";
import { fonts } from "@/lib/fonts";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
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
            image: string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            image: string
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
    const router = useRouter();

    return <div>
        <Appbar />
        <div className="flex pt-8 justify-center">
            <div className={` ${fonts.averia_libre.className} max-w-screen-lg w-full`}>
                <div className="flex  justify-between pr-10">
                    <div className="text-2xl font-bold">
                        My zaps
                    </div>
                    <Button children="Create" variant="darkButton" className={` ${fonts.gruppo.className}  hover:bg-green-200/20`} onClick={() => {
                        router.push("/zap/create");
                    }}/>
                </div>
            </div>

        </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return <div className={`${fonts.averia_libre.className} pt-10 max-w-screen-lg w-full`}>
        <table className="w-full" id="zap-table">
            <thead>
                <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Created At</th>
                    <th className="text-left py-3 px-4">Webhook URL</th>
                    <th className="text-left py-3 px-4">Go</th>
                </tr>
            </thead>
            <tbody>
                {zaps.map(z => <tr className="border-b border-white/20 hover:bg-white/5" key={z.id}>
                    <td className="py-7 px-4 flex gap-3"><img src={z.trigger.type.image} width={20} height={20} /> {z.actions.map(x => <img src={x.type.image} width={20} height={20} key={x.id} />)}</td>
                   
                    <td className="py-4 px-4">{z.id}</td>
                    <td className="py-4 px-4">Nov 13, 2023</td>
                    <td className="py-4 px-4 max-w-sm break-all">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</td>
                    <td className="py-4 px-4"><Button variant="secondaryBlack" onClick={() => {
                        router.push("/zap/" + z.id)
                    }}>Go</Button></td>
                </tr>
                )}
            </tbody>
        </table>
    </div>
}
