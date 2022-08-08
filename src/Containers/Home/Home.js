import { Box, Grid, Typography, styled, Paper, Button } from '@mui/material';
import React from 'react';
import { keyframes } from '@mui/system';
import { SliderImage } from './SliderImage.js';
import Cookies from 'js-cookie';


const HomeInfo = styled(Grid)({
    display: 'flex',
    position: 'absolute',
    zIndex:'1',
    width:'640px',
    height:'720px',
    alignItems:'center',
    color:'white',
    marginLeft:'auto',
    marginRight:'auto',
    left:'50%',
    transform: 'translate(-50%)',
});

const InfoBox = styled(Paper)({
    alignContent:'center',
    textAlign: "center",
    background:'rgba(0,0,0,0.6)',
    width:'500px',
    height:'450px',
    marginLeft:'auto',
    marginRight:'auto',
});

const InfoText = styled(Typography)({
    color:'white',
    fontFamily:'monospace',
    lineHeight:'normal',
    paddingTop:'50px'
});

const ImageSlider = styled('section')({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginLeft:'auto',
    marginRight:'auto',
});

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Images = styled('img')({
    animation: `${fade} 2000ms`,
    width: '100%',
    height: 'auto',
});

const InfoButton = styled(Button)({
    top:'50px',
    margin:'20px',
    width:'100px'
});

export default function Home() {
    const [current, setCurrent] = React.useState(0);
    const length = SliderImage.length;

    // Set the image index into the next image
    const nextImage = () => {
        if (current === length - 1) {
            setCurrent(0);
        }
        else {
            setCurrent(current + 1);
        }
    }

    // Change the background image on an interval
    React.useEffect(() => {
        const timer = setInterval(() => nextImage(), 5000)
        
        return () => clearInterval(timer)
    })

    return (
        <Box>
            <HomeInfo>
                <InfoBox>
                    {!Cookies.get('jwt') ? 
                    <>
                        <InfoText fontSize='50px' textAlign='left' paddingLeft='30px'>Personalize<br/>Your<br/>Resume</InfoText>
                        <InfoText >Create your very own programmer's portfolio today!</InfoText>
                    </>
                    :
                    <>              
                        <InfoText fontSize='50px' textAlign='left' paddingLeft='30px'>Welcome<br/>Back</InfoText>
                        <InfoText >Let's carry on with your portfolio</InfoText>
                    </>
                    }
                    
                    {Cookies.get('jwt') ? 

                    <>                        
                        <InfoButton variant='contained' href='/Profile'>
                            View My Profile
                        </InfoButton>
                    </>
                    :                    
                    <>
                        <InfoButton variant='contained' href='/login'>
                            Login
                        </InfoButton>
                        <InfoButton variant='contained' href='/register'>
                            Register
                        </InfoButton>
                    </>
                    }
                    
                </InfoBox>
            </HomeInfo>
            <ImageSlider>
            {SliderImage.map((slider, index) => {
                return (
                    <div key={index}>
                        {index === current && (<Images src={slider.image} alt="images"/>)}
                    </div>
                )
            })}
            </ImageSlider>
        </Box>
    );
}