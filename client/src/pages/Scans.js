import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Alert,
  Typography,
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
import { NavLink } from "react-router-dom";
import Bar from "../components/Bar";

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

export default function Scans() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState([]);

  const getscans = async () => {
    try {
      const response = await axios.get("https://54.238.175.157:5000/results");
      console.log(response.data);

      let docs = [];

      response.data.map((data) => {
        console.log(data);
        return docs.push(data);
      });

      setScans(docs);
    } catch (error) {
      setScans([]);
      console.log(error);
    }
  };

  const deleteScan = async (id) => {
    try {
      await axios.get(`https://54.238.175.157:5000/delete?id=${id}`);
      await getscans();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const hs = await getscans();
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Bar />

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
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              color="initial"
              align="left"
              style={{ marginTop: "48px" }}
            >
              <b>Scans</b>
            </Typography>

            <Typography
              variant="body1"
              color="initial"
              align="left"
              style={{ marginTop: "12px" }}
            >
              <b>Total {scans.length} scans</b>
            </Typography>
          </Container>

          <Container
            maxWidth="lg"
            style={{
              marginTop: "24px",
              marginBottom: "50px",
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{
                textAlign: "left",
              }}
            >
              {scans.length > 0 ? (
                <Grid item md={12} xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>Date</b>
                          </TableCell>
                          <TableCell>
                            <b>IP Address</b>
                          </TableCell>
                          <TableCell>
                            <b>Scan ID</b>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {scans.map((scan) => (
                          <TableRow key={scan.scan_id}>
                            <TableCell align="left">{scan.createdAt}</TableCell>
                            <TableCell align="left">{scan.info.ip}</TableCell>
                            <TableCell align="left">{scan.scanId}</TableCell>
                            <TableCell align="right">
                              <NavLink
                                to={`/scan/${scan.scanId}`}
                                className={classes.navlink}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disableElevation
                                >
                                  View scan
                                </Button>
                              </NavLink>

                              <Button
                                onClick={() => deleteScan(scan.scanId)}
                                variant="contained"
                                style={{ marginLeft: "12px" }}
                                color="error"
                                disableElevation
                              >
                                Delete scan
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body1" color="initial">
                    No Scans Available
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
