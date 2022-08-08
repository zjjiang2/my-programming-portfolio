import { Box, Grid, Typography, styled, Paper, Button, Card, CardHeader, CardContent, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { wallPaper } from './Wallpaper';


import EditSkill from './Dialogs/EditSkill';
import EditExperience from './Dialogs/EditExperience';


import axios from '../../Component/Helpers/axios'
import Config from '../../Component/Helpers/Config'
import Cookies from 'js-cookie';

const InputContainer = styled(Grid)({
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center',
});

const InputText = styled(Typography)({
    fontFamily:'monospace',
    color:'white',
    fontSize:'15px',
    textAlign:'left',
});

const InputBox = styled(TextField)({
    marginBottom:'25px',
    width:'700px',
    backgroundColor:'#5b5b5b'

});

const Background = styled(Box)({
    minHeight:1000,
    backgroundRepeat:'repeat-y',
});

const Separator = styled('hr')({
    marginTop:'50px',
    opacity:'0.5',
    marginLeft:'15%',
    marginRight:'15%',
});

const Topic = styled(Typography)({
    fontWeight:'bold',
    textAlign:'center',
    fontFamily:'monospace',
    color:'white',
    fontSize:'30px',
    paddingTop:'50px',
    paddingBottom:'50px',
});

const SideScrollGrid = styled(Grid)({
    display:'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '21%',
    overflowX: 'auto',
    overscrollBehaviorInline: 'contain',
    marginLeft:'15%',
    marginRight:'15%',
});

const SideScrollElement = styled(Grid)({
    display: 'grid',
    gridTemplateRows: 'min-content',
});

const SkillCard = styled(Card)({
    color:'white',
    margin:'5%',
    background:'#272728',
    maxWidth:'300px',
    height:'200px',
});
const SkillRating = styled(Typography)({
    color:'#999700',
    fontSize:'20px',
    textAlign:'center',
});

const EditButton = styled(Button)({
    marginTop:'15%',
    marginRight:'10px'
});
const RemoveButton = styled(Button)({
    backgroundColor:'#6a0202',
    '&:hover': {
        backgroundColor:'#420000',
    },
    marginTop:'15%',
    marginLeft:'10px'
});
const AddButton = styled(Button)({
    backgroundColor:'#009510',
    '&:hover': {
        backgroundColor:'#00730c',
    },
});

const ExperienceDuration = styled(Typography)({
    color:'gray',
    fontSize:'10px',
    textAlign:'center',
});

const ContactText = styled(Typography)({
    fontFamily:'monospace',
    color:'white',
    fontSize:'15px',
    textAlign:'left',
});

const ContactInput = styled(TextField)({
    marginBottom:'25px',
    width:'500px',
    backgroundColor:'#5b5b5b'
});


export default function EditPortfolio() {
    
    // Filler initial value, can remove at anytime
    const [oldValue, setOldValue] = useState({
        pid:0,
        fname:'Jason', 
        lname:'Jiang', 
        description:'This is the description part of the profile, provide a summary of the user. Use this as an introduction to the profile. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisisLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis', 
        skills:[
            {skill_name:'JavaScript', skill_rating:5, skill_description:''}
        ],
        experience:[
            {exp_name:'Job 1', exp_start:'2000-12-25', exp_end:'2020-12-25', exp_description:''},
        ],
        phone:'6477419988', 
        linkedIn:'jason-j-2b14f', 
        github:'zjjiang2',
        background:0
    });

    const [value, setValue] = useState({description:'', phone:'', linkedIn:'', github:''});
    const [error, setError] = useState({description:'', phone:'', linkedIn:'', github:''});

    const [editSkill, setEditSkill] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
        id: 0,
        name: '',
        rating: 0,
        description:''
    });

    const [editExperience, setEditExperience] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
        id: 0,
        name: '',
        startDate: '',
        endDate: '',
        description:''
    });


    const [timedOut, setTimedOut] = useState(false);

    // Redirect if not authenticated, get profile data if auth
    useEffect(() => {
        if (Cookies.get('jwt') === undefined) {
            window.location = '/'
        } else {
            getData()
        }
    }, [editSkill, editExperience, setOldValue]);

    
    // HTTP call to get profile information
    async function getData() {
        const token = Cookies.get("jwt");
        var data = await axios({
            method: "GET",
            url: Config.api + "/getProfile",
            setTimeout: 5000,
            headers: {
                authorization: `jwt ${token}`,
            },
        }).then(data => {
            setOldValue(data.data)
            //console.log(data.data)
        }).catch(err => {
            console.log(err)
            setTimedOut(true)
        })
    } 

    // Set user input as state for submission use
    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
        console.log(value)
    };

    // Update description
    const editDescription = () => {
        let result = window.confirm(
            "Are you sure you want to update your description?"
        );
        if (result) {
            const token = Cookies.get("jwt");
            axios.post(
              Config.api + "/editDesc",
              { id: oldValue.pid, text: value.description },
              {
                headers: {
                  authorization: `JWT ${token}`,
                },
              }
            ).then(() => getData());

          }
    };

    // Deletes the target skill from current data
    const removeSkill = (item) => {
        let result = window.confirm(
            "Are you sure you want to remove this skill?"
        );
        if (result) {
            const token = Cookies.get("jwt");
            axios.post(
              Config.api + "/removeSkill",
              { id: item.skill_id },
              {
                headers: {
                  authorization: `JWT ${token}`,
                },
              }
            ).then(() => getData());

          }
    };

    // Deletes the target experience from current data
    const removeExperience = (item) => {
        let result = window.confirm(
            "Are you sure you want to remove this experience?"
        );
        if (result) {
            const token = Cookies.get("jwt");
            axios.post(
              Config.api + "/removeExp",
              { id: item.exp_id },
              {
                headers: {
                  authorization: `JWT ${token}`,
                },
              }
            ).then(() => getData());

          }
    };


    // Update contact info
    const editContact = () => {
        let result = window.confirm(
            "Are you sure you want to update your contacts?"
        );
        if (result) {
            const token = Cookies.get("jwt");
            axios.post(
                Config.api + "/editContact",
                {   
                    id: oldValue.pid, 
                    phone: value.phone, 
                    linkedin: value.linkedIn, 
                    github: value.github 
                },{
                headers: {
                    authorization: `JWT ${token}`,
                },
                }
            ).then(() => getData());

        }
    };
    
    return (
        <Background sx={{
            backgroundImage:'url('+oldValue.background+')'
        }}>

            <Topic>
                Edit Profile
            </Topic>
            <Grid container>
                <InputContainer>
                    <InputText xs={4}>Profile Description:</InputText>
                    <InputBox xs={8}
                        multiline
                        focused
                        id='description'
                        onChange={handleChange}
                        error={error.description != ''}
                        variant='outlined'
                        helperText={error.description}
                        color='primary'
                        rows={5}
                        placeholder='(No more than 500 characters)'
                        defaultValue={oldValue.description}
                        key={oldValue.description}
                    />
                    <Button variant='contained' onClick={() => {
                        editDescription()
                    }}>Update</Button>
                </InputContainer>
            </Grid>

            <Separator/>

            <Topic>
                Edit Skills
            </Topic>
            <Grid textAlign={'center'}>
                <SideScrollGrid>
                    {oldValue.skills.map((item) => {
                        return(
                            <SideScrollElement>
                                <SkillCard>
                                    <CardHeader title={item.skill_name} />
                                    
                                    <SkillRating>
                                            Skill Rating: {item.skill_rating}/5
                                    </SkillRating>
                                    <CardContent>
                                        <Grid textAlign={'center'}>
                                            <EditButton variant='contained'
                                                onClick={() => {
                                                    setEditSkill({
                                                        isOpen: true,
                                                        title: "Edit Skill",
                                                        subTitle: `Edit the ${item.skill_name} Skill`,
                                                        id: item.skill_id,
                                                        name: item.skill_name,
                                                        rating: item.skill_rating,
                                                        description: item.skill_description,
                                                    });
                                                }}>
                                                Edit</EditButton>
                                            <RemoveButton variant='contained' 
                                                onClick={() => {
                                                    removeSkill(item);
                                                }}>Remove</RemoveButton>
                                        </Grid>
                                    </CardContent>
                                </SkillCard>
                            {editSkill.isOpen ? (
                                <EditSkill
                                    editSkill={editSkill}
                                    setEditSkill={setEditSkill}
                                />
                            ) : null}
                            </SideScrollElement>
                            
                        )
                    })}
                </SideScrollGrid>

                <Grid marginTop={'25px'}>
                    <AddButton variant='contained'>Add Skill</AddButton>
                </Grid>
            </Grid>


            <Separator/>

            <Topic>
                Edit Experience
            </Topic>

            <Grid textAlign={'center'}>
            <SideScrollGrid>
                {oldValue.experience.map((item) => {
                    return(
                        <SideScrollElement>
                            <SkillCard>
                                <CardHeader title={item.exp_name} />
                                <ExperienceDuration>
                                        Start Date: {item.exp_start}
                                </ExperienceDuration>
                                <ExperienceDuration>
                                        End Date: {item.exp_end}
                                </ExperienceDuration>
                                <CardContent>
                                    <Grid textAlign={'center'}>
                                        <EditButton variant='contained'
                                            onClick={() => {
                                                setEditExperience({
                                                    isOpen: true,
                                                    title: "Edit Experience",
                                                    subTitle: `Edit the ${item.name} Experience`,
                                                    id: item.exp_id,
                                                    name: item.exp_name,
                                                    startDate: item.exp_start,
                                                    endDate: item.exp_end,
                                                    description: item.exp_description,
                                                });
                                            }}
                                            >Edit</EditButton>
                                        <RemoveButton variant='contained' 
                                            onClick={() => {
                                                removeExperience(item);
                                            }}>Remove</RemoveButton>
                                    </Grid>
                                </CardContent>
                            </SkillCard>
                            {editExperience.isOpen ? (
                                <EditExperience
                                    editExperience={editExperience}
                                    setEditExperience={setEditExperience}
                                />
                            ) : null}
                        </SideScrollElement>
                    )
                })}
            </SideScrollGrid>
            <Grid marginTop={'25px'}>
                    <AddButton variant='contained'>Add Skill</AddButton>
                </Grid>
            </Grid>

            <Separator/>

            <Topic>
                Edit Contact Information
            </Topic>
            <Grid container textAlign={'center'} paddingBottom='50px'>
                <InputContainer>
                    <ContactText xs={4}>Phone Number:</ContactText>
                    <ContactInput xs={8}
                        focused
                        id='phone'
                        onChange={handleChange}
                        error={error.phone !== ''}
                        variant='outlined'
                        helperText={error.phone}
                        color='primary'
                        placeholder='(10 digit phone number)'
                        defaultValue={oldValue.phone}
                        key={oldValue.phone}
                    />
                    <ContactText xs={4}>Linked-in Account:</ContactText>
                    <ContactInput xs={8}
                        focused
                        id='linkedIn'
                        onChange={handleChange}
                        error={error.linkedIn !== ''}
                        variant='outlined'
                        helperText={error.linkedIn}
                        color='primary'
                        placeholder='(Enter the username part of www.linkedin.com/in/username)'
                        defaultValue={oldValue.linkedin}
                        key={oldValue.linkedin}
                    />
                    <ContactText xs={4}>Github Account:</ContactText>
                    <ContactInput xs={8}
                        focused
                        id='github'
                        onChange={handleChange}
                        error={error.github !== ''}
                        variant='outlined'
                        helperText={error.github}
                        color='primary'
                        placeholder='(Enter the username part of www.github.com/username)'
                        defaultValue={oldValue.github}
                        key={oldValue.github}
                    />

                </InputContainer>

            </Grid>
            <Grid textAlign={'center'}>
                <Button variant='contained' onClick={() => {
                    editContact()
                }}>Update</Button>
            </Grid>
            

            <Separator/>



 

        </Background>
    );
}