import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box bgcolor="primary.main" color="white" py={5}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              We are committed to providing the best health insurance plans with extensive coverage and affordable prices.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Contact</Typography>
            <Typography variant="body2">
              Email: support@healthinsurance.com<br />
              Phone: 1-800-123-4567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Link href="#" color="inherit">Facebook</Link><br />
            <Link href="#" color="inherit">Twitter</Link><br />
            <Link href="#" color="inherit">LinkedIn</Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
