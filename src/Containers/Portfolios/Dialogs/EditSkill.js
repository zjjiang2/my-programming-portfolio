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
});

export default function EditSkill(props){
    const { editSkill, setEditSkill } = props;
    const [ name, setName ] = useState(editSkill.name);
    const [ rating, setRating ] = useState(editSkill.rating);
    const [ description, setDescription ] = useState(editSkill.description);


    const handleUpdate = ()=>{

        const data = {id: editSkill.id, name: name, rating: rating, description: description}
        console.log(data)
        // const token = Cookies.get("jwt");
        // axios.post(Config.api + '/editSrv', 
        // data,
        // {headers: {
        //     authorization: `JWT ${token}`,
        //   },});
        setEditSkill({...editSkill, isOpen: false});
    }

    const handleClose = ()=>{
        setEditSkill({...editSkill, isOpen: false});
    }

    return (
        <Dialog open={editSkill.isOpen} onClose={handleClose}>
            <DialogTitle>{editSkill.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {editSkill.subTitle}
                </DialogContentText>
                    <EditBox
                        fullWidth
                        id="name"
                        label="Name"
                        defaultValue={editSkill.name}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setName(e.target.value)}
                        maxLength={20}
                    />  
                    <EditBox
                    
                        id="rating"
                        label="Rating"
                        type="number"
                        defaultValue={editSkill.rating}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setRating(e.target.value)}
                        InputProps={{ inputProps: { min: 0, max: 5 } }}
                    />  
                    <EditBox
                        multiline
                        fullWidth
                        id="description"
                        label="Description"
                        defaultValue={editSkill.description}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setDescription(e.target.value)}
                        rows={4}
                        maxLength={225}
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