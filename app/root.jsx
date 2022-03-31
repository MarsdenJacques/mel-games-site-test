import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";

import { useState, useEffect } from "react";


export function meta() {
  return { title: "New Remix App" };
}

export default function App() {
  const [token, setToken] = useState('')
  const [isTeacher, setIsTeacher] = useState(false)
  const [blocks, setBlocks] = useState([])
  const [lessons, setLessons] = useState([])

  useEffect(()=>{
    GetTokenFromBrowser()
  }, [])

  useEffect(()=>{
    TeacherTest()
    InitData()
  }, [token])

  async function GetRequest(endpoint){
    const request = fetch('https://bokoco.com/api/mel/v1/' + endpoint,{
      method: 'GET',
      headers: new Headers({
      'Authorization': 'Bearer ' + token}), 
    }).then((res)=>res.json())
    let result = await request
    return result
  }

  async function PostRequest(endpoint){
    const request = fetch('https://bokoco.com/api/mel/v1/' + endpoint,{
      method: 'POST',
      headers: new Headers({
      'Authorization': 'Bearer ' + token}), 
    }).then((res)=>res.json())
    let result = await request
    return result
  }

  async function PutRequest(endpoint){
    const request = fetch('https://bokoco.com/api/mel/v1/' + endpoint,{
      method: 'PUT',
      headers: new Headers({
      'Authorization': 'Bearer ' + token}), 
    }).then((res)=>res.json())
    let result = await request
    return result
  }
  
  async function DeleteRequest(endpoint){
    const request = fetch('https://bokoco.com/api/mel/v1/' + endpoint,{
      method: 'DELETE',
      headers: new Headers({
      'Authorization': 'Bearer ' + token}), 
    })
    let result = await request
    return result
  }

  async function InitData(){
    if(token === '') return
    let lessonJson = await GetRequest('lessons')
    setLessons(lessonJson.lessons)
    let videoJson = await GetRequest('videos')
    const videoChunks = videoJson.videos.map((video)=>{
      return {
        name: video.name,
        type: 'video',
        length: '5m',
        content_url: video.url
      }
    })
    setBlocks(videoChunks)
  }


  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function GetTokenFromBrowser(){
    const apiToken = getCookie('api_token')
    setToken(apiToken)
  }
  
  async function TeacherTest(){
      if(token === '') return
      const accountTypeRequest = fetch('https://bokoco.com/api/mel/v1/user',{
        method: 'GET',
        headers: new Headers({
        'Authorization': 'Bearer ' + token}), 
      }).then((res)=>res.json())
      let accountType = await accountTypeRequest 
      setIsTeacher(accountType.role === 'teacher')
  }

  async function FindAddedBlocks(lesson, lessonIndex){
     let added = []
     const otherLesson = lessons[lessonIndex]
     for(let i = 0; i < lesson.lesson_chunks.length; i++){
       const chunk = lesson.lesson_chunks[i]
       if(otherLesson.lesson_chunks.findIndex(element=>element.id === chunk.id) === -1){
         added.push(chunk)
       }
     }
     for(let i = 0; i < added.length; i++){
       const block = added[i]
       await PostRequest('lesson_chunks?lesson_id=' + lesson.id + '&name=' + block.name + 
       '&length=' + block.length + '&type=' + block.type + '&content_url=' + block.content_url)
     }
  }

  async function FindRemovedBlocks(lesson, lessonIndex){
    let removed = []
    const otherLesson = lessons[lessonIndex]
    for(let i = 0; i < otherLesson.lesson_chunks.length; i++){
      const chunk = otherLesson.lesson_chunks[i]
      if(lesson.lesson_chunks.findIndex(element=>element.id === chunk.id) === -1){
        removed.push(chunk)
      }
    }
    for(let i = 0; i < removed.length; i++){
      const block = removed[i]
      await DeleteRequest('lesson_chunks/' + block.id)
    }
  }

  async function DeleteLesson(lesson){
    if(lessons.findIndex(element=>element.id === lesson.id) === -1) return
    for(let i = 0; i < lesson.lesson_chunks.length; i++){
      const block = lesson.lesson_chunks[i]
      await DeleteRequest('lesson_chunks/'+block.id)
    }
    await DeleteRequest('lessons/'+lesson.id)
    InitData()
  }
  
  async function SaveLesson(lesson){
    const index = lessons.findIndex(element=>element.id === lesson.id)
    if(index === -1){
      let lessonId = await PostRequest('lessons?name=' + lesson.name + '&details=' + lesson.details)
      for(let i = 0; i < lesson.lesson_chunks.length; i++){
        const block = lesson.lesson_chunks[i]
        await PostRequest('lesson_chunks?lesson_id=' + lessonId.id + '&name=' + block.name + 
        '&length=' + block.length + '&type=' + block.type + '&content_url=' + block.content_url)
      }
    }
    else{
      if(lesson.name !== lessons[index].name){
        await PutRequest('/lessons/' + lesson.id + '?name=' + lesson.name)
      }
      await FindAddedBlocks(lesson, index)
      await FindRemovedBlocks(lesson, index)
    }
    InitData()
  }
  
  const context = { blocks, lessons, SaveLesson, DeleteLesson, isTeacher }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {token === '' ? <div>PLEASE LOGIN</div> : <Outlet context={context}/>}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
