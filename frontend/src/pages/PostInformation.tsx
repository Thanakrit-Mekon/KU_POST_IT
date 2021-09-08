import { makeStyles, createStyles } from "@material-ui/core/styles";
import InformationForm from "../components/PostInformation/InformationForm";


const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#5E9EA0",
    },
  })
);

function Postinfor(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <InformationForm />
    </div>
  );
}

export default Postinfor;
