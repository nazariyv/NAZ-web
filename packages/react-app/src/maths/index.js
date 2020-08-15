import BigNumber from "bignumber.js";

const EXA = new BigNumber(1e18);
const EXAEXA = new BigNumber(1e36);
const LAMBDA = 2 * EXA;
const MU = 8 * EXA;

// TODO: to compute this, we need the total supply, and that is on the blockchain
const calculatePurchaseReturn = ({ nazSupply, ethDepositAmount }) => {
  const newTotalValue =
    nazSupply.multipliedBy(nazSupply + EXA).dividedBy(LAMBDA) +
    ethDepositAmount;
  const newTokenSupply = (
    Math.sqrt(EXAEXA + newTotalValue.multipliedBy(MU)) - EXA
  ).dividedBy(2);
};

const computeEstimatedEthTokens = () => {};
