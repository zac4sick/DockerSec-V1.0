import React, { useState, useEffect, useContext, useRef } from "react";

import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Alert from "@mui/lab/Alert";
import { Context } from "../util/Provider";
import axios from "axios";

// import logo from "../assets/images/logo.png";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// import Appbar from "../components/Appbar";
import Label from "../components/Label";
import FieldError from "../components/FieldError";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import Bar from "../components/Bar";

// import Footer from "../components/Footer";

// import { app } from "../util/config";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  paper: {
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const { currentUser } = useContext(Context);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      props.history.push("/");
    }

    setLoading(false);
  }, []);

  const verify = async (d) => {
    try {
      setLoading(true);

      let data = {
        email: d.email,
        password: d.password,
      };

      const response = await axios.post("https://54.238.175.157:5000/login", {
        data,
      });

      setSuccess(response?.data?.message);
      setError(null);
      reset();

      //set token in local storage
      console.log(JSON.stringify(response?.data?.data));
      localStorage.setItem("jwt-token", JSON.stringify(response?.data?.data));

      window.location.reload();
    } catch (err) {
      reset();

      setError(err?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Grid container component="main" spacing={3}>
          <Grid
            style={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
            item
            md={12}
            sm={12}
            xs={12}
          >
            <Spinner type="pulse" />
          </Grid>
        </Grid>
      ) : (
        <>
          <Bar />
          <div className={classes.paper}>
            <Container
              maxWidth="sm"
              style={{
                padding: "48px",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: `0px 10px 38px rgba(221, 230, 237, 1)`,
              }}
            >
              <form onSubmit={handleSubmit(verify)}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={0}
                  style={{ padding: "0px" }}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "32px" }}
                  >
                    <Typography variant="h4" color="initial">
                      <b>Login</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "16px" }}
                  >
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      placeholder="john@gmail.com"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("email", {
                        required: "email is required",
                      })}
                      error={errors.email ? true : false}
                    />

                    <FieldError
                      text={errors.email ? errors.email.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "16px" }}
                  >
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="*********"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("password", {
                        required: "password is required",
                        minLength: {
                          value: 6,
                          message: "Password is too short",
                        },
                      })}
                      error={errors.password ? true : false}
                    />

                    <FieldError
                      text={errors.password ? errors.password.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Login</b>
                    </Button>
                  </Grid>

                  {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

                  {error ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="error">
                        <b>{error}</b>
                      </Alert>
                    </Grid>
                  ) : null}

                  {success ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="success">
                        <b>{success}</b>
                      </Alert>
                    </Grid>
                  ) : null}

                  <Grid item md={12} xs={12} sm={12}>
                    <Typography variant="body1" color="initial">
                      Don't have an account? Create a new account
                      <NavLink to="/register" style={{ color: "#000080" }}>
                        {" "}
                        <b>Here</b>
                      </NavLink>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
