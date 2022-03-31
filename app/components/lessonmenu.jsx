import Searchbar from "./searchbar"
import Button from "./button"

export default function LessonMenu({ newLesson, searchForLessons, searchData, SearchCallback, SaveCallback, NewLessonCallback }){

    return(
        <div id="wrapper-lesson-menu">
          <div id="container-searchbar" className="px-4">
            <Searchbar searchForLessons = {searchForLessons} searchData={searchData} Callback={SearchCallback}/>
          </div>
          <div id="new-lesson" className="p-4">     
            {newLesson ? <Button text = {'new lesson'} Callback = {NewLessonCallback}/> : <Button text={'save lesson'} Callback={SaveCallback}/>}
          </div>
        </div>
    )
}