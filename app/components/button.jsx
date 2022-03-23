export default function Button({text,Callback, selected}){
    return(
        <>{
            selected === true ? <button onClick={Callback} style={{paddingInline: '5px', paddingBlock: '2px', border: 'solid white', margin: '2px 2px 2px 2px', backgroundColor: 'black', color: 'white'}}>{text}</button> : 
            <button onClick={Callback} style={{paddingInline: '5px', paddingBlock: '2px', border: 'solid black', margin: '2px 2px 2px 2px'}}>{text}</button>
        }</>
    )
}