import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import Image from 'next/image';
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { DraggableItem } from '~/types/draggableItem';

interface Props extends DraggableItem {};

export function Draggable(props: Props): ReactElement {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as CSSProperties : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`bg-slate-200 rounded-sm border-t-neutral-300 border h-6 w-6 text-center`}>
      <Image priority src={props.data?.imageSrc} alt={props.data?.imageAlt}/>
    </div>
  );
}
