import {
    Typography,
    TextField,
    Grid,
    Button,
    Box,
    Checkbox,
  } from "@material-ui/core";
  
  function TeacherProfileForm(): JSX.Element {
    return (
      <>
        <Typography
          align="left"
          variant="h5"
          style={{ paddingBottom: "1rem" }}
        >
          <Box fontWeight="fontWeightBold">Information</Box>
        </Typography>
        <Grid container spacing={2}>
            <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                <TextField
                    size="small"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                <TextField
                    size="small"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                <TextField
                    disabled
                    size="small"
                    label="Email"
                    variant="outlined"
                    value="thanakrit.m@ku.th"
                    fullWidth
                />
            </Grid>
            <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                <TextField
                    size="small"
                    label="Tel"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                <TextField
                    disabled
                    size="small"
                    select
                    fullWidth
                    variant="outlined"
                    label="Faculty"
                />
                </Grid>
                <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                <TextField
                    disabled
                    size="small"
                    select
                    fullWidth
                    variant="outlined"
                    label="Department"
                />
            </Grid>
        </Grid>
        <Typography
          align="left"
          variant="h5"
          style={{ paddingBottom: "1rem" }}
        >
          <Box fontWeight="fontWeightBold">Change Password</Box>
        </Typography>
        <Grid container spacing={2}>
            <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                <TextField
                size="small"
                type="password"
                label="Old Password"
                variant="outlined"
                fullWidth
                />
            </Grid>
            <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                <TextField
                size="small"
                type="password"
                label="New Password"
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
        </Grid>
        <Box 
            style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"flex-end",
            }}
        >
            <Button
                variant="outlined"
                size="large"
                color="primary"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
                Back To Home
            </Button>
            <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ marginBottom: "1rem" }}
            >
                Save Change
            </Button>
        </Box>
      </>
    );
  }
  
  export default TeacherProfileForm;
  