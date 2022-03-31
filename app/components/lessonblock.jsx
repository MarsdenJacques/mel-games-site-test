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
        <div>
            <h3 className="bg-yellow-200 p-2 m-2">{block.name}</h3>
            <p className="bg-lime-200 p-2 m-2">{block.length}</p>
            {editable ? <Button text={'add'} Callback={()=>AddCallback(block)}/> : <></>}
            {activeLesson ? <Button text={'remove'} Callback={()=>RemoveCallback(index)}/> : <></>}
        </div>
    )
}