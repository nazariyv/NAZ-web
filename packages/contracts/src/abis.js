import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import nazToken from "./abis/ETHContinuousToken.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  nazToken: nazToken.abi,
};

export default abis;
