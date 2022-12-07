import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import axios from "axios";

import Lottie from "lottie-react";
import animationData from "../lotties/server";
import { useParams } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Bar from "../components/Bar";

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "24px",
    boxShadow: `0px 10px 38px rgba(221, 230, 237, 1)`,
  },
  boxContainer: {
    paddingTop: "10px",
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingBottom: "10px",
  },
  textfield: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "8px",
    paddingTop: "8px",
  },
  formHeading: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  link: {
    display: "flex",
    color: "black",
    textDecoration: "none",
  },
  icon: {
    marginRight: 0.5,
    width: 20,
    height: 20,
  },
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
}));

const style1 = {
  height: 500,
};

export default function Scan() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [hostscan, sethostccan] = useState(null);
  const [count, setCount] = useState(null);

  let { id } = useParams();

  const gethostscan = async () => {
    axios
      .get(`https://54.238.175.157:5000/result?id=${id}`)
      .then((response) => {
        console.log(response.data);

        sethostccan(response.data);
      })
      .catch((error) => {
        sethostccan(null);
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => {
      const hs = await gethostscan();

      setLoading(false);
    })();
  }, []);

  console.log(count);

  return (
    <>
      {loading ? (
        <Grid container component="main" spacing={3}>
          <Grid className={classes.spinner} item md={12} sm={12} xs={12}>
            <Lottie animationData={animationData} loop={true} style={style1} />

            <Typography
              variant="h4"
              color="initial"
              align="center"
              style={{ marginBottom: "24px", marginTop: "24px" }}
            >
              <b>Loading</b>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Bar />
          <Container
            maxWidth="lg"
            style={{
              marginBottom: "50px",
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            <Grid
              container
              direction="row"
              alignItems="start"
              style={{
                textAlign: "left",
              }}
            >
              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="h4"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px", marginTop: "24px" }}
                >
                  <b>Scan Result</b>
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "12px", marginTop: "24px" }}
                >
                  <b>Scan ID</b> : {id}
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "12px" }}
                >
                  <b>Public IP</b> : {hostscan?.information?.ip}
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "12px", whiteSpace: "pre" }}
                >
                  <b>Host Information</b> : <br />
                  <br />
                  {hostscan?.information?.info}
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "12px" }}
                >
                  <b>CIS Benchmark score</b> : {hostscan?.bench.toFixed(2)} %
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px", marginTop: "24px" }}
                >
                  <b>Failed Items</b>
                </Typography>

                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px" }}
                >
                  <b>Action: </b>
                  <span
                    style={{
                      backgroundColor: "red",
                      padding: "8px",
                      color: "white",
                    }}
                  >
                    Immediete
                  </span>
                </Typography>
              </Grid>

              {hostscan && hostscan.warn.length > 0 ? (
                <Grid item md={12} xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>ID</b>
                          </TableCell>
                          <TableCell>
                            <b>Description</b>
                          </TableCell>

                          <TableCell>
                            <b>Remediation</b>
                          </TableCell>

                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hostscan.warn.map((scan) => (
                          <TableRow key={scan.scan_id}>
                            <TableCell align="left">{scan.id}</TableCell>
                            <TableCell align="left">{scan.desc}</TableCell>
                            <TableCell align="left">
                              {scan.remediation}
                            </TableCell>

                            <TableCell align="left"></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body1" color="initial">
                    No Data Available
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid
              container
              direction="row"
              alignItems="start"
              style={{
                textAlign: "left",
              }}
            >
              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px", marginTop: "24px" }}
                >
                  <b>Informational Items</b>
                </Typography>

                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px" }}
                >
                  <b>Action: </b>
                  <span
                    style={{
                      backgroundColor: "orange",
                      padding: "8px",
                      color: "white",
                    }}
                  >
                    Normal
                  </span>
                </Typography>
              </Grid>

              {hostscan && hostscan.info.length > 0 ? (
                <Grid item md={12} xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>ID</b>
                          </TableCell>
                          <TableCell>
                            <b>Description</b>
                          </TableCell>

                          <TableCell>
                            <b>Remediation</b>
                          </TableCell>

                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hostscan.info.map((scan) => (
                          <TableRow key={scan.scan_id}>
                            <TableCell align="left">{scan.id}</TableCell>
                            <TableCell align="left">{scan.desc}</TableCell>
                            <TableCell align="left">
                              {scan.remediation}
                            </TableCell>

                            <TableCell align="left"></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body1" color="initial">
                    No Data Available
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid
              container
              direction="row"
              alignItems="start"
              style={{
                textAlign: "left",
              }}
            >
              <Grid item md={12} xs={12} sm={12}>
                <Typography
                  variant="h6"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px", marginTop: "24px" }}
                >
                  <b>Passed Items</b>
                </Typography>

                <Typography
                  variant="body1"
                  color="initial"
                  align="left"
                  style={{ marginBottom: "24px" }}
                >
                  <b>Action: </b>
                  <span
                    style={{
                      backgroundColor: "green",
                      padding: "8px",
                      color: "white",
                    }}
                  >
                    None
                  </span>
                </Typography>
              </Grid>

              {hostscan && hostscan.pass.length > 0 ? (
                <Grid item md={12} xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>ID</b>
                          </TableCell>
                          <TableCell>
                            <b>Description</b>
                          </TableCell>

                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hostscan.pass.map((scan) => (
                          <TableRow key={scan.scan_id}>
                            <TableCell align="left">{scan.id}</TableCell>
                            <TableCell align="left">{scan.desc}</TableCell>

                            <TableCell align="left"></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body1" color="initial">
                    No Data Available
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
