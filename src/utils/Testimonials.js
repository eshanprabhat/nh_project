import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Testimonial = ({ name, review }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="p">
          "{review}"
        </Typography>
        <Typography variant="subtitle1" component="p" color="textSecondary">
          - {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
