import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Avatar,
  Button,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';

function MyPost(): JSX.Element {
  const data = [
    {
      id: 'asdasdasd',
      name: 'Knun',
      subject: 'Sex education',
      amount: 3,
    },
    {
      id: 'bbbbbbb',
      name: 'Soft',
      subject: 'Physic',
      amount: 5,
    },
    {
      id: 'asdasdasd',
      name: 'Knun',
      subject: 'Sex education',
      amount: 3,
    },
    {
      id: 'bbbbbbb',
      name: 'Soft',
      subject: 'Physic',
      amount: 5,
    },
    {
      id: 'asdasdasd',
      name: 'Knun',
      subject: 'Sex education',
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
            style={{ marginTop: 50, marginBottom: 50 }}>
            My Post
          </Box>
        </Typography>
        <Grid container spacing={5}>
          {data.map((obj) => {
            return (
              <Grid item sm={4} key={obj.id}>
                <Card style={{ padding: 20 }}>
                  <Grid container direction="column" alignItems="center">
                    <Avatar />
                    <Box>{obj.name}</Box>
                    <Box>TA {obj.subject}</Box>
                    <Box alignItems="center">
                      <FontAwesomeIcon icon={faUser} /> {obj.amount}{' '}
                    </Box>
                    <Grid
                      container
                      justifyContent="space-between"
                      style={{ marginTop: 20 }}>
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
