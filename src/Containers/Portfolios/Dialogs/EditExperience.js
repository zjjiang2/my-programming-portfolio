import React, {useState} from 'react';
import {    Dialog,
            DialogTitle,
            DialogContent, 
            DialogContentText, 
            DialogActions,
            TextField,
            Button,
            styled
} from '@mui/material';

const EditBox = styled(TextField)({
    marginTop:'25px',
    marginRight:'10px',

});

export default function EditExperience(props){
    const { editExperience, setEditExperience } = props;
    const [ name, setName ] = useState(editExperience.name);
    const [ startDate, setStartDate ] = useState(editExperience.startDate);
    const [ endDate, setEndDate ] = useState(editExperience.endDate);
    const [ description, setDescription ] = useState(editExperience.description);


    const handleUpdate = ()=>{

        const data = {id: editExperience.id, name: name, startDate: startDate, endDate: endDate, description: description}
        console.log(data)
        // const token = Cookies.get("jwt");
        // axios.post(Config.api + '/editSrv', 
        // data,
        // {headers: {
        //     authorization: `JWT ${token}`,
        //   },});
        setEditExperience({...editExperience, isOpen: false});
    }

    const handleClose = ()=>{
        setEditExperience({...editExperience, isOpen: false});
    }

    return (
        <Dialog open={editExperience.isOpen} onClose={handleClose}>
            <DialogTitle>{editExperience.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {editExperience.subTitle}
                </DialogContentText>
                    <EditBox
                        fullWidth
                        id="name"
                        label="Name"
                        defaultValue={editExperience.name}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setName(e.target.value)}
                        maxLength={20}
                    />  
                    <EditBox
                        id="startDate"
                        label="Start Date"
                        defaultValue={editExperience.startDate}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setStartDate(e.target.value)}
                    />  
                    <EditBox
                        id="endDate"
                        label="End Date"
                        defaultValue={editExperience.endDate}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setEndDate(e.target.value)}
                    />  
                    <EditBox
                        multiline
                        fullWidth
                        id="description"
                        label="Description"
                        defaultValue={editExperience.description}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setDescription(e.target.value)}
                        rows={4}
                        maxLength={190}
                    />  
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdate} color="primary">
                    Update
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )

}