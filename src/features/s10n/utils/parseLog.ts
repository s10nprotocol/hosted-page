import { Interface } from '@ethersproject/abi'

export const iface = new Interface([
  `event PlanCreated(
    uint256 indexed merchantTokenId,
    uint256 planIndex,
    uint256 price,
    address paymentToken,
    address payeeAddress,
    uint8 period,
    string name,
    string description,
    uint maxTermLength,
    bool isSBT,
    bool canResubscribe
  );`,
])
