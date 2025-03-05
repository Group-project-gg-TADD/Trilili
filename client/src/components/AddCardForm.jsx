import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";

export default function AddCardForm({ listId, onCardAdded, fetchList }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: `/card/${listId}`,
                data: {
                    title,
                    description
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })

            const newCard = data
            onCardAdded(newCard);
            setTitle("");
            setDescription("");

            fetchList();

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <input
                type="text"
                placeholder="Card Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-700">
                Add Card
            </button>
        </form>
    );
}
