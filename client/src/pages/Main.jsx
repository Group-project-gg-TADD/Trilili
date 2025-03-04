import React, { useContext } from 'react';
import { MoreHorizontal, UserPlus, Edit2 } from 'react-feather';
import { BoardContext } from '../context/BoardContext';
import { DndContext, useDraggable, useDroppable, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddList from '../components/AddList';
import CardAdd from '../components/CardAdd';
import Utils from '../utils/Utils';

const DraggableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
            <span>{item.title}</span>
            <button className='hover:bg-gray-600 p-1 rounded-sm'><Edit2 size={16} /></button>
        </div>
    );
};

const DroppableList = ({ list, index, onCardDrop }) => {
    const { setNodeRef } = useDroppable({
        id: list.id,
    });

    return (
        <div ref={setNodeRef} className='mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'>
            <div className="list-body">
                <div className='flex justify-between p-1'>
                    <span>{list.title}</span>
                    <button className='hover:bg-gray-500 p-1 rounded-sm'><MoreHorizontal size={16} /></button>
                </div>
                <SortableContext items={list.items.map(item => item.id)}>
                    <div className='py-1'>
                        {list.items.map((item) => (
                            <DraggableItem key={item.id} item={item} />
                        ))}
                    </div>
                </SortableContext>
                <CardAdd getcard={(e) => onCardDrop(e, index)} />
            </div>
        </div>
    );
};

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        let newList = [...bdata.list];
        const sourceList = newList.find(list => list.items.some(item => item.id === activeId));
        const destinationList = newList.find(list => list.id === overId);

        if (sourceList && destinationList) {
            const sourceIndex = sourceList.items.findIndex(item => item.id === activeId);
            const item = sourceList.items[sourceIndex];
            sourceList.items.splice(sourceIndex, 1);
            destinationList.items.push(item);
        }

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const cardData = (e, ind) => {
        let newList = [...bdata.list];
        newList[ind].items.push({ id: Utils.makeid(5), title: e });
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const listData = (e) => {
        let newList = [...bdata.list];
        newList.push({ id: Utils.makeid(5), title: e, items: [] });
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    return (
        <div className='flex flex-col w-full' style={{ backgroundColor: `${bdata.bgcolor}` }}>
            <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
                <h2 className='text-lg'>{bdata.name}</h2>
                <div className='flex items-center justify-center'>
                    <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center'>
                        <UserPlus size={16} className='mr-2' />
                        Share
                    </button>
                    <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'><MoreHorizontal size={16} /></button>
                </div>
            </div>
            <div className='flex flex-col w-full flex-grow relative'>
                <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
                    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
                        {bdata.list.map((list, ind) => (
                            <DroppableList key={list.id} list={list} index={ind} onCardDrop={cardData} />
                        ))}
                    </DndContext>
                    <AddList getlist={listData} />
                </div>
            </div>
        </div>
    );
};

export default Main;