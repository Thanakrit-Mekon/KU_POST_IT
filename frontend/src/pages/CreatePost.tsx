import { createStyles, makeStyles } from "@material-ui/core";
import PostForm from "../components/PostForm";

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      backgroundColor: "#F2F7F7",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function CreatePost(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <PostForm />
    </div>
  );
}

export default CreatePost;
