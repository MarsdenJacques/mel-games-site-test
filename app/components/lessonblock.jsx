import { Blocks } from "~/dummydata";
import Button from "./button";

export default function LessonBlock({block, EditCallback, AddCallback, RemoveCallback, editable, activeLesson, index}) {

    let safeIndex = index

    if(index === undefined){
        if(!editable && activeLesson) return
        safeIndex = 0
    }
    if(block === undefined) return <div></div>
    const blockData = block.id === undefined ? Blocks.find(element=>element.id === block) : block;

    return(
        <div style={{marginBlock: '20px', outline: 'solid black', paddingInline: '5px', paddingBlock: '2px'}}>
            <p>{blockData.title}</p>
            <p>{blockData.type}</p>
            <p>{blockData.text}</p>
            <p>{blockData.duration}</p>
            {editable ? 
            <div>
                <Button text={'edit'} Callback={()=>EditCallback(block)}/>
                {activeLesson ? <Button text={'add'} Callback={()=>AddCallback(block)}/> : <></>}
            </div> : activeLesson ? <Button text={'remove'} Callback={()=>RemoveCallback(index)}/> : <></>}
        </div>
    )
}