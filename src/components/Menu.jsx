import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import MenuIcon from '@material-ui/icons/Menu';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function RenderPropsMenu(props) {
    return (
      <WithState>
        {({ anchorEl, updateAnchorEl }) => {
          const open = Boolean(anchorEl);
          const handleClose = (page) => {
            updateAnchorEl(null);
            props.navigation(page)
          };
  
          return (
            <React.Fragment>
              <Button
                aria-owns={open ? 'render-props-menu' : undefined}
                aria-haspopup="true"
                onClick={event => {
                  updateAnchorEl(event.currentTarget);
                }}
  
              >
                <MenuIcon/>
              </Button>
              <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={()=>handleClose('/home')}>Home</MenuItem>
                <MenuItem onClick={()=>handleClose('/donors')}>Donors List</MenuItem>
                <MenuItem onClick={()=>handleClose('/requests')}>Requests & Notifications </MenuItem>
                <MenuItem onClick={()=>handleClose('/profile')}>Your Profile</MenuItem>
                <MenuItem onClick={props.signOut}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          );
        }}
      </WithState>
    );
  }
  
  export default RenderPropsMenu;