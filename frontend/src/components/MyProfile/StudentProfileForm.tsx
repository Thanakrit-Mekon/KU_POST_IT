import {
    Typography,
    TextField,
    Grid,
    Button,
    Box,
    Checkbox,
    makeStyles,
    createStyles,
  } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { User } from "../../App";

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.number().required(),
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

interface StudentProfileFormProps {
    user?: User | null;
}

function StudentProfileForm({ user }: StudentProfileFormProps): JSX.Element {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            firstName:`${ user?.first_name }`,
            lastName: `${ user?.last_name }`,
            email: `${ user?.email }`,
            phone: `${ user?.phone }`,
            studentId: `${ user?.student_id }`,
            faculty: `${ user?.faculty_name }`,
            department: `${ user?.department_name }`,
            getNotify: user?.get_notify,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            const userDatasent = {
                first_name: values.firstName,
                last_name: values.lastName,
                phone: values.phone,
                get_notify: values.getNotify,
            };
            console.log(userDatasent);
            axios
                .patch("/user/updateuser", userDatasent)
                .then(function (response) {
                console.log(response);
                window.location.reload();
                })
                .catch(function (error) {
                console.log(error);
                });
        },
    });
    // console.log(formik.values.getNotify);

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
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
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
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Faculty"
                            variant="outlined"
                            name="faculty"
                            value={formik.values.faculty}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                        </Grid>
                        <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Department"
                            variant="outlined"
                            name="department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            size="small"
                            label="Student ID"
                            variant="outlined"
                            name="studentId"
                            value={formik.values.studentId}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid
                        item sm={12}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                        <Checkbox 
                            color="primary"
                            name="getNotify"
                            checked={formik.values.getNotify}
                            // value={formik.values.getNotify}
                            onChange={formik.handleChange}
                        />
                        <Typography variant="body1">
                            <Box fontSize={15}>
                                Stop recieving notification mail from us.
                            </Box>
                        </Typography>
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
                        href="/ta"
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
                        Save Changes
                    </Button>
                </Box>
            </form>
        </>
    );
}
  
export default StudentProfileForm;
  