import { Link } from "remix";
import Button from "~/components/button";
export default function Index() {



  function Test(){
    fetch('https://bokoco.com/api/mel/v1/lessons',{
        method: 'GET',
    headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3N30.Pu-RlATReyR-V3-u4_5bwvRao50NCNnEYPCJHF1rrKY'}), 
}).then((res)=>res.json()).then((json)=>console.log(json))
  }
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", display: 'flex', flexDirection: 'horizontal' }}>
      <Link to={'/teacher'}>Teacher</Link>
      <Link to={'/student'}>Student</Link>
      <Button text={'test'} Callback={Test} />
    </div>
  );
}
