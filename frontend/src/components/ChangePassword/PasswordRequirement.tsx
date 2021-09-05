import { List, ListItem, ListItemText } from "@material-ui/core";

function PasswordRequirement(): JSX.Element {
  return (
    <>
      <List>
        <ListItem>
          <ListItemText primary="At least 8 characters" />
        </ListItem>
        <ListItem>
          <ListItemText primary="At least 1 uppercase letter (A-Z)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="At least 1 lowercase letter (a-z)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="At least 1 number (0-9)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="At least 1 following special letter (@#$%^&+!=)" />
        </ListItem>
      </List>
    </>
  );
}

export default PasswordRequirement;
