import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Theme, Link, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        textDecoration: "none",      
      },
    },

  })
);

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
        <Link  href="/myprofile" style={{ textDecoration: 'none' ,color : 'black'}}>
          <MenuItem style={{ paddingLeft: 13 }}>edit profile</MenuItem>
        </Link>
        <Link href="/posts" style={{ textDecoration: 'none' ,color : 'black'}}>
          <MenuItem style={{ paddingLeft: 13 }}>view my posts</MenuItem>
        </Link>
        <Link href="/" style={{ textDecoration: 'none' ,color : 'black'}}>
          <MenuItem style={{ paddingLeft: 13 }}>sign out</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
