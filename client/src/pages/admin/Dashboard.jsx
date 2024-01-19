import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import GroupIcon from '@mui/icons-material/Group';
import SubjectIcon from '@mui/icons-material/Subject';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Cards from '../../components/Cards';
import AdminAppbar from '../../components/AdminAppbar';
import { useSelector } from 'react-redux';
import axios  from '../../utils/axios';

function Dashboard() {

  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCoun] = useState(0);
  const adminDetails = useSelector((state) => state.admin);
  let accesstoken = adminDetails?.currentAdmin?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/admin/totalCounts`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: accesstoken,
          },
        }
      );
      const data = response.data;
      setCourseCount(data.course)
      setUserCoun(data.totalUsers
        )
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
        icon={GroupIcon}
        backgroundColor="#6658dd"
        color="white"
        number={userCount}
        content="Total Students"
      />
        </Grid>
        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={SubjectIcon}
        backgroundColor="#f7b84b"
        color="white"
        number={courseCount}
        content="Total courses"
      />
        </Grid>

        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={TaskAltOutlinedIcon}
        backgroundColor="#1abc9c"
        color="white"
        number="0"
        content="current course"
      />
        </Grid>

        <Grid xs={12} sm={4} md={3}>
        <Cards
        icon={DeleteForeverOutlinedIcon}
        backgroundColor="#f1556c"
        color="white"
        number="0"
        content="trainings"
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