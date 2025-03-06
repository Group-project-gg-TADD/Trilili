import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddCardForm({ listId, onCardAdded, fetchList }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
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
            // onCardAdded(newCard);
            setTitle("");
            setDescription("");
            setLoading(false)

            if(onCardAdded){
                onCardAdded(newCard);
            }
            fetchList();

        } catch (error) {
            console.log(error, "gagal dpt card");
            toast.error(error.response.data.message);
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Card Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#85C1E9]"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-[#85C1E9]"
          />
          <button
            type="submit"
            className="w-full bg-[#2C3E50] text-white p-2 rounded-md hover:bg-white hover:text-[#2C3E50] border-2 border-[#2C3E50] mt-2 transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Card"}
          </button>
        </form>
      );

    // return (
    //     <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
    //         <input
    //             type="text"
    //             placeholder="Card Title"
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //             className="p-2 border rounded"
    //             required
    //         />
    //         <textarea
    //             placeholder="Description"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             className="p-2 border rounded"
    //         />
    //         <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-700">
    //             Add Card
    //         </button>
    //     </form>
    // );
}
