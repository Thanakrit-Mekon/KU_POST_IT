import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  Checkbox,
  Link,
} from "@material-ui/core";

function CompanyRegistrationForm(): JSX.Element {
  return (
    <>
      <Typography
        align="center"
        variant="h4"
        color="primary"
        style={{ paddingBottom: "1rem" }}
      >
        <Box fontWeight="fontWeightBold">Create Account</Box>
      </Typography>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="small"
            label="Company Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="small"
            label="Email"
            variant="outlined"
            placeholder="email@example.com"
            fullWidth
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="small"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="small"
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="small"
            label="Company Address"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="small"
            label="Contact"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid container>
          <Grid
            item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Checkbox color="primary" />
            <Typography variant="body1">
              <Box fontSize={15}>
                I accept the terms of the offer of &nbsp;
                <Link href="#" color="primary">
                  the privacy policy
                </Link>
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="large"
          fullWidth
          color="primary"
          style={{ marginBottom: "1rem" }}
        >
          Register
        </Button>
        <Grid container justifyContent="center">
          <Link href="#" style={{ textDecoration: "none" }} color="primary">
            I already have an account
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default CompanyRegistrationForm;
