import Button from "./button"
import { useRef, useEffect, useState } from "react"
export default function Searchbar({searchForLessons, searchData, Callback}){

    const [searched, setSearched] = useState(false)

    const inputRef = useRef()
    useEffect(()=>{
        Clear()
    },[,searchForLessons])

    function SearchTitle(){
        const searchTerm = inputRef.current.value
        if(searchTerm === '' || searchTerm === undefined){
            Callback(searchData)
            return
        }
        setSearched(true)
        const searchResults = searchData.filter(element=>element.title === searchTerm)
        Callback(searchResults)
    }

    function SearchDuration(duration){
        setSearched(true)
        const searchResults = searchData.filter(element=>element.duration === duration)
        Callback(searchResults)
    }

    function SearchType(type){
        setSearched(true)
        const searchResults = searchData.filter(element=>element.type === type)
        Callback(searchResults)
    }

    function Clear(){
        inputRef.current.value = ''
        setSearched(false)
        SearchTitle()
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <input ref = {inputRef} style={{border: 'solid black'}}></input>
                <Button text = {'search'} Callback={SearchTitle}/>
                {searched ? <Button text={'clear'} Callback={Clear}/> : <></>}
            </div>
            {!searchForLessons ? <><div style={{display: 'flex', flexDirection: 'row'}}>
                <Button text = {'5m'} Callback={()=>SearchDuration('5m')}/><Button text = {'10m'} Callback={()=>SearchDuration('10m')}/><Button text = {'15m'} Callback={()=>SearchDuration('15m')}/><Button text = {'30m'} Callback={()=>SearchDuration('30m')}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button text = {'Game'} Callback={()=>SearchType('Game')}/><Button text = {'Flashcard'} Callback={()=>SearchType('Flashcard')}/><Button text = {'Video'} Callback={()=>SearchType('Video')}/>
            </div></>: <></>}
        </div>
    )
}