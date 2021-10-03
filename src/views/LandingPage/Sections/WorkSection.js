/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import image from "assets/img/niceHashBlack.png";

import useNiceHashAuthentication from "../../hooks/useNiceHashAuthentication";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function WorkSection({ modalOpen, setModalOpen }) {
  const classes = useStyles();
  const [values, actions] = useNiceHashAuthentication();

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    actions.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <div className={classes.section}>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModalOpen(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer justify="center">
            <GridItem cs={12} sm={12} md={8}>
              <img src={image} alt="..." className={classes.niceHashImage} />
              <h4 className={classes.description}>
                Configure your details. please follow the reference document on
                how to configure nice hash api details.
              </h4>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Orginization Id"
                      id="orgId"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "orgId",
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Key"
                      id="key"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "key",
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Secret"
                      id="secret"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "secret",
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  {/* <CustomInput
                    labelText="Your Message"
                    id="message"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.textArea,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  /> */}
                  <GridItem
                    className={classes.textCenter}
                    xs={12}
                    sm={12}
                    md={6}
                  >
                    <Button color="warning" onClick={actions.configure}>
                      Configure
                    </Button>
                  </GridItem>
                  <GridItem
                    className={classes.textCenter}
                    xs={12}
                    sm={12}
                    md={6}
                  >
                    <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                  </GridItem>
                </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
