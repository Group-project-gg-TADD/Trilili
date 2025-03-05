import { Link } from "react-router";

export default function CardBoardes({ board }) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* {image && (
        <img className="w-full h-40 object-cover" src={image} alt={title} />
      )} */}
      <div className="p-5">
        <h2 className="text-xl font-semibold">{board.name}</h2>
        {/* <p className="mt-2 text-sm text-gray-200">{board.name}</p> */}
        <br />
        <Link
          to={`/board/${board.id}`}
          className="mt-4 px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Join Board
        </Link>
      </div>
    </div>
  );
}
