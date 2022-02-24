import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
function UpdateProfile() {
  const [image, setImage] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    currentUser,
    updateEmailLocal,
    updatePasswordLocal,
    updateProfileLocal,
    updateProfilePic,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const handleUpload = () => {
    console.log("inside upload");

    //v9
    const storage = getStorage(app);
    const storageRef = ref(storage, `wagone/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            let p = await updateProfilePic(downloadURL);
            console.log("sertual abate", p);
          } catch (e) {
            console.log("ere aza new", e);
          }
        });
      }
    );
  };
  const handleImageChange = (e) => {
    console.log("inside change");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  async function handleUpdateInfo() {
    if (name === "" || number === "") {
    } else {
      try {
        await updateProfileLocal(name);
      } catch (e) {
        console.log("simmuunnnnmmnnnu", e);
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault(); //disables clearing/refreshing the form

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    const promises = [];

    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmailLocal(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePasswordLocal(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        setError(e.message);
        // console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {
            //currentUser.email //for testting purpuses
          }
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                placeholder="leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                placeholder="leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>

      <Divider sx={{ marginTop: "100px" }} />

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Avatar
          alt="Remy Sharp"
          src={currentUser?.photoURL}
          sx={{ width: 400, height: 200 }}
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        {/* <TextField
          type="tel"
          id="standard-basic"
          label="Number"
          variant="standard"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        /> */}

        <TextField
          type="file"
          id="standard-basic"
          label="Select Image"
          variant="standard"
          onChange={handleImageChange}
        />
        <button onClick={handleUpload}>Upload Photo</button>
        <button
          onClick={() => {
            handleUpdateInfo();
          }}
        >
          Update Info
        </button>
      </Stack>
    </>
  );
}

export default UpdateProfile;
