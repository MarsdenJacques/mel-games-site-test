import { Blocks } from "~/dummydata";
import Button from "./button";

export default function LessonBlock({block, EditCallback, AddCallback, RemoveCallback, editable, activeLesson, index}) {

    let safeIndex = index

    console.log(block)

    if(index === undefined){
        if(!editable && activeLesson) return
        safeIndex = 0
    }
    if(block === undefined) return <div></div>
    const blockData = block.id === undefined ? Blocks.find(element=>element.id === block) : block;

    console.log(blockData)

    return(
        <div style={{marginBlock: '20px', outline: 'solid black', paddingInline: '5px', paddingBlock: '2px'}}>
            <p>{block.title}</p>
            <p>{block.type}</p>
            <p>{block.text}</p>
            <p>{block.duration}</p>
            {editable ? 
            <div>
                <Button text={'edit'} Callback={()=>EditCallback(block)}/>
                {activeLesson ? <Button text={'add'} Callback={()=>AddCallback(block)}/> : <></>}
            </div> : activeLesson ? <Button text={'remove'} Callback={()=>RemoveCallback(index)}/> : <></>}
        </div>
    )
}