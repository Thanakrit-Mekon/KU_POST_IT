import {
    TextField,
    Grid,
    Button,
    Box,
    makeStyles,
    createStyles,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    currentPassword: yup.string().min(8).required(),
    newPassword: yup
        .string()
        .min(8)
        .matches(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$/)
        .required(),
    confirmNewPassword: yup
        .string()
        .min(8)
        .required()
        .oneOf([yup.ref("newPassword"), null]),
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
  
function ChangePasswordForm(): JSX.Element {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const userPassword = {
                current_password: values.currentPassword,
                new_password: values.newPassword,
                confirm_new_password: values.confirmNewPassword,
            };
            console.log(userPassword);
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
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
                    mt={3}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        className={classes.outlinedred}
                        style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        href="/myprofile"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        style={{ marginBottom: "1rem" }}
                    >
                        Save Password
                    </Button>
                </Box>
            </form>
        </>
    );
}
  
export default ChangePasswordForm;