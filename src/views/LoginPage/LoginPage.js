/* eslint-disable no-unused-vars */
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import image from "../../assets/img/login.jpg";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.js";
import Button from "../../components/CustomButtons/Button";
import Footer from "../../components/Footer/Footer.js";
import GridItem from "../../components/Grid/GridItem.js";
import useWalletConfig from "../hooks/useWalletConfig";
import useAuthentication from "views/hooks/useAuthentication";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const wallet = useSelector((s) => s.wallet);
  const classes = useStyles();
  const { ...rest } = props;

  const { walletConfiguration } = wallet;

  const { connect, killSession } = useWalletConfig();

  const [loginConfiguration, error, actions] = useAuthentication();

  useEffect(() => {
    actions.setFieldValue("walletAddress", walletConfiguration.address);
  }, [walletConfiguration]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    actions.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="CryptoBot"
        rightLinks={<HeaderLinks links />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          {error && (
            <SnackbarContent
              message={<span>{error}</span>}
              close
              color="danger"
              icon="info_outline"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
          )}
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <div className={classes.cardHeader}>
                <h1>CryptoBot</h1>
                <p className={classes.divider}></p>
                {!walletConfiguration.connected ? (
                  <Button onClick={connect} color="primary" size="lg">
                    Connect to WalletConnect
                  </Button>
                ) : (
                  <div className={classes.cardButton}>
                    <Button
                      className={classes.noclick}
                      color="success"
                      size="lg"
                    >
                      Connected! WalletConnect
                    </Button>
                    <Button
                      simple
                      round
                      justIcon
                      color="danger"
                      onClick={killSession}
                    >
                      <Icon className={classes.cancelIconsColor}>cancel</Icon>
                    </Button>
                    <p className={classes.divider}></p>
                    <h6>WALLET ADDRESS : {walletConfiguration.address}</h6>
                  </div>
                )}
                <div className={classes.cardInput}>
                  <CustomInput
                    labelText="Pass Phrase"
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                      name: "passPharse",
                      onChange: handleChange,
                    }}
                  />
                </div>
                <Button
                  round
                  justIcon
                  color="primary"
                  onClick={actions.login}
                  size="lg"
                >
                  <Icon className={classes.submitIconsColor}>
                    chevron_right
                  </Icon>
                </Button>
                {/* <Button onClick={killSession} color="danger" size="lg">
                  Kill
                </Button> */}
              </div>
              {/* <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg">
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card> */}
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
