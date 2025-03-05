import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useParams } from "react-router";

export default function AddListCard(props) {
    const { id } = useParams();
    const [ListCard, setListCard] = useState([]);
    const [newListCard, setNewListCard] = useState("");
    console.log(ListCard, "ListCard");

    async function fetchListCards() {
        try {
            const { data } = await axios({
                method: "POST",
                url: `/card/${id}`,
                data: { name: newListCard },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setListCard(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchListCards();
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
