import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Avatar,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: "75px",
      width: "75px",
      borderRadius: "50px",
      background: "#e0e0e0",
      boxShadow:  "20px 20px 60px #bebebe-20px -20px 60px #ffffff",
    },
    card: {
      boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    }
  })
);

function MyPost(): JSX.Element {
  const classes = useStyles();
  const data = [
    {
      id: "asdasdasd",
      name: "Knun",
      subject: "Sex education",
      amount: 3,
    },
    {
      id: "bbbbbbb",
      name: "Soft",
      subject: "Physic",
      amount: 5,
    },
    {
      id: "asdasdasd",
      name: "Knun",
      subject: "Sex education",
      amount: 3,
    },
    {
      id: "bbbbbbb",
      name: "Soft",
      subject: "Physic",
      amount: 5,
    },
    {
      id: "asdasdasd",
      name: "Knun",
      subject: "Sex education",
      amount: 3,
    },
  ];

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Typography variant="h4">
          <Box
            fontWeight="bold"
            color="primary.main"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            My Post
          </Box>
        </Typography>
        <Grid container spacing={5}>
          {data.map((obj) => {
            return (
              <Grid item sm={4} key={obj.id}>
                <Card style={{ padding: 20 }} className={classes.card}>
                  <Grid container direction="column" alignItems="center">
                    <Avatar
                      alt="Travis Howard"
                      src="/img/mascot.png"
                      className={classes.icon}
                    />
                    <Box style={{ marginTop: 10, marginBottom: 7 }}>
                      {obj.name}
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize="15px"
                      color="primary.main"
                      style={{ marginBottom: 7 }}
                    >
                      TA {obj.subject}
                    </Box>
                    <Box
                      alignItems="center"
                      color="primary.main"
                      className="icon"
                    >
                      <i
                        className="fas fa-camera fa-lg"
                        style={{ marginBottom: 7, marginRight: 10 }}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </i>
                      {obj.amount}{" "}
                    </Box>
                    <Grid
                      container
                      justifyContent="space-between"
                      style={{ marginTop: 20 }}
                    >
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                      <Button variant="contained" color="secondary">
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default MyPost;
