"use client"
import { Appbar } from "@/components/Appbar";
import { fonts } from "@/lib/fonts";
import '@xyflow/react/dist/style.css'
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, ReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Model } from "@/components/Model";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Trigger' }, style: { background: "#0000", color: "ffff", border: '1px solid #ffff', borderRadius: 5 } },
];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/fluxo/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTriggers))

        axios.get(`${BACKEND_URL}/fluxo/api/v1/action/available`)
            .then(x => setAvailableActions(x.data.availableActions))
    }, [])

    return { availableActions, availableTriggers }
}

export default function () {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectTrigger, setSelectedTrigger] = useState<{ id: string, name: string } | null>(null);
    const [selectActions, setSelectedActions] = useState<{ availableactionId: string, availableTriggersName: string | undefined }[]>([]);
    const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const addNode = () => {
        const lastNode = nodes[nodes.length - 1];

        const position = lastNode ? { x: 0, y: lastNode.position.y + 70 } : { x: 0, y: 70 }

        const newNodeId = crypto.randomUUID();
        // const edge = nodes[nodes.edge]

        const newNode = {
            id: newNodeId,
            position,
            data: { label: `${nodes.length}. Actions` },
            style: { background: "#0000", color: "ffff", border: '1px solid #ffff', borderRadius: 5 },
        }

        setNodes((nds) => [
            ...nds,
            newNode
        ]);

        if (lastNode) {
            setEdges((edg) => [
                ...edg,
                {
                    id: `${lastNode.id}-${newNode.id}`,
                    source: lastNode.id,
                    target: newNode.id,
                }
            ]);
        }
    };


    const onBoxClick = (_: any, node: any) => {
        setSelectedNodeId(node.id);
        const index = nodes.findIndex(n => n.id === node.id);
        setSelectedModelIndex(index);
    }
    // useEffect(() => {
    //     console.log("Selected model index:", selectedModelIndex);
    // }, [selectedModelIndex]);

    const closeModel = () => {
        setSelectedModelIndex(null);
    };

    const publish = () => {

    }


    return <div className={`${fonts.averia_libre.className} h-screen flex flex-col`}>
        <Appbar />
        <div className="flex-1">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                onNodeClick={onBoxClick}
            >
                <Background />
                <div className="gap-10">
                    <div
                        onClick={addNode}
                        className="absolute hover:bg-gray-300 z-10 m-4 bg-white text-black px-3 py-1 rounded cursor-pointer"
                    >+ Node</div>

                    {/* <button
                        onClick={publish}
                        className=" z-10 m-4 bg-white text-black px-3 py-1 rounded cursor-pointer fixed right-4"
                    >Publish</button> */}
                    <Button onClick={async () => {
                        // TODO: HERE WE NEED TO POST THE REQ 
                        if (selectTrigger === null) return;
                        if (!selectTrigger.id) return;

                        const response = await axios.post(`${BACKEND_URL}/fluxo/api/v1/zap`, {
                            "availableTriggerId": selectTrigger?.id,
                            "triggerMetadata": {},
                            "actions": selectActions.map(actions => ({
                                availableactionId: actions.availableactionId,
                                actionMetadata: {}
                            }))
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })

                        router.push("/dashboard");

                    }} children="Publish" variant="darkButton" className={`text-white/90 border-2 backdrop-blur-sm z-10  hover:bg-green-200/20 right-4 fixed m-4`} />
                </div>

            </ReactFlow>
        </div>

        {selectedModelIndex !== null && <div> <Model onSelect={(props: null | { name: string, id: string }) => {
            if (props === null) {
                setSelectedModelIndex(null);
                return;
            } else if (selectedModelIndex === 0) {
                setSelectedTrigger({
                    id: props.id,
                    name: props.name
                })

                setNodes((nds) =>
                    nds.map(node =>
                        node.id === selectedNodeId
                            ? {
                                ...node,
                                data: { label: props.name }
                            }
                            :
                            node
                    )
                );
                closeModel();
            } else {
                setSelectedActions(a => {
                    let newActions = [...a];
                    newActions[selectedModelIndex - 1] = {
                        availableactionId: props.id,
                        availableTriggersName: selectTrigger?.name
                    }
                    return newActions;
                })
                setNodes((nds) => nds.map(node => node.id === selectedNodeId ? { ...node, data: { label: props.name } } : node))
                closeModel()
            }
        }} availableItems={selectedModelIndex === 0 ? availableTriggers : availableActions} index={selectedModelIndex} onClose={closeModel} /> </div>}
    </div>
}
