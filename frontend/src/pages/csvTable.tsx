import Body from "../components/Table/body";
import { User } from "../App";

export interface CsvTableprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

function CsvTable({ user, setUser }: CsvTableprops): JSX.Element {
  return (
    <div>
        <Body user={user} setUser={setUser}/>
    </div>
  );
}

export default CsvTable;
