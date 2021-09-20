import PostActivate from "../components/Table/PostActivated";
import { User } from "../App";

export interface PostTableprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

function PostTable({ user, setUser }: PostTableprops): JSX.Element {
  return (
    <div>
      <PostActivate user={user} setUser={setUser} />
    </div>
  );
}

export default PostTable;
