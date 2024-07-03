import { Card, CardContent, CardMedia, Typography } from "@mui/material";
const TeamMemberCard = ({ name, position, image, bio }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={name}
        height="500"
        image={require(`../Components/Images/${image}`)} // Adjust the path as necessary
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
