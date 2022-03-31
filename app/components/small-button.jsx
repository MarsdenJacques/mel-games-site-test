export default function SmallButton({text,Callback, selected}){
    return(
        <>{
            selected === true ? <button className="rounded-full w-20 py-1 bg-purple-600 text-zinc-50" onClick={Callback}>{text}</button> : //if button used as a toggle style this as the toggled version
            <button className="rounded-full w-20 py-1 bg-purple-400 hover:bg-purple-500 text-zinc-50 transition-colors" onClick={Callback}>{text}</button> //normal button
        }</>
    )
}