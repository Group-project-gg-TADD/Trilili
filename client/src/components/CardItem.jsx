import { useDraggable } from "@dnd-kit/core";
import { Edit2 } from "react-feather";
import { CSS } from "@dnd-kit/utilities";

const CardItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="item flex justify-between items-center bg-amber-200 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500"
    >
      <span>{item.title}</span>
      <button className="hover:bg-gray-600 p-1 rounded-sm">
        <Edit2 size={16} />
      </button>
    </div>
  );
};

export default CardItem;
