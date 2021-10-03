/* eslint-disable no-unused-vars */
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  saveConfiguration,
  saveConnector,
} from "../../redux/walletReducer";

export default function useWalletConfig() {
  const wallet = useSelector((s) => s.wallet);
  const dispatch = useDispatch();

  const connect = async () => {
    // bridge url

    const uri =
      "wc:095e9b68-9f9e-4059-8a0a-a42eec236131@1?bridge=bridge=https%3A%2F%2Fbridge.walletconnect.org&key=41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a";

    const connector = new WalletConnect({ uri, qrcodeModal: QRCodeModal });

    dispatch(saveConnector(connector));

    console.log(connector);

    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }

    subscribeToEvents(connector);
  };

  const subscribeToEvents = (connector) => {
    if (!connector) {
      return;
    }

    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);

      if (error) {
        throw error;
      }

      const { chainId, accounts } = payload.params[0];
      onSessionUpdate(accounts, chainId);
    });

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }

      onConnect(payload);
    });

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);

      if (error) {
        throw error;
      }

      onDisconnect();
    });

    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      dispatch(
        saveConfiguration({ connected: true, chainId, accounts, address })
      );
      onSessionUpdate(accounts, chainId);
    }
    dispatch(saveConnector(connector));
  };

  //   subscribeToEvents();

  const onSessionUpdate = async (accounts, chainId) => {
    const address = accounts[0];
    await dispatch(saveConfiguration({ chainId, accounts, address }));
    // await this.getAccountAssets();
  };

  const onConnect = async (payload) => {
    console.log("Onconnect");
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];
    dispatch(
      saveConfiguration({ connected: true, chainId, accounts, address })
    );
    // this.getAccountAssets();
  };

  const onDisconnect = async () => {
    console.log("Ondisconnect");
    resetApp();
  };
  const resetApp = async () => {
    await dispatch(
      saveConfiguration({ connected: false, accounts: [], address: "" })
    );
  };

  const killSession = async () => {
    const { connector } = wallet;
    if (connector) {
      connector.killSession();
      localStorage.removeItem("user");
    }
    resetApp();
  };

  //   const getAccountAssets = async () => {
  //     const { address, chainId } = this.state;
  //     this.setState({ fetching: true });
  //     try {
  //       // get account balances
  //       const assets = await apiGetAccountAssets(address, chainId);

  //       await this.setState({ fetching: false, address, assets });
  //     } catch (error) {
  //       console.error(error);
  //       await this.setState({ fetching: false });
  //     }
  //   };

  return { connect, killSession, subscribeToEvents };
}
