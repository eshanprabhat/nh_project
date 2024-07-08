import React from 'react';
import { Card, CardContent, Typography} from '@mui/material';

const FeatureCard = ({ title, description, image }) => {
  return (
    <Card>
        <img style={{paddingLeft:"30%", filter:"saturate(0)"}} src={require(`../Components/Images/${image}`)} alt={title} height="140" />
      {/* <CardMedia component="img" height="140" image={require(`../Components/Images/${image}`)} alt={title} /> */}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
