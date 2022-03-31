import { useState } from "react";
import { useOutletContext } from "remix";
import LessonPlan from "~/components/lessonplan";
import LessonMenu from "~/components/lessonmenu";
import LessonBlock from "~/components/lessonblock";
import { Link } from "remix";
export const meta = () => {
  return {
    title: "Lesson Maker",
  };
};
export default function LessonsPage() {

  const { lessons, blocks, SaveLesson, DeleteLesson, isTeacher } = useOutletContext()
  
  const [leftData, setLeftData] = useState([])
  const [searchForLessons, setSearchForLessons] = useState(true)
  const [editingLesson, setEditingLesson] = useState(false)
  const [rightData, setRightData] = useState(undefined)

  if(!isTeacher) return <div>ONLY FOR TEACHERS</div>

  const emptyLesson = {
    name: 'new lesson',
    details: 'details',
    lesson_chunks: [],
    id: -1,
  }

  function ReturnSearch(results){
    if(results === undefined) return
    setLeftData(results)
  }

  function NewLesson(){
    setRightData(emptyLesson)
    ToggleSearchType()
    setLeftData(blocks)
    setEditingLesson(true)
  }

  function AddBlockToActiveLesson(block){
    let currentRightData = Object.assign({}, rightData)
    currentRightData.lesson_chunks = currentRightData.lesson_chunks.slice()
    let newBlock = Object.assign({}, block)
    newBlock.id = -1
    if(currentRightData === undefined){
      currentRightData = emptyLesson
    }
    currentRightData.lesson_chunks.push(newBlock)
    setRightData(currentRightData)
  }

  function RemoveBlockFromActiveLesson(blockIndex){
    let currentRightData = Object.assign({}, rightData)
    currentRightData.lesson_chunks = currentRightData.lesson_chunks.slice()
    if(currentRightData === undefined) return
    if(currentRightData.lesson_chunks.length <= 0) return
    currentRightData.lesson_chunks.splice(blockIndex,1)
    setRightData(currentRightData)
  }

  function EditLesson(lesson){
    let lessonCopy = Object.assign({}, lesson)
    lessonCopy.lesson_chunks = lessonCopy.lesson_chunks.slice()
    setRightData(lessonCopy)
    ToggleSearchType()
    setEditingLesson(true)
  }

  function SaveCurrentLesson(){
    ToggleSearchType()
    setEditingLesson(false)
    setLeftData(lessons)
    let currentRightData = Object.assign({}, rightData)
    currentRightData.lesson_chunks = currentRightData.lesson_chunks.slice()
    setRightData(undefined)
    SaveLesson(currentRightData)
  }

  function DeleteCurrentLesson(){
    ToggleSearchType()
    setEditingLesson(false)
    setLeftData(lessons)
    let currentRightData = Object.assign({}, rightData)
    currentRightData.lesson_chunks = currentRightData.lesson_chunks.slice()
    setRightData(undefined)
    DeleteLesson(currentRightData)
  }

  function ToggleSearchType(){
    const currentSearchLessons = searchForLessons
    setSearchForLessons(!currentSearchLessons)
    setLeftData(currentSearchLessons ? blocks : lessons)
  }

  function UpdateLessonName(lesson){
    let currentRightData = Object.assign({}, rightData)
    currentRightData.lesson_chunks = currentRightData.lesson_chunks.slice()
    currentRightData.name = lesson.name
    setRightData(currentRightData)
  }

  return (
    <div id="wrapper-lesson-maker">
      <div id="container-lesson" className="">
        <div id="page-title-lesson-maker" className="text-blue-400 text-3xl font-black p-8">
          <h1>Lesson Maker</h1>
        </div>

        

          <div id="container-lesson-creator" className="grid grid-cols-2 gap-10 p-10">




            <div id="container-searchbox ">
              <LessonMenu
              newLesson={!editingLesson} searchForLessons={searchForLessons} searchData={searchForLessons ? lessons : blocks}
              SearchCallback={ReturnSearch} NewLessonCallback={NewLesson} SaveCallback={SaveCurrentLesson}/>
              {searchForLessons ? leftData.map((element, index)=>{
                return <LessonPlan key={index} lesson={element} EditCallback={EditLesson} RemoveBlockCallback={()=>{return}} editable={true} editing={false}/>
              }):leftData.map((element, index)=>{
                return <LessonBlock block={element} key={index} AddCallback={AddBlockToActiveLesson} RemoveCallback={()=>{return}} editable={true} activeLesson={false} />
              })}
            </div>


            <div id="container-lesson-maker-right" className="row-span-2 p-4 border border-slate-500 rounded-xl">
              <LessonPlan lesson={rightData} SetLessonData={UpdateLessonName} EditCallback={()=>{return}} DeleteCallback={DeleteCurrentLesson} RemoveBlockCallback={RemoveBlockFromActiveLesson} editable={true} editing={true}/>
            </div>


          </div>




      </div>

    </div>
    
  );
}