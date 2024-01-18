import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Cards from '../../components/Cards';
import AdminAppbar from '../../components/AdminAppbar';
function Dashboard() {

  

  return (
    <Box
    sx={{
      minHeight:'100vh',
      bgcolor: "#f4f5f7",
      margin: 0,
      padding: '25px 25px ',
    }}
  >
    <AdminAppbar/>
    <Grid container>
      <Box>

      
    <Box
        sx={{
          marginTop:9,
       
        }}
      >
        <Typography variant="h5" >
        Dashboard
        </Typography>


      </Box>

      <Box sx={{ marginTop:6,}}>
     
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
      >
        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={SellOutlinedIcon}
        backgroundColor="#6658dd"
        color="white"
        number="30"
        content="Total Tickets"
      />
        </Grid>
        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={QueryBuilderOutlinedIcon}
        backgroundColor="#f7b84b"
        color="white"
        number="30"
        content="Pending Tickets"
      />
        </Grid>

        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={TaskAltOutlinedIcon}
        backgroundColor="#1abc9c"
        color="white"
        number="30"
        content="Closed Tickets"
      />
        </Grid>

        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={DeleteForeverOutlinedIcon}
        backgroundColor="#f1556c"
        color="white"
        number="30"
        content="Deleted Tickets"
      />
        </Grid>
      </Grid>

         
      </Box>
      </Box>
    </Grid>
  </Box>
  )
}

export default Dashboard