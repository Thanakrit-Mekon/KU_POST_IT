import {
    Typography,
    TextField,
    Grid,
    Button,
    Box,
    makeStyles,
    createStyles,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import axios from "../../axios";

const validationSchema = yup.object({
    name: yup.string().required(),
    phone: yup.number().required(),
    location: yup.string().required(),
});

const useStyles = makeStyles(() =>
  createStyles({
    bgyellow:{
        color: 'white',
        backgroundColor: '#F9A41A',
        borderColor: '#F9A41A',
        '&:hover': {
            backgroundColor: '#D98804',
            borderColor: '#D98804',
        },
    },

    outlinedred:{
        color: '#E53935',
        borderColor: '#E53935',
        '&:hover': {
            color: '#B71C1C',
            backgroundColor: '#F9F9F9',
            borderColor: '#B71C1C',
            
        },
    },
  })
);
  
function CompanyProfileForm(): JSX.Element {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            location: "",
            contact: "",
            aboutme: "",
            phone: "",
        },
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
                })
                .catch(function (error) {
                console.log(error);
                });
        },
    });

    useEffect(() => {
        axios.get("/user/getuser").then((response) => {
            console.log(response.data);
        });
    }, []);

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
                    <Button
                        variant="outlined"
                        size="large"
                        className={classes.outlinedred}
                        style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        href="/"
                    >
                        Back To Home
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        className={classes.bgyellow}
                        style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        href="/changepassword"
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        style={{ marginBottom: "1rem" }}
                    >
                        Save Change
                    </Button>
                </Box>
            </form>
        </>
    );
}
  
export default CompanyProfileForm;
  