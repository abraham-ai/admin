import { Divider } from "antd";
import React, {useContext} from "react";
import AppContext from 'context/AppContext'

import { useAccount } from "wagmi";

import EthereumAuth from "components/Account/EthereumAuth";

const AccountTab = () => {
  const { address, isConnected } = useAccount();
  const { isSignedIn, setIsSignedIn } = useContext(AppContext);

  const handleSignIn = (signedIn: boolean) => {
    setIsSignedIn(signedIn);
  };

  return (
    <>
      {isConnected && isSignedIn && (
        <h3>Signed in as {address}</h3>
      )}
      {isConnected && (
        <EthereumAuth onSignIn={handleSignIn} />
      )}
    </>
  );
};

export default AccountTab;
