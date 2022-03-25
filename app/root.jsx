import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import { useState } from 'react'
import { Blocks, Lessons, LessonBlocks, LessonPlayers, Players } from './dummydata'
import { useEffect } from "react";

export function meta() {
  return { title: "New Remix App" };
}

export default function App() {

  const [blocks, setBlocks] = useState([...Blocks])
  const [lessons, setLessons] = useState([...Lessons])
  const [lessonBlocks, setLessonBlocks] = useState([...LessonBlocks])
  const [lessonPlayers, setLessonPlayers] = useState([...LessonPlayers])
  const [players, setPlayers] = useState([...Players])

  const context = { blocks, lessons, lessonBlocks, lessonPlayers, players,
    setBlocks, setLessons, setLessonBlocks, setLessonPlayers, setPlayers }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={context}/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
