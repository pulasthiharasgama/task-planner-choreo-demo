import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ReminderCard(props) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Due date: {props.dueDate}
        </Typography>
        <Typography variant="h5" component="div">
          {props.reminderText}
        </Typography>
        <Typography
          sx={{ mb: 1.5, marginTop: "8px", marginBottom: "0" }}
          color="text.secondary"
        >
          {props.reminderDescription}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
