export default function VideoEmbed({ src }){
    
    return(
    <div key={src}>
        <video controls={true} controlsList={"nodownload"} height={"600"} width={"960"}>
            <source src={src} type={"video/mp4"}/>
        </video>
    </div>)
}