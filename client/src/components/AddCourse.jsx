import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import axios from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddCourse({ open, handleClose, isEdit, courseData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const resetErrors = () => {
    setNameError("");
    setDescriptionError("");
  };
  const adminDetails = useSelector((state) => state.admin);
  let accesstoken = adminDetails?.currentAdmin.token;
  useEffect(() => {
  
    if (isEdit && courseData) {
      setName(courseData.name || '');
      setDescription(courseData.description || '');
    }else{
        setName( '');
        setDescription( '')
    }
  }, [isEdit, courseData]);

  const handleSave = async () => {
    resetErrors();

    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required");
      return;
    }
    try {
      if (isEdit) {
      
        await axios.put(
          `/admin/editCourse/${courseData.id}`,
          { name, description },
          {
            headers: {
              'Content-Type': 'application/json',
              token: accesstoken,
            },
          }
        );
        setName("");
    setDescription("");
      } else {
        
        await axios.post(
          '/admin/createCourse',
          { name, description },
          {
            headers: {
              'Content-Type': 'application/json',
              token: accesstoken,
            },
          }
        );
      }

      handleClose();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  const handleCancel = () => {
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          label="Course Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default AddCourse;
