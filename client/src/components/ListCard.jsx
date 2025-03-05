import { useDroppable } from "@dnd-kit/core";
import CardItem from "./CardItem";
import { useState } from "react";
import AddCardForm from "./AddCardForm";

export default function ListCard(props) {
    const { el, fetchList } = props;
    const { setNodeRef, isOver } = useDroppable({
        id: el.id,
    });

    const [cards, setCards] = useState(el.Cards || []);

    const handleCardAdded = (newCard) => {
        setCards([...cards, newCard]);
    };

    return (
        <div
            ref={setNodeRef}
            className={`
          w-64 min-h-96 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-5
          ${isOver ? "border-green-600 border-8" : ""}
        
        `}
        >
            <h5 className="text-xl font-bold">{el.name}</h5>
            <p className="text-sm opacity-80 mt-1">Board ID: {el.boardId}</p>

            <div>
                {el.Cards.map((card) => {
                    return <CardItem key={card.id} item={card} />;
                })}
            </div>
            <AddCardForm listId={el.id} fetchList={fetchList} onCardAdded={handleCardAdded} />
        </div>
    );
}
