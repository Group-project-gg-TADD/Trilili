import { createContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance";


const BoardesContext = createContext({
    boardsMember: [],
    setBoardsMember: () => { },
    boards: [],
    setBoards: () => { },
    nameBoard: [],
    SetNameBoard: () => { }
})

export default BoardesContext;

export function BoardesProvider({ children }) {
    const [boards, setBoards] = useState([]);
    const [nameBoard, setNameBoard] = useState("");
    const [boardsMember, setBoardsMember] = useState([]);

    const fetchBoardsMember = async () => {
        try {
            const { data } = await axios({
                method: "GET",
                url: "/boardMembers",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log(data, "memberrr");
            setBoardsMember(data);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBoardsMember();
    }, []);

    const fetchBoards = async () => {
        try {
            const { data } = await axios({
                method: "GET",
                url: "/board",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            console.log(data);
            setBoards(data);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleAddBoard = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: "/board",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: {
                    name: nameBoard,
                },
            });
            console.log(data);
            fetchBoards();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <BoardesContext.Provider
            value={{
                boards,
                setBoards,
                nameBoard,
                setNameBoard,
                boardsMember,
                setBoardsMember,
                fetchBoardsMember,
                fetchBoards,
                handleAddBoard,
            }}
        >
            {children}
        </BoardesContext.Provider>
    );



}