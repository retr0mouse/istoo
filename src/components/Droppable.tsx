import React, { ReactElement } from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable({id, children}: {id: string, children: ReactElement | ReactElement[] | null}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id
  });
  
  return (
    <div ref={setNodeRef} className={`${isOver ? 'bg-green-400' : undefined} h-12 w-12 p-2 border border-slate-400 flex flex-col justify-center items-center`}>
      {children}
    </div>
  );
}