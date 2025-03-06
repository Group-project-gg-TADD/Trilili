import axios from "../config/axiosInstance";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import ListCard from "../components/ListCard";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Comment from "./Comment";
import ListCardContext from "../context1/ListCard1";
import UserContext from "../context1/user";

export default function Board() {

  // const { list, setList, fetchList } = useContext(ListCardContext)
  // const { newListName, setNewListName, addList } = useContext(ListCardContext)
  // const { list, setList, fetchList, newListName, setNewListName, addList } = useContext(ListCardContext);

  const [selectedUser, setSelectedUser] = useState("");

  const { id } = useParams();
  const [list, setList] = useState([]);
  const [newListName, setNewListName] = useState("");
  async function fetchList() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/list/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data, "tessss<<<<");

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

      setList([...list, { ...data, Cards: [] }]);
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

  // const [user, setUser] = useState([]);
  // async function fecthUser() {
  //   try {

  //     const { data } = await axios({
  //       method: "GET",
  //       url: "/user",
  //       headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
  //     })
  //     console.log(data, "<<< data user");
  //     setUser(data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fecthUser();
  // }, [])
  const { user, setUser } = useContext(UserContext)

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user to add.");
      return;
    }

    try {
      await axios({
        method: "POST",
        url: `/board/member`,
        data: {
          userId: selectedUser,
          boardId: id
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      alert("Member added successfully!");
      setSelectedUser(""); // Reset dropdown selection
    } catch (error) {
      console.error(error);
      alert("Failed to add member.");
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
          // onClick={addList}
          onClick={() => addList(id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add List
        </button>
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="container mx-auto mt-4">
            <div className="flex gap-4 overflow-x-auto">
              {list.map((el) => (
                <ListCard key={el.id} el={el} fetchList={fetchList} />
              ))}
            </div>
          </div>
        </DndContext>
      </div>

      <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-2">Add Member</h2>
        <form onSubmit={handleAddMember} className="flex flex-col gap-3">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="" disabled>Select a user</option>
            {user.map((el) => (
              <option key={el.id} value={el.id}>{el.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Add Member
          </button>
        </form>
      </div>

      <div>
        <Comment boardId={id} />
      </div>
    </>
  );
}
