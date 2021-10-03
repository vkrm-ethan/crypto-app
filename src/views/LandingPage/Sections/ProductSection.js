// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import Fingerprint from "@material-ui/icons/Fingerprint";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import React, { useEffect } from "react";
import Table from "../../../components/Table/Table";
import useOrder from "../../hooks/useOrder";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const [values, actions] = useOrder();

  useEffect(() => {
    actions.getAllOrders();
    actions.getControlledOrders();
  }, []);

  const columns = [
    { name: "id", type: "string" },
    { name: "amount", type: "string" },
    { name: "Algorithm", type: "string", value: "algorithm.algorithm" },
    { name: "limit", type: "string" },
  ];

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Table
            columns={columns}
            data={values.orders}
            status={1}
            updateFunction={actions.assignControlOrders}
          ></Table>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Table
            columns={columns}
            data={values.controlledOrders}
            status={2}
            updateFunction={actions.assignControlOrders}
          ></Table>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Free Chat"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Verified Users"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Fingerprint"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
