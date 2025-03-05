import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListCard from "../components/ListCard";
import { closestCorners, DndContext } from "@dnd-kit/core";

export default function Board() {
  const [list, setList] = useState([]);
  const [newListName, setNewListName] = useState("");
  const { id } = useParams();

  async function fetchList() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/list/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setList(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addList() {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/list/${id}`,
        data: { name: newListName },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setList([...list, data]);
      setNewListName("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id;
    const listId = over.id;

    // Find the old list based on active.data.current.listId
    const oldListId = active.data.current.listId;

    // Remove cardId from the old list
    const updatedOldList = list.map((list) => {
      if (list.id === oldListId) {
        return {
          ...list,
          Cards: list.Cards.filter((card) => card.id !== cardId),
        };
      }
      return list;
    });

    // Add active.data.current to the new list
    const updatedNewList = updatedOldList.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          Cards: [...list.Cards, active.data.current],
        };
      }
      return list;
    });

    // Update the state with the new lists
    setList(updatedNewList);

    // Make an API call to update the card's listId
    try {
      const { data } = await axios({
        method: "PATCH",
        url: `/card/${cardId}`,
        data: { targetList: listId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      fetchList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 style={{ marginBottom: "10px" }} className="text-2xl font-bold">
          Add your list
        </h1>
        <input
          style={{ marginRight: "10px" }}
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Add new list..."
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={addList}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add List
        </button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="container mx-auto p-4">
          <div className="flex gap-4 overflow-x-auto">
            {list.map((el) => (
              <ListCard key={el.id} el={el} />
            ))}
          </div>
        </div>
      </DndContext>
    </>
  );
}
