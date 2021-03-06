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
        <div className="rounded-xl border-slate-300 border shadow my-2 hover:bg-zinc-100 flex flex-col min-w-max">
            <div className="flex flex-row justify-between align-middle p-4 gap-4">
                <div className="max-w-20 break-all">
                    <h3 className="font-bold text-xl">{block.name}</h3>
                </div>
                <div className="flex align-middle">
                    <p className="text-xs py-1 px-4 rounded-full bg-blue-200 min-w-max max-h-7">Length: {block.length}</p>
                </div>
            </div>
            <div className="">
                <div className="flex flex-grow flex-row p-4">
                    {editable ? <Button text={'add'} Callback={()=>AddCallback(block)}/> : <></>}
                    {activeLesson ? <Button text={'remove'} Callback={()=>RemoveCallback(index)}/>: <></>}
                </div>
            </div>
        </div>
    )
}
//<p className="flex flex-row flex-wrap break-all justify-left">Material: {block.content_url}</p>