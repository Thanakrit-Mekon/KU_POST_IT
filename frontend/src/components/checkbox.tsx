import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link as LinkMat } from "@material-ui/core";
import { User } from "../App";
import {  useHistory, Link } from "react-router-dom";
import axios from "../axios";

const ITEM_HEIGHT = 48;

interface LongMenuProps {
  setUser?: (user: User | null) => void;
}

export default function LongMenu({ setUser }: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <Link to="/myprofile" style={{ textDecoration: "none", color: "black" }} >
          <MenuItem style={{ paddingLeft: 13 }}>Edit profile</MenuItem>
        </Link>
        <Link to="/myposts" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem style={{ paddingLeft: 13 }}>View my posts</MenuItem>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem style={{ paddingLeft: 13 }}>Joined posts</MenuItem>
        </Link>
        <LinkMat
          onClick={() => onLogout()}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem style={{ paddingLeft: 13 }}>Sign out</MenuItem>
        </LinkMat>
      </Menu>
    </div>
  );
}
