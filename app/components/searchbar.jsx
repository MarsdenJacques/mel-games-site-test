import Button from "./button"
import SmallButton from "./small-button"
import { useRef, useEffect, useState } from "react"
export default function Searchbar({searchForLessons, searchData, Callback}){

    const [searched, setSearched] = useState(false)
    const [currentQuery, setCurrentQuery] = useState({name: '', length: '', type: ''})

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
        if(currentQuery.name !== ''){
            searchResults = searchResults.filter(element=>element.name.toLowerCase().includes(currentQuery.name.toLowerCase()))
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
        newQuery.name = inputRef.current.value
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
        newQuery.name = ''
        newQuery.length = ''
        newQuery.type = ''
        setCurrentQuery(newQuery)
    }

    return(
        <div id="wrapper-searchbar">
		    	<div className="text-sm leading-none"><p>Keyword Search</p></div>
        		<div id="container-searchbar">
							<input className="w-full my-1 p-2 focus:outline-none focus:shadow-outline border rounded-md border-slate-500 text-slate-600 leading-none px-4" ref = {inputRef} />
						</div>
						<div className="flex flex-row gap-2">
							<div id="button-clear" className="">
								<Button text = {'search'} Callback={SearchTitle} />
							</div>
							<div className="my-2 flex gap-2 flex-wrap text-xs">
								{!searchForLessons ? <> 
									<SmallButton text = {'1 ~ 5mins'} Callback={()=>SearchDuration('1-5m')} selected={currentQuery.length==='1-5m'}/>
									<SmallButton text = {'5 ~ 10mins'} Callback={()=>SearchDuration('5-10m')} selected={currentQuery.length==='5-10m'}/>
									<SmallButton text = {'10 ~ 15mins'} Callback={()=>SearchDuration('10-15m')} selected={currentQuery.length==='10-15m'}/>
									<SmallButton text = {'15 ~ 30mins'} Callback={()=>SearchDuration('15-30m')} selected={currentQuery.length==='15-30m'}/>
									<SmallButton text = {'30mins +'} Callback={()=>SearchDuration('30m')} selected={currentQuery.length==='30m'}/>
								</>: <></>}
							</div>
							{searched ?	<SmallButton text={'clear'} Callback={Clear} /> : <></>}
						</div>
        </div>
    )
}

/* <div style={{display: 'flex', flexDirection: 'row'}}>
    <Button text = {'Game'} Callback={()=>SearchType('Game')} selected={currentQuery.type==='Game'}/>
    <Button text = {'Flashcard'} Callback={()=>SearchType('Flashcard')} selected={currentQuery.type==='Flashcard'}/>
    <Button text = {'Video'} Callback={()=>SearchType('Video')} selected={currentQuery.type==='Video'}/>
    </div>*/
//just in case