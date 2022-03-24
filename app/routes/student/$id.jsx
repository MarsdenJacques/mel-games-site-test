import { Lessons, LessonPlayers, LessonBlocks, Blocks } from "~/dummydata"
import { useState } from 'react'
import { json, Link, useLoaderData } from "remix";
import LessonPlan from "~/components/lessonplan";
import Button from "~/components/button";
import LessonMenu from "~/components/lessonmenu";
import LessonBlock from "~/components/lessonblock";

export const loader = async ({ params }) => {
  return json(params.id);
};

export default function Student(){

    const studentId = useLoaderData();

    const lessonsWithBlocks = PopulateLessons(Lessons)

    const [gameText, setGameText] = useState('HAPPY VALLEY')
    const [searchForLessons, setSearchForLessons] = useState(true)
    const [displayData, setDisplayData] = useState([...lessonsWithBlocks.splice()])

    function GetLessonBlocks(lesson){
        let filteredLessonBlocks = LessonBlocks.filter(element=>element.lesson == lesson.id)
        filteredLessonBlocks = filteredLessonBlocks.map(element=>element.block)
        return filteredLessonBlocks
    }

    function PopulateLessons(lessonData){
        let populatedLessons = lessonData.map(lesson=>{
            let newLesson = lesson
            newLesson.blocks = GetLessonBlocks(lesson)
            return newLesson
        })
        return populatedLessons
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
        return PopulateLessons(filteredLessons)
    }

    function PlayLesson(lesson){
        setGameText('Running: ' + lesson.title)
    }

    function SearchResults(results){
        setDisplayData(results)
    }

    const populatedLessons = GetStudentLessons()

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBlock: '10px', paddingInline: '10px'}}>
            <div style={{width: '100%'}}><Link to={'/'}>Home</Link></div>
            <div style={{width: '400px', height: '400px', border: 'solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {gameText}
            </div>
            <div style={{paddingBlock:'15px'}}>
                <h3 style={{textAlign: 'center'}}>Assigned Lessons</h3>
                {populatedLessons.map((lesson, index)=>{
                    return(
                        <div key={index} style={{backgroundColor: 'LightGray', border: 'solid black', marginBlock: '5px'}}>
                            <LessonPlan lesson={lesson} EditCallback={()=>{return}} RemoveBlockCallback={()=>{return}} editable={false} editing={false} />
                            <Button text={'run'} Callback={()=>PlayLesson(lesson)} />
                        </div>
                    )
                })}
            </div>
            <div style={{paddingBlock:'15px'}}>
                <h3 style={{textAlign: 'center'}}>Search Lessons and Activities</h3>
                <LessonMenu currentMode={''} 
                searchForLessons={searchForLessons} searchData={searchForLessons ? Lessons : Blocks} SearchCallback={SearchResults} 
                toggleButtonText={searchForLessons ? 'lessons' : 'blocks'} ToggleCallback={()=>setSearchForLessons(!searchForLessons)}/>
                {displayData.map((element, index)=>{
                    
                    return(
                        <div key={index} style={{backgroundColor: 'LightGray', border: 'solid black', marginBlock: '5px'}}>
                            {searchForLessons ? <LessonPlan lesson={element} EditCallback={()=>{return}} RemoveBlockCallback={()=>{return}} editable={false} editing={false} /> 
                            : <LessonBlock block={element} />}
                            <Button text={'run'} Callback={()=>PlayLesson(element)} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}