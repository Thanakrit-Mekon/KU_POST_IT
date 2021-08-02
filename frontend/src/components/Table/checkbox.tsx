import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Theme, Link, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      underline : 'hover',
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
            width: '20ch',

          },
        }}
      >
        <MenuItem className={classes.root} onClick={handleClose}>
          <Typography>    
            <Link href="/myprofile"
                  color= "inherit"
            >
              แก้ไขโปรไฟล์
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link href="/posts"
                  color= "inherit"
            >
              ดูโพสที่สร้าง
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link href="/"
                  color= "inherit"
            >
                  ออกจากระบบ
              </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}