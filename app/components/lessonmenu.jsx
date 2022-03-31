import Searchbar from "./searchbar"
import Button from "./button"

export default function LessonMenu({ newLesson, searchForLessons, searchData, SearchCallback, SaveCallback, NewLessonCallback }){

    return(
        <div className="bg-red-500 p-4">
            <div className="bg-red-200 p-4">
                <Searchbar searchForLessons = {searchForLessons} searchData={searchData} Callback={SearchCallback}/>
                {newLesson ? <Button text = {'new lesson'} Callback = {NewLessonCallback}/> : <Button text={'save lesson'} Callback={SaveCallback}/>}
            </div>
        </div>
    )
}