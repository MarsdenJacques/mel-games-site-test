import { Lessons, LessonPlayers, LessonBlocks, Blocks } from "~/dummydata"
import { json, Link, useLoaderData } from "remix";
import LessonPlan from "~/components/lessonplan";

export const loader = async ({ params }) => {
  return json(params.id);
};

export default function Student(){

    const studentId = useLoaderData();

    function GetLessonBlocks(lesson){
        let filteredLessonBlocks = LessonBlocks.filter(element=>element.lesson == lesson.id)
        filteredLessonBlocks = filteredLessonBlocks.map(element=>element.block)
        return filteredLessonBlocks
    }

    function GetStudentLessons(){
        let filteredLessons = LessonPlayers.filter(element=>{
            return element.player == studentId})
        filteredLessons = filteredLessons.map(element=>{
            return element.lesson
        })
        filteredLessons = filteredLessons.map(lessonId=>{
                return Lessons.find(element=>element.id === lessonId)
            })
        let populatedLessons = filteredLessons.map(lesson=>{
            let newLesson = lesson
            newLesson.blocks = GetLessonBlocks(lesson)
            return newLesson
        })
        return populatedLessons
    }

    const populatedLessons = GetStudentLessons()

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBlock: '10px', paddingInline: '10px'}}>
            <Link to={'/'}>Home</Link>
            <div style={{width: '400px', height: '400px', border: 'solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                HAPPY VALLEY
            </div>
            <div>
                {populatedLessons.map((lesson, index)=>{
                    return <LessonPlan lesson={lesson} EditCallback={()=>{return}} RemoveBlockCallback={()=>{return}} editable={false} editing={false} key={index}/>
                })}
            </div>
        </div>
    )
}