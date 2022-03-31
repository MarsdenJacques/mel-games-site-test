export default function VideoEmbed({ src }){
    
    return(
    <div key={src}>
        <video controls={true} controlsList={"nodownload"} className="w-full h-auto">
            <source src={src} type={"video/mp4"}/>
        </video>
    </div>)
}