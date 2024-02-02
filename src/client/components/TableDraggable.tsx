import { useDraggable } from '@dnd-kit/core';
import Image from 'next/image';
import { type CSSProperties, type ReactElement } from 'react';
import { type DraggableItem } from 'types/draggableItem';
import TableImage from '../../images/Table.svg';

type Props = DraggableItem;

type Data = {
  imageSrc: string;
  imageAlt: string;
};

export function TableDraggable(props: Props): ReactElement {
  const data: Data = { imageSrc: TableImage as string, imageAlt: "A Picture of a table." };
  const id = props.id;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } as CSSProperties
    : undefined;

  return (
    <div
      key={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes }
      className={`bg-slate-200 rounded-sm border-t-neutral-300 border h-6 w-6 text-center`}
    >
      <Image priority src={data.imageSrc} alt={data.imageAlt} />
    </div>
  );
}
