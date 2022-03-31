import Button from "./button";
import { useState, useRef } from "react";
import LessonBlock from "./lessonblock";
export default function LessonPlan({lesson, SetLessonData, EditCallback, DeleteCallback, RemoveBlockCallback, editable, editing}){

    const inputRef = useRef()

    function SetName(){
        let newLesson = Object.assign({}, lesson)
        newLesson.name = inputRef.current.value
        SetLessonData(newLesson)
    }

    if(lesson === undefined) return <div></div>
    if(lesson.lesson_chunks === undefined) return <div></div>

    return(
        <div>
            <h3>{lesson.name}</h3> 
            {editable ?
                editing ? <div><input ref={inputRef} style={{border: 'solid black'}}/> <Button text={'set title'} Callback={SetName}/></div>: <></> 
            : <></>}
            {lesson.lesson_chunks.map((block, index) => {
                return <LessonBlock key = {index} block = {block} EditCallback={()=>{return}} AddCallback={(block)=>{return}} RemoveCallback={RemoveBlockCallback} editable={false} activeLesson={editing} index={index} />
            })}
            {editable ? 
                editing ? <Button text={'delete'} Callback={()=>DeleteCallback(lesson)} /> : 
                <Button text={'edit'} Callback={()=>EditCallback(lesson)} /> 
            : <></>}
        </div>
    )
}