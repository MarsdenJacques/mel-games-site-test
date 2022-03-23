import { useState, useEffect } from "react";
import LessonPlan from "~/components/lessonplan";
import LessonMenu from "~/components/lessonmenu";
import LessonBlock from "~/components/lessonblock";
import Button from "~/components/button";
import { Lessons, Blocks, LessonBlocks, LessonPlayers, Players } from "~/dummydata";
import { Link } from "remix";
export default function LessonsPage() {

  const LayoutModes = {
    createLesson: 'Create Lesson',
    editLesson: 'Edit Lesson',
    editBlock: 'Edit Block',
  }
  
  const [currentMode, setCurrentMode] = useState(LayoutModes.createLesson)
  const [leftData, setLeftData] = useState([])
  const [searchForLessons, setSearchForLessons] = useState(false)
  const [searchData, setSearchData] = useState([...Blocks])
  const [blockPairings, setBlockPairings] = useState([...LessonBlocks])
  const [playerPairings, setPlayerPairings] = useState([...LessonPlayers])
  const [lessonData, setLessonData] = useState([...Lessons])
  const [blockData, setBlockData] = useState([...Blocks])
  const emptyLesson = {
    title: 'title',
    id: lessonData.length,
    blocks: []
  }
  const [rightData, setRightData] = useState(emptyLesson)

  useEffect(()=>{
    const populatedLessons = lessonData.map((lesson)=>{
      let newLesson = lesson
      newLesson.blocks = blockPairings.filter(element=>element.lesson === lesson.id).map((pairing)=>{
        return pairing.block
      })
      newLesson.players = playerPairings.filter(element=>element.lesson === lesson.id).map((pairing)=>{
        let player = {}
        player.user = Players.find(element=>element.id === pairing.player).user
        player.id = pairing.player
        return player
      })
      return newLesson
    })
    setLessonData(populatedLessons)
  },[,blockPairings, playerPairings])

  function ReturnSearch(results){
    if(results === undefined) return
    setLeftData(results)
  }

  function NewLesson(){
    setRightData(emptyLesson)
    setCurrentMode(LayoutModes.createLesson)
  }

  function AddBlockToActiveLesson(block){
    /*let newLessonData = [...lessonData]
    let newLesson
    let currentRightData = rightData
    if(currentRightData === undefined){
      currentRightData = emptyLesson
    }
    if(currentRightData.blocks.length === 0)
    {
      newLesson = currentRightData
      newLesson.blocks.push(block)
      newLessonData.push(newLesson)
    }
    else
    {
      newLesson = newLessonData.find(element=>element.id === rightData.id)
      newLesson.blocks.push(block)
    }
    setLessonData(newLessonData)
    EditLesson(newLesson)*/
    let newLesson
    let newLessonData = [...lessonData]
    let currentRightData = rightData
    if(currentRightData === undefined){
      currentRightData = emptyLesson
    }
    if(currentRightData.blocks.length === 0)
    {
      newLesson = currentRightData
      newLesson.blocks.push(block)
      newLessonData.push(newLesson)
    }
    setLessonData(newLessonData)
    let newBlockPairingData = [...blockPairings]
    newBlockPairingData.push({lesson: currentRightData.id, block: block.id})
    setBlockPairings(newBlockPairingData)
  }

  function RemoveBlockFromActiveLesson(blockIndex){
    /*if(rightData === undefined) return
    let newLessonData = [...lessonData]
    let lessonIndex = newLessonData.findIndex(element=>element.id === rightData.id)
    let newLesson = newLessonData[lessonIndex]
    if(newLesson.blocks.length <= 0) return
    newLesson.blocks.splice(blockIndex, 1)
    if(newLesson.blocks.length <= 0){
      newLessonData.splice(lessonIndex)
      setLessonData(newLessonData)
      NewLesson()
      return
    }
    else{
      newLessonData[lessonIndex] = newLesson
      setLessonData(newLessonData)
      EditLesson(newLesson)
    }*/
    let newLessonData = [...lessonData]
    let currentRightData = rightData
    console.log(currentRightData.blocks.length)
    if(currentRightData === undefined) return
    if(currentRightData.blocks.length <= 0) return
    if(currentRightData.blocks.length === 1){
      let deleteIndex = newLessonData.findIndex(element=>element.id === currentRightData.id)
      newLessonData.splice(deleteIndex,1)
      setLessonData(newLessonData)
      console.log(newLessonData)
      NewLesson()
    }
    let block = currentRightData.blocks[blockIndex]
    let newBlockPairingData = [...blockPairings]
    let pairIndex = newBlockPairingData.findIndex(element=>{element.lesson === currentRightData.id && element.block === block.id})
    newBlockPairingData.splice(pairIndex,1)
    setBlockPairings(newBlockPairingData)
  }

  function EditLesson(lesson){
    setRightData(lesson)
    setCurrentMode(LayoutModes.editLesson)
  }

  function EditBlock(block){
    setRightData(block)
    setCurrentMode(LayoutModes.editBlock)
  }

  function ToggleSearchType(){
    const currentSearchLessons = searchForLessons
    setSearchForLessons(!currentSearchLessons)
    const newSearchData = currentSearchLessons ? blockData : lessonData
    setSearchData(newSearchData)
    setLeftData(newSearchData)
  }

  function TogglePlayer(player){
    let newPairingData = [...playerPairings]
    let pairingIndex = playerPairings.findIndex(element=>element.player === player && element.lesson === rightData.id)
    if(pairingIndex === -1){
      newPairingData.push({player: player, lesson: rightData.id})
    }
    else{
      newPairingData.splice(pairingIndex,1)
    }
    setPlayerPairings(newPairingData)
  }

  function LessonEditing(){
    return currentMode === LayoutModes.createLesson || currentMode === LayoutModes.editLesson
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", display: 'flex', flexDirection: 'horizontal' }}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link to={'/'}>Home</Link>
        <LessonMenu currentMode={currentMode} 
        toggleButtonText={searchForLessons ? 'Lessons' : 'Blocks'} 
        newLessonText={'new lesson'} searchForLessons={searchForLessons} searchData={searchData}
        SearchCallback={ReturnSearch} NewLessonCallback={NewLesson} ToggleCallback={ToggleSearchType}/>
        <div style={{display: 'flex', flexDirection: 'row', paddingTop: '50px', width: '100%'}}>
          <div style={{width: '50%', paddingInline: '5px'}}>
            {searchForLessons ? leftData.map((element, index)=>{
              return <LessonPlan key={index} lesson={element} EditCallback={EditLesson} RemoveBlockCallback={()=>{return}} editable={true} editing={false}/>
            }): 
            leftData.map((element, index)=>{
              return <LessonBlock block={element} key={index} EditCallback={EditBlock} AddCallback={AddBlockToActiveLesson} RemoveCallback={()=>{return}} editable={true} activeLesson={LessonEditing()} />
            })}
            <Button text={'New Block'} Callback={()=>console.log('New Block')}/>
          </div> 
          <div style={{width: '50%', paddingInline: '5px'}}>
            {currentMode === LayoutModes.editBlock ? <LessonBlock block={rightData} EditCallback={()=>{return}} AddCallback={(block)=>{return}} RemoveCallback={()=>{return}} editable={false} activeLesson={false} /> : 
            <LessonPlan lesson={rightData} EditCallback={()=>{return}} RemoveBlockCallback={RemoveBlockFromActiveLesson} editable={false} editing={true} availableStudents={Players} PlayerCallback={TogglePlayer}/>}
          </div> 
        </div>
      </div>
    </div>
  );
}