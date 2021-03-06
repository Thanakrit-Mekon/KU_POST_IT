import { makeStyles, createStyles } from "@material-ui/core/styles";
import PostinforForm from "../components/PostInformation/PostinforForm";
import { User } from "../App";

const useStyles = makeStyles((theme) =>
  createStyles({
    bg: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#5E9EA0",
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "white",
        alignItems: "flex-start",
      },
    },
  })
);

export interface Postinfoprops {
  user: User | null;
}

function Postinfor({ user }: Postinfoprops): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <PostinforForm user={user}/>
    </div>
  );
}

export default Postinfor;
