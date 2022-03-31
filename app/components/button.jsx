export default function Button({text,Callback, selected}){
    return(
        <>{
            selected === true ? <button className="rounded-full min-w-max py-2 bg-green-400 text-zinc-50 transition-colors" onClick={Callback}>{text}</button> : //if button used as a toggle style this as the toggled version
            <button className="rounded-full w-32 py-2 bg-blue-400 hover:bg-blue-500 text-zinc-50 transition-colors" onClick={Callback}>{text}</button> //normal button
        }</>
    )
}