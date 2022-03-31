import Button from "./button";

export default function LessonBlock({block, AddCallback, RemoveCallback, editable, activeLesson, index}) {
    //editable means can have text edited or be added/removed from lesson
    //active lesson means child of a lesson which is being edited
    //index refers to position in lesson chunks of parent (used when removing in case same chunk present multiple times)

    let safeIndex = index
    if(index === undefined){
        if(editable && activeLesson) return <></>//this should never happen, implies incorrect use of states somewhere above
        safeIndex = 0 //only set default index value if index NOT NECESSARY
    }
    if(block === undefined) return <div></div>

    return(
        <div className="rounded-xl border-gray-200 border-2 shadow my-2 hover:bg-zinc-100 flex flex-col">
            <div className="flex flex-row">
                <h3 className="p-2 px-8 m-2 flex-grow font-bold text-xl flex flex-row justify-start items-center">{block.name}</h3>
                <p className="p-2 px-8 m-2 flex-grow flex flex-row justify-end items-center">Length: {block.length}</p>
            </div>
            <div className="p-2 m-2 flex flex-row">
                <div className="flex-grow">
                    {editable ? <Button text={'add'} Callback={()=>AddCallback(block)}/> : <></>}
                    {activeLesson ? <Button text={'remove'} Callback={()=>RemoveCallback(index)}/>: <></>}
                </div>
                <p className="flex flex-row flex-wrap break-all justify-center items-center">Material: {block.content_url}</p>
            </div>
        </div>
    )
}