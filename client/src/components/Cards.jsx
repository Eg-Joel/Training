import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
function Cards(props) {
  return (
    <>
         <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <Box style={{ display: 'flex',justifyContent:'space-between',alignItems:'center',textAlign: 'end' }}>


<props.icon style={{ backgroundColor:props.backgroundColor,color:props.color,padding:15,borderRadius:30, }}/>

<Box >
  <Typography
    sx={{ fontSize: 14 }}
    color="text.secondary"
    gutterBottom
  >
  {props.number}
  </Typography>
  <Typography
    sx={{ fontSize: 14 }}
    color="text.secondary"
    gutterBottom
  >
   {props.content}
  </Typography>
  </Box>
</Box>
              </Typography>
            </CardContent>
          </Card>
    </>
  )
}

export default Cards