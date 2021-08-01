import {
    Typography,
    TextField,
    Grid,
    Button,
    Box,
    Checkbox,
  } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    phone: yup.number().required(),
    currentPassword: yup.string().min(8),
    newPassword: yup.string().min(8),
    confirmNewPassword: yup
        .string()
        .min(8)
        .oneOf([yup.ref("newpassword"), null]),
});

function StudentProfileForm(): JSX.Element {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            faculty: "",
            department: "",
            year: "",
            studentId: "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            getNotify: true,
        },
        validationSchema,
        onSubmit: (values) => {
            const userData = {
                profile_url: "url_link",
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone: values.phone,
                faculty_code: values.faculty,
                department_code: values.department,
                year: values.year,
                student_id: values.studentId,
                current_password: values.currentPassword,
                new_password: values.newPassword,
                confirm_new_password: values.confirmNewPassword,
                get_notify: values.getNotify,
            };
            console.log(userData);
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
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            value={formik.values.firstName}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            value={formik.values.lastName}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
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
                            select
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
                            select
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
                    <Grid item sm={3} style={{ marginBottom: "1rem" }}>
                        <TextField
                            select
                            size="small"
                            label="Year"
                            variant="outlined"
                            name="year"
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item sm={9}>
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
                            label="Current Password"
                            variant="outlined"
                            name="currentPassword"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.currentPassword && 
                                Boolean(formik.errors.currentPassword)
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            type="password"
                            label="New Password"
                            variant="outlined"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.newPassword && 
                                Boolean(formik.errors.newPassword)
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            type="password"
                            label="Confirm New Password"
                            variant="outlined"
                            name="confirmNewPassword"
                            value={formik.values.confirmNewPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmNewPassword && 
                                Boolean(formik.errors.confirmNewPassword)
                            }
                            fullWidth
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
                        color="primary"
                        style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        href="/"
                    >
                        Back To Home
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
  
export default StudentProfileForm;
  