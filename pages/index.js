/*********************************************************************************
* BTI425 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Kush Patel Student ID: 104006218 Date: 22rd March 2023
*
*
********************************************************************************/ 

import { Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';

const StyledPaper = styled(Paper)({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '16px',
});

const StyledImage = styled('img')({
  width: '100%',
  borderRadius: '8px',
});

const StyledList = styled('ul')({
  paddingLeft: '20px',
  marginBottom: '16px',
});

const FinalPage = () => {
  return (
    <div style={{ margin: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledPaper elevation={0} sx={{ display: 'flex' }}>
            <Slide in={true} direction="up" timeout={2000}>
              <StyledImage
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
                alt="The Metropolitan Museum of Art"
              />
            </Slide>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}><Fade in={true} timeout={2000}>
          <Typography variant="h5" sx={{ marginTop: '16px', fontWeight: 'bold' }}>
            About the Metropolitan Museum of Art
          </Typography>
        </Fade>
          <StyledPaper elevation={0} sx={{ display: 'flex' }}>

            <Grow in={true} timeout={2000}>
              <Typography variant="body1" sx={{ marginTop: '8px', marginBottom: '16px' }}>
                The Metropolitan Museum of Art, colloquially known as the Met, is located in New York City and is the
                largest art museum in the United States. Its permanent collection contains over two million works,
                divided among seventeen curatorial departments.
              </Typography>
            </Grow>
            <Zoom in={true} timeout={2000}>
              <Typography variant="body1">
                The main building, on the eastern edge of Central Park along Museum Mile, is by area one of the worlds
                largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park in Upper
                Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
              </Typography>
            </Zoom>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}><Fade in={true} timeout={2000}>
          <Typography variant="h5" sx={{ marginTop: '16px', fontWeight: 'bold' }}>
            What You Can See at the Met
          </Typography>
        </Fade>
          <StyledPaper elevation={0} sx={{ display: 'flex' }}>

            <Grow in={true} timeout={2000}>
              <Typography variant="body1" sx={{ marginTop: '8px', marginBottom: '16px' }}>
                The Met maintains extensive holdings of art and artifacts from around the world. Its collections
                include:
              </Typography>
            </Grow>
            <Zoom in={true} timeout={2000}>
              <StyledList>
                <li>
                  <Typography variant="body1">Egyptian Art</Typography>
                </li>
                <li>
                  <Typography variant="body1">European Paintings</Typography>
                </li>
                <li>
                  <Typography variant="body1">Greek and Roman Art</Typography>
                </li>
                <li>
                  <Typography variant="body1">Islamic Art</Typography>
                </li>
                <li>
                  <Typography variant="body1">Modern and Contemporary Art</Typography>
                </li>
                <li>
                  <Typography variant="body1">Musical Instruments</Typography>
                </li>
              </StyledList>
            </Zoom>

          </StyledPaper>
        </Grid>
      </Grid><Fade in={true} timeout={2000}>
        <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
          <Button style={{ marginTop: '16px', backgroundColor: 'cyan' }}>Click here to read more.</Button>
        </a>

      </Fade>
    </div>
  );
};
export default FinalPage;