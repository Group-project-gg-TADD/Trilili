export default function ListCard(props) {
    const { el, key } = props


    return (
        <>
            <div className="w-64 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-5">
                <h5 className="text-xl font-bold">{el.name}</h5>
                <p className="text-sm opacity-80 mt-1">Board ID: {el.boardId}</p>
            </div>
        </>
    )

}
