import { Chip, Grid, Typography, Divider } from "@mui/material";
import React from "react";

function BenchItem({ item }) {
  return (
    <>
      <Grid container>
        <Grid item md={8} sm={12} xs={12} style={{ padding: "8px" }}>
          <Typography variant="body2" color="initial">
            {item.id} : {item.desc}
          </Typography>

          {item.result !== "PASS" ? (
            <Typography variant="body2" color="initial">
              Remediation : {item.remediation}
            </Typography>
          ) : null}
        </Grid>

        {/* <Grid item md={4} sm={12} xs={12}>
          <Typography variant="body2" color="initial">
            {item.result === "WARN" ? (
              <Chip label="PRIORITY : IMMEDIATELY" color="error" />
            ) : null}
            {item.result === "INFO" ? (
              <Chip label={item.result} color="info" />
            ) : null}
            {item.result === "PASS" ? (
              <Chip label={item.result} color="success" />
            ) : null}
          </Typography>
        </Grid> */}

        <Grid item md={12} sm={12} xs={12} style={{ width: "100%" }}>
          <hr style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </>
  );
}

export default BenchItem;
