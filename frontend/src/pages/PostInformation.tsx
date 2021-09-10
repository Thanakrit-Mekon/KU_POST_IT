import { makeStyles, createStyles } from "@material-ui/core/styles";
import InformationForm from "../components/PostInformation/InformationForm";
import PostinforForm from "../components/PostInformation/PostinforForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    bg: {
      height: "100vh",
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

function Postinfor(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <PostinforForm />
    </div>
  );
}

export default Postinfor;
