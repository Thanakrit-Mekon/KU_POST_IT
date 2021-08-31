import {
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { User } from "../../App";
import { useState } from "react";

const validationSchema = yup.object({
  name: yup.string().required(),
  phone: yup.number().required(),
  location: yup.string().required(),
});

const useStyles = makeStyles(() =>
  createStyles({
    bgyellow: {
      color: "white",
      backgroundColor: "#F9A41A",
      borderColor: "#F9A41A",
      "&:hover": {
        backgroundColor: "#D98804",
        borderColor: "#D98804",
      },
    },
  })
);

interface CompanyProfileFormProps {
  user?: User | null;
}

function CompanyProfileForm({ user }: CompanyProfileFormProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      name: `${user?.name}`,
      email: `${user?.email}`,
      location: `${user?.location}`,
      contact: `${user?.contact}`,
      aboutme: `${user?.about_me}`,
      phone: `${user?.phone}`,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        location: values.location,
        contact: values.contact,
        about_me: values.aboutme,
        phone: values.phone,
      };
      console.log(userData);
      axios
        .patch("/user/updateuser", userData)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            handleOpen();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

    return (
        <>
            <Typography
            align="left"
            variant="h5"
            style={{ paddingBottom: "1rem" }}
            >
            <Box fontWeight="fontWeightBold">Information</Box>
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Company Name"
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Tel"
                            variant="outlined"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Location"
                            variant="outlined"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            multiline
                            rows={2}
                            rowsMax={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="About me"
                            variant="outlined"
                            name="aboutme"
                            value={formik.values.aboutme}
                            onChange={formik.handleChange}
                            error={formik.touched.aboutme && Boolean(formik.errors.aboutme)}
                            multiline
                            rows={2}
                            rowsMax={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Contact (Such as website , facebook etc.)"
                            variant="outlined"
                            name="contact"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            multiline
                            rows={2}
                            rowsMax={4}
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
                    <RouterLink to="/intern" style={{ textDecoration:"none" }}>
                        <Button
                            variant="outlined"
                            size="large"
                            color="secondary"
                            style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        >
                            Back To Home
                        </Button>
                    </RouterLink>
                    <RouterLink to="/changepassword" style={{ textDecoration:"none" }}>
                        <Button
                            variant="outlined"
                            size="large"
                            className={classes.bgyellow}
                            style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        >
                            Change Password
                        </Button>
                    </RouterLink>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        style={{ marginBottom: "1rem" }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                disableBackdropClick
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your profile information has been saved.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CompanyProfileForm;
