import { useDroppable } from "@dnd-kit/core";
import CardItem from "./CardItem";
import { useState, useEffect } from "react";
import AddCardForm from "./AddCardForm";

export default function ListCard(props) {
    const { el, fetchList } = props;
    const { setNodeRef, isOver } = useDroppable({
        id: el.id,
    });

    const [cards, setCards] = useState(el.Cards || []);
    const [showAddCardModal, setShowAddCardModal] = useState(false);

    // const handleCardAdded = (newCard) => {
    //     setCards([...cards, newCard]);
    // };

    useEffect(() => {
        setCards(el.Cards || []); // Update cards setiap kali ada perubahan data
    }, [el.Cards]);


    // useEffect(() => {
    //     setCards(el.Cards || []); 
    //   }, [el.Cards]);

    const handleCardAdded = (newCard) => {
        setCards((prevCards) => [...prevCards, newCard]);
        setShowAddCardModal(false);
    };

    //   const handleCardAdded = (newCard) => {
    //     setCards((prevCards) => [...prevCards, newCard]); 
    //   };

    return (
        <div ref={setNodeRef} className="bg-[#BDC3C7] w-72 min-h-96 rounded-lg shadow-lg p-4">
            <h5 className="text-lg font-bold text-[#2C3E50]">{el.name}</h5>

            <div className="mt-3">
                {cards.map((card) => (
                    <CardItem key={card.id} item={card} />
                ))}
            </div>

            <button
                onClick={() => setShowAddCardModal(true)}
                className="w-full mt-3 bg-[#2C3E50] text-white p-2 rounded-lg hover:bg-[#85C1E9] hover:text-[#2C3E50] transition"
            >
                + Add Card
            </button>

            {showAddCardModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        {/* Title diposisikan di tengah */}
                        <h2 className="text-lg font-bold text-[#2C3E50] mb-4 text-center">Create Card</h2>

                        <AddCardForm listId={el.id} fetchList={fetchList} onCardAdded={handleCardAdded} />

                        {/* Button Group dengan Jarak */}
                        <div className="flex justify-between mt-6 space-x-3">
                            <button
                                onClick={() => setShowAddCardModal(false)}
                                className="w-1/2 px-4 py-2 border border-[#2C3E50] text-[#2C3E50] rounded-lg hover:bg-[#2C3E50] hover:text-white transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => document.getElementById("addCardSubmit").click()} // Trigger form submit
                                className="w-1/2 px-4 py-2 bg-[#85C1E9] text-[#2C3E50] rounded-lg hover:bg-[#2C3E50] hover:text-white transition"
                            >
                                Add Card
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );

    // return (
    //     <div ref={setNodeRef} className="bg-[#BDC3C7] w-72 min-h-96 rounded-lg shadow-lg p-4">
    //         <h5 className="text-lg font-bold text-[#2C3E50]">{el.name}</h5>

    //         <div className="mt-3">
    //             {cards.map((card) => (
    //                 <CardItem key={card.id} item={card} />
    //             ))}
    //         </div>

    //         <AddCardForm listId={el.id} fetchList={fetchList} onCardAdded={handleCardAdded} />
    //     </div>
    // );


    // return (
    //     <div
    //         ref={setNodeRef}
    //         className={`
    //       w-64 min-h-96 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-5
    //       ${isOver ? "border-green-600 border-8" : ""}

    //     `}
    //     >
    //         <h5 className="text-xl font-bold">{el.name}</h5>
    //         <p className="text-sm opacity-80 mt-1">Board ID: {el.boardId}</p>

    //         <div>
    //             {el.Cards.map((card) => {
    //                 return <CardItem key={card.id} item={card} />;
    //             })}
    //         </div>
    //         <AddCardForm listId={el.id} fetchList={fetchList} onCardAdded={handleCardAdded} />
    //     </div>
    // );
}
