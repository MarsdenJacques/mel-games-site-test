import Button from "./button"
import SmallButton from "./small-button"
import { useRef, useEffect, useState } from "react"
export default function Searchbar({searchForLessons, searchData, Callback}){

    const [searched, setSearched] = useState(false)
    const [currentQuery, setCurrentQuery] = useState({title: '', length: '', type: ''})

    const inputRef = useRef()
    useEffect(()=>{
        Clear()
    },[,searchForLessons])
    
    useEffect(()=>{
        Search()
    },[searchData])

    useEffect(()=>{
        Search()
    },[currentQuery])

    function Search(){
        let searchResults = [...searchData]
        let didSearch = false
        if(currentQuery.title !== ''){
            searchResults = searchResults.filter(element=>element.title.toLowerCase().includes(currentQuery.title.toLowerCase()))
            didSearch = true
        }
        if(currentQuery.length !== ''){
            searchResults = searchResults.filter(element=>element.length === currentQuery.length)
            didSearch = true
        }
        if(currentQuery.type !== ''){
            searchResults = searchResults.filter(element=>element.type === currentQuery.type)
            didSearch = true
        }
        setSearched(didSearch)
        Callback(searchResults)
    }

    function SearchTitle(){
        let newQuery = {}
        Object.assign(newQuery, currentQuery)
        newQuery.title = inputRef.current.value
        setCurrentQuery(newQuery)
    }

    function SearchDuration(length){
        let newQuery = {}
        Object.assign(newQuery, currentQuery)
        newQuery.length = currentQuery.length === length ? '' : length
        setCurrentQuery(newQuery)
    }

    function SearchType(type){
        let newQuery = {}
        Object.assign(newQuery, currentQuery)
        newQuery.type = currentQuery.type === type ? '' : type
        setCurrentQuery(newQuery)
    }

    function Clear(){
        inputRef.current.value = ''
        setSearched(false)
        let newQuery = {}
        Object.assign(newQuery, currentQuery)
        newQuery.title = ''
        newQuery.length = ''
        newQuery.type = ''
        setCurrentQuery(newQuery)
    }

    return(
        <div className="bg-pink-500 p-4">
            <div className="bg-purple-500 p-4">
                <input ref = {inputRef} />
                <Button text = {'search'} Callback={SearchTitle} />
                {searched ? <Button text={'clear'} Callback={Clear} /> : <></>}
            </div>
            {!searchForLessons ? <> <div className="bg-green-500 p-4">
                <SmallButton text = {'5m'} Callback={()=>SearchDuration('5m')} selected={currentQuery.length==='5m'}/>
                <SmallButton text = {'10m'} Callback={()=>SearchDuration('10m')} selected={currentQuery.length==='10m'}/>
                <SmallButton text = {'15m'} Callback={()=>SearchDuration('15m')} selected={currentQuery.length==='15m'}/>
                <SmallButton text = {'30m'} Callback={()=>SearchDuration('30m')} selected={currentQuery.length==='30m'}/>
            </div></>: <></>}
        </div>
    )
}

/* <div style={{display: 'flex', flexDirection: 'row'}}>
    <Button text = {'Game'} Callback={()=>SearchType('Game')} selected={currentQuery.type==='Game'}/>
    <Button text = {'Flashcard'} Callback={()=>SearchType('Flashcard')} selected={currentQuery.type==='Flashcard'}/>
    <Button text = {'Video'} Callback={()=>SearchType('Video')} selected={currentQuery.type==='Video'}/>
    </div>*/
//just in case