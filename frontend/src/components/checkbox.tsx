import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link as LinkMat } from "@material-ui/core";
import { User } from "../App";
import { useHistory, Link } from "react-router-dom";
import axios from "../axios";
import { Hidden } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(() =>
  createStyles({
    logoutcolor: {
      color: "#FFFFFF",
      backgroundColor: "#F16363",
    },
  })
);

interface LongMenuProps {
  user?: User | null;
  setUser?: (user: User | null) => void;
}

export default function LongMenu({ user, setUser }: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const classes = useStyles();

  var usertype = -1;
  if (user?.location) {
    usertype = 3;
    //3=company  2=teacher 1=student
  } else if (user?.student_id) {
    usertype = 1;
  } else {
    usertype = 2;
  }

  const onLogout = () => {
    if (setUser !== undefined) {
      setUser(null);
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common["Authorization"];
      history.push("/login");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 7.5,
            width: "20ch",
          },
        }}
      >
        <Hidden smUp>
          <Link to="/ta" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem style={{ paddingLeft: 13 }}>TA</MenuItem>
          </Link>

          <Link to="/coop" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem style={{ paddingLeft: 13 }}>Project co-op</MenuItem>
          </Link>

          <Link to="/intern" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem style={{ paddingLeft: 13 }}>Internship</MenuItem>
          </Link>

          {/* {(usertype === 1 || usertype === 2) && (
            <Link to="/ta" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem style={{ paddingLeft: 13 }}>TA</MenuItem>
            </Link>
          )}
          {usertype === 3 && (
            <MenuItem style={{ paddingLeft: 13 }} disabled>
              TA
            </MenuItem>
          )}

          {usertype === 1 && (
            <Link to="/coop" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem style={{ paddingLeft: 13 }}>Project co-op</MenuItem>
            </Link>
          )}
          {(usertype === 2 || usertype === 3) && (
            <MenuItem style={{ paddingLeft: 13 }} disabled>
              Project co-op
            </MenuItem>
          )}

          {(usertype === 1 || usertype === 3) && (
            <Link
              to="/intern"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem style={{ paddingLeft: 13 }}>Internship</MenuItem>
            </Link>
          )}
          {usertype === 2 && (
            <MenuItem style={{ paddingLeft: 13 }} disabled>
              Internship
            </MenuItem>
          )} */}
        </Hidden>

        <Link
          to="/myprofile"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem style={{ paddingLeft: 13 }}>Edit profile</MenuItem>
        </Link>
        <Link to="/myposts" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem style={{ paddingLeft: 13 }}>View my posts</MenuItem>
        </Link>
        {user?.student_id && (
          <Link
            to="/joinedposts"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem style={{ paddingLeft: 13 }}>Joined posts</MenuItem>
          </Link>
        )}
        <LinkMat
          onClick={() => onLogout()}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem className={classes.logoutcolor} style={{ paddingLeft: 13 }}>
            Sign out
          </MenuItem>
        </LinkMat>
      </Menu>
    </div>
  );
}
