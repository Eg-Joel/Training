import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/joy/Table";
import AdminAppbar from "../../components/AdminAppbar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCourse from "../../components/AddCourse";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const adminDetails = useSelector((state) => state.admin);
  let accesstoken = adminDetails?.currentAdmin.token;
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourseData, setSelectedCourseData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/admin/getAllCourses?page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: accesstoken,
          },
        }
      );
      const data = response.data;
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenModal = () => {
    setSelectedCourseData(null);
    setOpenModal(true);
   
  };

  const handleCloseModal = () => {
    setSelectedCourseData(null); 
    setOpenModal(false);
 
    fetchData();
  };

  const handleEditCourse = (courseId) => {
    const selectedCourse = courses.find((course) => course.id === courseId);
    if (selectedCourse) {
      setSelectedCourseData(selectedCourse);
      setOpenModal(true);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/admin/deleteCourse/${courseId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: accesstoken,
        },
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f5f7",
        margin: 0,
        padding: "15px 15px ",
      }}
    >
      <AdminAppbar />
      <Grid container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 9,
            flexGrow: 1,
          }}
        >
          <Typography variant="h5">Courses</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleOpenModal}
          >
            Add Course
          </Button>
        </Box>
        <AddCourse
          open={openModal}
          handleClose={handleCloseModal}
          isEdit={!!selectedCourseData}
          courseData={selectedCourseData}
        />
        <Box sx={{ marginTop: 2 }}>
          <Table
            borderAxis="both"
            variant="outlined"
            size="sm"
            sx={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th> Course ID</th>
                <th> Course Name</th>
                <th> Description</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>
                    <IconButton
                      onClick={() => handleEditCourse(course.id)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteCourse(course.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span> Page {currentPage} </span>
            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </Button>
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

export default Courses;
