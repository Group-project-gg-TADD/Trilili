import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

export default function ListCard(props) {
    const { el, key } = props

    const [cards, setCards] = useState([]);

    async function fetchCards() {
        try {
            const { data } = await axios({
                method: "GET",
                url: `/card/${el.id}`, // Ambil Card berdasarkan listId
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setCards(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCards();
    }, []);



    return (
        <>
            <div className="w-64 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-5">
                <h5 className="text-xl font-bold">{el.name}</h5>
                <p className="text-sm opacity-80 mt-1">Board ID: {el.boardId}</p>
            </div>



        </>
    )

}
