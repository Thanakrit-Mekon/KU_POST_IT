import React, { useState } from "react";
import SelectedFrom from "./SelectedFrom";
import AddIcon from '@material-ui/icons/Add';
import { 
  Button, 
  Checkbox, 
  Fab, 
  FormControl, 
  FormControlLabel, 
  FormGroup, 
  FormHelperText, 
  FormLabel, 
  Grid, 
  makeStyles, 
  Radio, 
  RadioGroup,
} from "@material-ui/core";

type CheckedboxProps = {
    onCheckedboxCreate? : (selected : '') => void
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const Checkedbox = (props: CheckedboxProps) : JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === 'all') {
      setError(false);
    } else if (value === 'some') {
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [FromVisible, setFromVisible] = useState<boolean>(false)
  
  const handleFromShow = () => {
    if (!FromVisible){
        setFromVisible(true)
    }
  }

  const handleFromHide = () => {
    if (FromVisible){
        setFromVisible(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" error={error} className={classes.formControl}>
            <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
                <RadioGroup row aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange} >
                    <FormControlLabel value="all" color="primary" control={<Radio />} label="All Faculties" onClick = {handleFromHide} /> 
                    <FormControlLabel value="some" color="primary" control={<Radio /> } label="Specific Faculty" onClick = {handleFromShow} />
                </RadioGroup>
                {FromVisible &&
                    <Fab size="small" color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                }
            </Grid>
        </FormControl>
        {FromVisible &&
            <div>
                <SelectedFrom />
            </div>
        }
      </form>
    </div>
  )
}

export default Checkedbox;