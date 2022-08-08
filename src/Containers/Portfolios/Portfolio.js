import { Box, Grid, Typography, styled, Paper, Card, CardHeader, CardContent, getAccordionDetailsUtilityClass } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { wallPaper } from './Wallpaper';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import axios from '../../Component/Helpers/axios'
import Config from '../../Component/Helpers/Config'
import Cookies from 'js-cookie';

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
});

const DescContainer = styled(Paper)({
    marginLeft:'auto',
    marginRight:'auto',
    maxWidth:'800px',
    marginTop:'25px'
});

const Descriptions = styled(Typography)({
    backgroundColor:'#272728',
    textAlign:'left',
    fontFamily:'monospace',
    color:'gray',
    fontSize:'20px',
    padding:'10px',
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
    height:'300px',
});
const SkillRating = styled(Typography)({
    color:'#999700',
    fontSize:'10px',
    textAlign:'center',
});
const CardInfo = styled(Typography)({
    color:'gray',
});

const ExperienceDuration = styled(Typography)({
    color:'gray',
    fontSize:'10px',
    textAlign:'center',
});

const ContactInfo = styled(Grid)({
    color:'white',
    alignContent:'center',
});
const ContactLink = styled(Typography)({
    textDecoration:'none',
});

export default function Portfolio() {
    // Filler initial value, can remove at anytime
    const [oldValue, setOldValue] = useState({
        pid:0,
        fname:'Jason', 
        lname:'Jiang', 
        description:'This is the description part of the profile, provide a summary of the user. Use this as an introduction to the profile. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisisLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis', 
        skills:[
            {skill_name:'JavaScript', skill_rating:5, skill_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis'}, 
            {skill_name:'Python', skill_rating:3, skill_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis'}, 
            {skill_name:'C/C++', skill_rating:2, skill_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis'}, 
            {skill_name:'Java', skill_rating:1, skill_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis'}, 
            {skill_name:'Web Development', rating:5, skill_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec malesuada. Aenean et facilisis'},
        ],
        experience:[
            {exp_name:'Job 1', exp_start:'2000-12-25', exp_end:'2020-12-25', exp_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec'}, 
            {exp_name:'Job 2', exp_start:'2000-12-25', exp_end:'2022-12-25', exp_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec'}, 
            {exp_name:'Job 3', exp_start:'2000-12-25', exp_end:'2010-05-25', exp_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec'}, 
            {exp_name:'Job 4', exp_start:'2000-12-25', exp_end:'2010-02-25', exp_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec'}, 
            {exp_name:'Job 5', exp_start:'2000-12-25', exp_end:'2010-05-25', exp_description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur hendrerit dui consectetur semper. Phasellus et vestibulum ligula, id sagittis odio. Praesent semper consequat nunc nec'}, 
        ],
        phone:'6477419988', 
        linkedIn:'jason-j-2b14f', 
        github:'zjjiang2',
        background:0
    });
    
    const [timedOut, setTimedOut] = useState(false);

    // Redirect if not authenticated, get profile data if auth
    useEffect(() => {
        if (Cookies.get('jwt') === undefined) {
            window.location = '/'
        } else {
            getData()
        }
    }, []);

    
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
        }).catch(err => {
            console.log(err)
            setTimedOut(true)
        })
    }    

    return (
        <Background sx={{
            backgroundImage:'url('+oldValue.background+')'
        }}>
            <Topic>
                {oldValue.fname} {oldValue.lname}'s Profile
            </Topic>
            <DescContainer>
                <Descriptions>{oldValue.description}</Descriptions>
            </DescContainer>
            <Separator/>
            <Topic>
                Skills
            </Topic>
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

                                    <CardInfo>
                                        {item.skill_description}
                                    </CardInfo>
                                </CardContent>
                            </SkillCard>
                        </SideScrollElement>
                    )
                })}
            </SideScrollGrid>
            <Separator/>
            <Topic>
                Experience
            </Topic>
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
                                    <CardInfo>
                                        {item.exp_description}
                                    </CardInfo>
                                </CardContent>
                            </SkillCard>
                        </SideScrollElement>
                    )
                })}
            </SideScrollGrid>
            <Separator/>
            <Topic>
                Contact Information
            </Topic>
            <Grid container textAlign={'center'} paddingTop='50px' paddingBottom='50px'>
                <ContactInfo item xs={4}>
                    <ContactLink href={'https://www.linkedin.com/in/' + oldValue.linkedin} color='inherit' component='a'>
                        <LinkedInIcon/>
                        <Typography  textDecoration='none'>Linked-in</Typography>
                    </ContactLink>
                </ContactInfo>
                <ContactInfo item xs={4}>
                    <LocalPhoneIcon/>
                    <Typography>{oldValue.phone}</Typography>
                </ContactInfo>
                <ContactInfo item xs={4}>
                    <ContactLink href={'https://www.github.com/' + oldValue.github} color='inherit' component='a' >
                        <GitHubIcon/>
                        <Typography>Github</Typography>
                    </ContactLink>
                </ContactInfo>
            </Grid>
        </Background>
    );
}