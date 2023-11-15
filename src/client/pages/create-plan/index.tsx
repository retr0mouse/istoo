import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Droppable } from "../../components/Droppable";
import { TableDraggable } from "../../components/TableDraggable";
import { DraggableItem } from "../../types/draggableItem";


export default function CreatePlan() {
    const [xTiles, setXTiles] = useState(5);
    const [yTiles, setYTiles] = useState(10);

    const [draggablesInContainers, setDraggablesInContainers] = useState<Map<UniqueIdentifier, DraggableItem>>(new Map()
        // 'EF': {2f5062bc-a0f6-4954-b66b-d5337fb3e2b1, {'./icons/Table.svg', "A Picture of a table."}},
        // 'AB': {1f5064ab-a0f6-5456-b66b-d5337fb3e2b1, {'./icons/Chair.svg', "A Picture of a chair."}}
    );
    const [uniqueDraggables, setUniqueDraggables] = useState<Map<UniqueIdentifier, string>>(new Map()); // 2f5062bc-a0f6-4954-b66b-d5337fb3e2b1: EF'

    const [draggables, setDraggable] = useState([TableDraggable]);
    const [xSliderValue, setXSliderValue] = useState(10);
    const [ySliderValue, setYSliderValue] = useState(10);

    useEffect(() => {
        if (xSliderValue) {
            setXTiles(xSliderValue);
        }
    }, [xSliderValue])

    useEffect(() => {
        if (ySliderValue) {
            setYTiles(ySliderValue);
        }
    }, [ySliderValue])

    function HandleSliders(xValue?: number, yValue?: number) {
        if (xValue) {
            // console.log(value);
            setXSliderValue(xValue);
        }
        if (yValue) {
            // console.log(value);
            setYSliderValue(yValue);
        }
    }

    return (
        <>
            <Head>
                <title>Istoo - Create Plan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col items-center justify-center bg-slate-100">
                <h1 className="mb-24 text-center text-3xl font-extrabold tracking-tight text-slate-700 sm:text-5xl">
                    Create a plan of your restaurant!
                </h1>
                <input type="text" placeholder="Restaurant title" className="h-12 p-2 rounded-sm" />
                <div>
                    <input type="range" min={1} max={20} value={xSliderValue} onChange={(event) => HandleSliders(Number(event.target.value), 0)} />
                    <p>X tiles: {xSliderValue}</p>
                    <input type="range" min={1} max={20} value={ySliderValue} onChange={(event) => HandleSliders(0, Number(event.target.value))} />
                    <p>Y tiles: {ySliderValue}</p>
                </div>
            </main>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='p-2'>{draggables.map((Draggable) => <Draggable key={uuidv4()} id={uuidv4()} />)}</div>
                <div className='flex justify-center'>
                    {Array(xTiles).fill(true).map((_, xIndex) => (
                        <div className={`flex flex-col`} key={`row-${xIndex}`}>
                            {Array(yTiles).fill(true).map((_, yIndex) => {
                                const droppableId = `${xIndex}-${yIndex}`;
                                return (
                                    <Droppable id={droppableId} key={`droppable-${droppableId}`}>
                                        {getDraggableOnDroppable(droppableId)}
                                    </Droppable>
                                );
                            })}
                        </div>
                    ))}

                    {/* {containers.map((firstKeySet) => (
                        <div key={firstKeySet} className='flex flex-col'>
                            {containers.map((secondKeySet) => (
                                <Droppable key={firstKeySet + secondKeySet} id={firstKeySet + secondKeySet}>
                                    {getDraggableOnDroppable(firstKeySet + secondKeySet)}
                                </Droppable>
                            ))}
                        </div>
                    ))} */}
                </div>
            </DndContext>
        </>

    );
    function getDraggableOnDroppable(droppableKey: string) {
        const currentDraggable = draggablesInContainers.get(droppableKey);
        return currentDraggable ? <TableDraggable key={currentDraggable.id} id={currentDraggable.id} /> : null;
    }

    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;
        // no data = no render :)
        if (!active?.data.current) {
            return;
        }

        const containerId = over?.id ? over.id as string : null;   // 'EF'
        const draggableId = active?.id ? active.id as string : null; // '2f5062bc-a0f6-4954-b66b-d5337fb3e2b1'
        if (containerId && draggableId) {
            if (!getDraggableOnDroppable(containerId)) { // 'EF': {2f5062bc-a0f6-4954-b66b-d5337fb3e2b1, 1}
                setDraggablesInContainers(new Map(draggablesInContainers?.set(containerId, { id: draggableId })));  // 'EF': {2f5062bc-a0f6-4954-b66b-d5337fb3e2b1, 1}
                // here we should also delete the draggable from the previous position
                const previousDroppable = uniqueDraggables.get(draggableId);
                if (previousDroppable) {
                    draggablesInContainers?.delete(previousDroppable);
                    setDraggablesInContainers(new Map(draggablesInContainers));
                }
                setUniqueDraggables(new Map(uniqueDraggables.set(draggableId, containerId)));
            }
        }
    }
}
