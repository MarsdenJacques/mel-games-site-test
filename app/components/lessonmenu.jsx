import Searchbar from "./searchbar"
import Button from "./button"

export default function LessonMenu({ newLesson, searchForLessons, searchData, SearchCallback, SaveCallback, NewLessonCallback }){

    return(
        <div id="wrapper-lesson-menu" className="">
          <div id="container-searchbar" className="">
            <Searchbar searchForLessons = {searchForLessons} searchData={searchData} Callback={SearchCallback}/>
          </div>
          <div id="new-lesson" className="mb-8">     
            {newLesson ? <Button text = {'new lesson'} Callback = {NewLessonCallback}/> : <Button text={'save lesson'} Callback={SaveCallback}/>}
          </div>
        </div>
    )
}