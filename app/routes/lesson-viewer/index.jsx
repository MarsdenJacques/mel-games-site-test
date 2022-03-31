import { useEffect, useState } from 'react'
import { Link, useOutletContext } from "remix";
import LessonPlan from "~/components/lessonplan";
import Button from "~/components/button";
import Searchbar from "~/components/searchbar";
import VideoEmbed from "~/components/videoembed"
export const meta = () => {
    return {
      title: "Lesson Viewer",
    };
  };
export default function LessonViewer(){

    const { lessons } = useOutletContext()

    const [vidList, setVidList] = useState([])
    const [displayData, setDisplayData] = useState(lessons)
    const [currentVid, setCurrentVid] = useState(0)

    useEffect(()=>{
      setCurrentVid(0)
    }, [,vidList])

    function PlayLesson(lesson){
        let newText = []
        for(let i = 0; i < lesson.lesson_chunks.length; i++){
            newText.push({text: lesson.lesson_chunks[i].name, link: lesson.lesson_chunks[i].content_url})
        }
        setVidList(newText)
    }

    function LastVid(){
      setCurrentVid(currentVid - 1 >= 0 ? currentVid - 1 : vidList.length - 1)
    }

    function NextVid(){
      setCurrentVid(currentVid + 1 < vidList.length ? currentVid + 1 : 0)
    }

    function SearchResults(results){
        setDisplayData(results)
    }

    return(
      <div id="wrapper-lesson-viewer">
        <div id="page-title-lesson-viewer" className="text-blue-400 text-3xl font-black p-8">
          <h1>Lesson Viewer</h1>
        </div>




				<div id='container-lesson-viewer' className='flex flex-row'>
					<div id="container-search-section" className='px-8'>
						<div id='container-search-bar'>
							<Searchbar searchForLessons = {true} searchData={lessons} Callback={SearchResults}/>
							{displayData.map((element, index)=>{
								return(
									<div id="container-lesson-plans" className='mb-20' key={index}>
										<LessonPlan lesson={element} EditCallback={()=>{return}} RemoveBlockCallback={()=>{return}} editable={false} editing={false} /> 
                    <div className='flex justify-center'><Button text={'run'} Callback={()=>PlayLesson(element)} /></div>
									</div>
								)
								})}
						</div>
          
					</div>


					<div id="presentation" className='w-full'>
          {vidList.length > 0 ? 
              <div id="container-video-box" className='border border-slate-500 rounded-3xl mr-8 max-h-max'>
                <div className='p-4 font-bold'>
                  <h3>{vidList[currentVid].text}</h3>
                </div>  
                <div>
                  <VideoEmbed src={vidList[currentVid].link}/>
                </div>

                <div className='m-4 flex justify-between'>
                  <Button text={'< Previous'} Callback={LastVid}/>
                  <Button text={'Next >'} Callback={NextVid}/>
                </div>

              </div>
            : <></>}

					</div>
				</div>


				
      </div>
    )
}