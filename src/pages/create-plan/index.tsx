import { UniqueIdentifier, DndContext, DragEndEvent } from "@dnd-kit/core";
import Head from "next/head";
import { useState } from "react";
import { Draggable } from "~/components/Draggable";
import { Droppable } from "~/components/Droppable";
import { DraggableItem } from "~/types/draggableItem";
import TableImage from '~/images/Table.svg'
import { v4 as uuidv4 } from 'uuid';


export default function CreatePlan() {
    const containers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Q', 'R', 'T', 'Y', 'I', 'O', 'P'];
    const DRAGGABLESDATAS = [{ imageSrc: TableImage, imageAlt: "A Picture of a table." }];
    const [draggablesInContainers, setDraggablesInContainers] = useState<Map<UniqueIdentifier, DraggableItem>>(new Map()
        // 'EF': {2f5062bc-a0f6-4954-b66b-d5337fb3e2b1, {'./icons/Table.svg', "A Picture of a table."}},
        // 'AB': {1f5064ab-a0f6-5456-b66b-d5337fb3e2b1, {'./icons/Chair.svg', "A Picture of a chair."}}
    );
    const [uniqueDraggables, setUniqueDraggables] = useState<Map<UniqueIdentifier, string>>(new Map()); // 2f5062bc-a0f6-4954-b66b-d5337fb3e2b1: EF'

    return (
        <>
            <Head>
                <title>Istoo - Create Plan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
                <h1 className="mb-24 text-center text-3xl font-extrabold tracking-tight text-slate-700 sm:text-5xl">
                    Create a plan of your restaurant!
                </h1>
                <input type="text" placeholder="Restaurant title" className="h-12 p-2 rounded-sm" />
            </main>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='p-2'>{DRAGGABLESDATAS.map((draggableData) => <Draggable data={draggableData} id={uuidv4()}></Draggable>)}</div>
                <div className='flex'>
                    {containers.map((firstKeySet) => (
                        <div key={firstKeySet} className='flex flex-col'>
                            {containers.map((secondKeySet) => (
                                <Droppable key={firstKeySet + secondKeySet} id={firstKeySet + secondKeySet}>
                                    {getDraggableOnDroppable(firstKeySet + secondKeySet)}
                                </Droppable>
                            ))}
                        </div>
                    ))}
                </div>
            </DndContext>
        </>

    );
    function getDraggableOnDroppable(droppableKey: string) {
        const currentDraggable = draggablesInContainers.get(droppableKey);
        return currentDraggable ? <Draggable data={currentDraggable.data} id={currentDraggable.id} /> : null;
    }

    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;
        // no data = no render :)
        if (!active?.data.current) {
            return;
        }
        const draggableData = active?.id ? active.data.current as {
            imageSrc: string,
            imageAlt: string
        }: null;
        const containerId = over?.id ? over.id as string : null;   // 'EF'
        const draggableId = active?.id ? active.id as string : null; // '2f5062bc-a0f6-4954-b66b-d5337fb3e2b1'
        if (containerId && draggableId) {
            if (!getDraggableOnDroppable(containerId)) { // 'EF': {2f5062bc-a0f6-4954-b66b-d5337fb3e2b1, 1}
                setDraggablesInContainers(new Map(draggablesInContainers?.set(containerId, { id: draggableId, data: draggableData!})));  // 'EF': {2f5062bc-a0f6-4954-b66b-d5337fb3e2b1, 1}
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