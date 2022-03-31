import { useState } from 'react'
import { Link, useOutletContext } from "remix";
import LessonPlan from "~/components/lessonplan";
import Button from "~/components/button";
import Searchbar from "~/components/searchbar";
export const meta = () => {
    return {
      title: "Lesson Viewer",
    };
  };
export default function Student(){

    const { lessons } = useOutletContext()

    const [gameText, setGameText] = useState([])
    const [displayData, setDisplayData] = useState(lessons)

    function PlayLesson(lesson){
        let newText = []
        for(let i = 0; i < lesson.lesson_chunks.length; i++){
            newText.push({text: lesson.lesson_chunks[i].name + ': ', link: lesson.lesson_chunks[i].content_url})
        }
        setGameText(newText)
    }

    function SearchResults(results){
        setDisplayData(results)
    }

    return(
        <div className='bg-blue-500 p-4 flex flex-col w-fit'>
            <div className='bg-red-500 text-right text-xl text-zinc-100 p-2 px-4'>
                <Link to={'/'}>Home</Link>
            </div>
            <div className='text-center'>
                <h2 className='text-4xl font-vag text-zinc-100'>HAPPY VALLEY</h2>
                {gameText.map((element, index)=>{
                    return(
                        <div key={index}>
                            <p>{element.text}</p><a href={element.link}>{element.link}</a>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>Search Lessons</h3>
                <Searchbar searchForLessons = {true} searchData={lessons} Callback={SearchResults}/>
                {displayData.map((element, index)=>{
                    return(
                        <div key={index}>
                            <LessonPlan lesson={element} EditCallback={()=>{return}} RemoveBlockCallback={()=>{return}} editable={false} editing={false} /> 
                            <Button text={'run'} Callback={()=>PlayLesson(element)} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}