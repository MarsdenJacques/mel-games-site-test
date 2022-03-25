import Button from "./button"
import { useRef, useEffect, useState } from "react"
export default function Searchbar({searchForLessons, searchData, Callback}){

    const [searched, setSearched] = useState(false)
    const [currentQuery, setCurrentQuery] = useState({title: '', duration: '', type: ''})

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
        if(currentQuery.duration !== ''){
            searchResults = searchResults.filter(element=>element.duration === currentQuery.duration)
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
        /*const searchTerm = inputRef.current.value
        if(searchTerm === '' || searchTerm === undefined){
            Callback(searchData)
            return
        }
        setSearched(true)
        const searchResults = searchData.filter(element=>element.title === searchTerm)
        Callback(searchResults)*/
        let newQuery = {}
        Object.assign(newQuery, currentQuery)
        newQuery.title = inputRef.current.value
        setCurrentQuery(newQuery)
    }

    function SearchDuration(duration){
        /*setSearched(true)
        const searchResults = searchData.filter(element=>element.duration === duration)
        Callback(searchResults)*/
        let newQuery = {}
        Object.assign(newQuery, currentQuery)
        console.log(newQuery)
        newQuery.duration = currentQuery.duration === duration ? '' : duration
        console.log(newQuery)
        setCurrentQuery(newQuery)
    }

    function SearchType(type){
        /*setSearched(true)
        const searchResults = searchData.filter(element=>element.type === type)
        Callback(searchResults)*/
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
        newQuery.duration = ''
        newQuery.type = ''
        setCurrentQuery(newQuery)
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <input ref = {inputRef} style={{border: 'solid black'}}></input>
                <Button text = {'search'} Callback={SearchTitle}/>
                {searched ? <Button text={'clear'} Callback={Clear}/> : <></>}
            </div>
            {!searchForLessons ? <><div style={{display: 'flex', flexDirection: 'row'}}>
                <Button text = {'5m'} Callback={()=>SearchDuration('5m')} selected={currentQuery.duration==='5m'}/>
                <Button text = {'10m'} Callback={()=>SearchDuration('10m')} selected={currentQuery.duration==='10m'}/>
                <Button text = {'15m'} Callback={()=>SearchDuration('15m')} selected={currentQuery.duration==='15m'}/>
                <Button text = {'30m'} Callback={()=>SearchDuration('30m')} selected={currentQuery.duration==='30m'}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button text = {'Game'} Callback={()=>SearchType('Game')} selected={currentQuery.type==='Game'}/>
                <Button text = {'Flashcard'} Callback={()=>SearchType('Flashcard')} selected={currentQuery.type==='Flashcard'}/>
                <Button text = {'Video'} Callback={()=>SearchType('Video')} selected={currentQuery.type==='Video'}/>
            </div></>: <></>}
        </div>
    )
}