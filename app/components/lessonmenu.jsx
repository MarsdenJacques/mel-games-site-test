import Searchbar from "./searchbar"
import Button from "./button"

export default function LessonMenu({ currentMode, toggleButtonText, newLessonText, searchForLessons, searchData, SearchCallback, ToggleCallback, NewLessonCallback }){

    return(
        <div>
            <div>
                <Searchbar searchForLessons = {searchForLessons} searchData={searchData} Callback={SearchCallback}/>
                <Button text = {toggleButtonText} Callback = {ToggleCallback}/>
                {newLessonText !== undefined ? <Button text = {newLessonText} Callback = {NewLessonCallback}/> : <></>}
            </div>
        </div>
    )
}