import { Link } from "remix"
import { Players } from "~/dummydata"

export default function Student(){

    return(
        <div>
            <Link to={'/'}>Home</Link>
            {Players.map((player, index)=>{
                return<Link to={'/student/' + player.id} key={index}>{player.user}</Link>
            })}
        </div>
    )
}