import { Link } from "remix";
export default function Index() {

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", display: 'flex', flexDirection: 'horizontal' }}>
      <Link to={'/teacher'}>Teacher</Link>
      <Link to={'/student'}>Student</Link>
    </div>
  );
}
