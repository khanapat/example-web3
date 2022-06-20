import React from "react";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 4, 80001],
});