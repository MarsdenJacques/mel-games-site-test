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
        <div id="wrapper-lesson-plan" className="rounded-xl p-4 m-4 my-2 flex flex-col">
            <div id="lesson-plan-title" className="font-bold text-2xl flex flex-row justify-center items-center text-slate-700">
                <h3>{lesson.name}</h3> 
            </div>
            {editable ?
                editing ? 
                
                <div id="container-change-title-box" className="">
                    <div>
                        <p>Change Title</p>
                    </div>
                    <div className="w-full flex flex-row gap-2">
                        <div className="w-full">
                            <input className="w-full p-2 px-4 focus:outline-none focus:shadow-outline border rounded-md border-slate-500 text-slate-600 leading-none " ref={inputRef}/> 
                        </div>
                        <div>
                            <Button text={'set title'} Callback={SetName}/>
                        </div>
                    </div>
                </div>: <></> 
            : <></>}
            
            <div id="lesson-blocks" className="pt-2">
                {lesson.lesson_chunks.map((block, index) => {
                    return <LessonBlock key = {index} block = {block} EditCallback={()=>{return}} AddCallback={(block)=>{return}} RemoveCallback={RemoveBlockCallback} editable={false} activeLesson={editing} index={index} />
                })}
                <div className="my-4 flex justify-center">
                    {editable ? 
                        editing ? <Button text={'delete'} Callback={()=>DeleteCallback(lesson)} /> : 
                        <Button text={'edit'} Callback={()=>EditCallback(lesson)} /> 
                    : <></>}
                </div>
            </div>
        </div>
    )
}