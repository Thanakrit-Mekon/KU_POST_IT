import {
    Typography,
    TextField,
    Grid,
    Button,
    Box,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    phone: yup.number().required(),
    location: yup.string().required(),
    aboutMe: yup.string(),
    contact: yup.string().required(),
    currentPassword: yup.string().min(8),
    newPassword: yup.string().min(8),
    confirmNewPassword: yup
        .string()
        .min(8)
        .oneOf([yup.ref("newpassword"), null]),
});
  
function CompanyProfileForm(): JSX.Element {
    const formik = useFormik({
        initialValues: {
            companyName: "",
            email: "",
            phone: "",
            location: "",
            aboutMe: "",
            contact: "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const userData = {
                profile_url: "url_link",
                companyName: values.companyName,
                email: values.email,
                phone: values.phone,
                location: values.location,
                aboutMe: values.aboutMe,
                contact: values.contact,
                current_password: values.currentPassword,
                new_password: values.newPassword,
                confirm_new_password: values.confirmNewPassword,
                get_notify: true,
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
            <Grid container spacing={2}>
                <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                    <TextField
                        size="small"
                        label="Company Name"
                        variant="outlined"
                        name="companyName"
                        value={formik.values.companyName}
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
                        name="aboutMe"
                        value={formik.values.aboutMe}
                        onChange={formik.handleChange}
                        error={formik.touched.aboutMe && Boolean(formik.errors.aboutMe)}
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
                    style={{ marginBottom: "1rem" }}
                >
                    Save Change
                </Button>
            </Box>
        </>
    );
}
  
export default CompanyProfileForm;
  