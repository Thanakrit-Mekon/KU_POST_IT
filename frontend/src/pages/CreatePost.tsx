import { makeStyles, createStyles } from "@material-ui/core/styles";
import PostForm from "../components/CreatePost/PostForm";

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(241,241,241)",
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
