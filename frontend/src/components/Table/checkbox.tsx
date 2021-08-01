import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link,Route,BrowserRouter as Router } from 'react-router-dom';

const options = [
  'แก้ไขโปรไฟล์',
  'ดูโพสที่สร้างไว้',
  'ออกจากระบบ',
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
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
        <MenuItem onClick={handleClose}><Link to="/myprofile">แก้ไขโปรไฟล์</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/posts">ดูโพสที่สร้างไว้</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/">ออกจากระบบ</Link></MenuItem>
      </Menu>
    </div>
  );
}