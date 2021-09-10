import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  makeStyles,
} from "@material-ui/core";
import { createRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

function ProfileImage(): JSX.Element {
  const classes = useStyles();
  const [image, _setImage] = useState(null);
  const inputFileRef = createRef();
  // console.log(image);
  const setImage = (newImage: any) => {
    _setImage(newImage);
  };

  const handleOnChange = (event: any) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));

      console.log(URL.createObjectURL(newImage));
    }
  };

  const handleClick = () => {
    setImage(image);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box textAlign="center" mt={2}>
            <Box display="none">
              <Input
                inputRef={inputFileRef}
                id="avatar-image-upload"
                type="file"
                onChange={handleOnChange}
              />
            </Box>
            <label htmlFor="avatar-image-upload">
              <Button
                variant="outlined"
                style={{
                  borderRadius: "50%",
                  padding: "0",
                  justifySelf: "center",
                }}
                component="span"
                onClick={handleClick}
              >
                <Avatar
                  className={classes.large}
                  alt="Avatar"
                  src={image || "/img/mascot.png"}
                />
              </Button>
            </label>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileImage;
