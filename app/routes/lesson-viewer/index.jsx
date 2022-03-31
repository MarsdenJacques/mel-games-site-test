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
      <div id="wrapper-lesson-viewer">
        <div id="page-title-lesson-viewer" className="text-blue-400 text-3xl font-black p-8">
          <h1>Lesson Viewer</h1>
        </div>

				<div id="container-lesson-viewer" className='p-8'>
					<div id="nothing">
						{gameText.map((element, index)=>{
							return(
								<div key={index}>
									<p>{element.text}</p><a href={element.link}>{element.link}</a>
								</div>
							)
						})}
					</div>
					<div id='container-search-bar'>
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
      </div>
    )
}