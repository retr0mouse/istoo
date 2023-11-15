import { useDroppable } from '@dnd-kit/core';
import { ReactElement } from 'react';

export function Droppable({id, children}: {id: string, children: ReactElement | ReactElement[] | null}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id
  });
  
  return (
    <div key={id} ref={setNodeRef} className={`${id} ${isOver ? 'bg-green-400' : ""} h-12 w-12 p-2 border border-slate-400 flex flex-col justify-center items-center`}>
      {children}
    </div>
  );
}