import Button from "./button";
import LessonBlock from "./lessonblock";
export default function LessonPlan({lesson, EditCallback, RemoveBlockCallback, editable, editing, availableStudents, PlayerCallback}){

    if(lesson === undefined) return <div></div>
    if(lesson.blocks === undefined) return <div></div>

    return(
        <div style={{marginBlock: '20px', outline: 'solid black', paddingInline: '5px', paddingBlock: '2px'}}>
            <h3>{lesson.title}</h3>
            {lesson.blocks.map((block, index) => {
                return <LessonBlock key = {index} block = {block} EditCallback={()=>{return}} AddCallback={(block)=>{return}} RemoveCallback={RemoveBlockCallback} editable={false} activeLesson={editing} index={index} />
            })}
            {editable ? <Button text={'edit'} Callback={()=>EditCallback(lesson)} /> : <></>}
            {editing && lesson.blocks.length > 0 ? availableStudents !== undefined ? availableStudents.map((player, index)=>{
                if(lesson.players === undefined){
                    return <Button text={player.user} key={index} Callback={()=>PlayerCallback(player.id)}/> 
                }
                for(var i = 0; i < lesson.players.length; i++){
                    if(lesson.players[i].id === player.id){
                        return <Button text={player.user} key={index} selected={true} Callback={()=>PlayerCallback(player.id)}/> 
                    }
                }
                return <Button text={player.user} key={index} Callback={()=>PlayerCallback(player.id)}/> 
            }) : <></>: lesson.players != undefined ? lesson.players.map((player, index)=>{
                return <div key={index}>{player.user}</div>
            }):<></>}
        </div>
    )
}