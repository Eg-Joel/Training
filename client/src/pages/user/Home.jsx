import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography,CardActions,Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";

function Home() {
  const [courses, setCourses] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let accesstoken = userDetails?.currentUser?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get(`/user/getCourses`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: accesstoken,
        },
      });
      const data = response.data;
      setCourses(data);
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
        minHeight: "100vh",
        bgcolor: "#f4f5f7",
        margin: 0,
        padding: "15px 15px ",
      }}
    >
      <Grid container>
        <Box>
          <Box
            sx={{
              flexGrow: 1,
              marginTop: 9,
            }}
          >
            <Typography variant="h5">Courses</Typography>
          </Box>

          <Box sx={{ marginTop: 6 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 5 }}
              columns={{ xs: 12, sm: 8, md: 12 }}
            >
              {courses.map((course) => (
                <Grid xs={12} sm={4} md={3} item key={course.id}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      minWidth:"20rem"
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{
                      marginLeft:'7rem'
                      
                    }}>
                      <Button variant="contained" color="primary" >
                        Apply
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Home;
