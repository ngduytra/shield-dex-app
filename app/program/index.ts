// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from "@solana/web3.js";

export type ShieldDexPg = {
  version: "0.1.0";
  name: "shield_dex_pg";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "platformConfig";
          isMut: false;
          isSigner: false;
          docs: ["Which config the pool belongs to."];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: true;
          docs: ["Pool"];
        },
        {
          name: "mintA";
          isMut: false;
          isSigner: false;
          docs: ["Mint A"];
        },
        {
          name: "srcA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintB";
          isMut: false;
          isSigner: false;
          docs: ["Mint B"];
        },
        {
          name: "srcB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lpMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dstLp";
          isMut: true;
          isSigner: false;
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["System programs"];
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "a";
          type: "u64";
        },
        {
          name: "b";
          type: "u64";
        },
        {
          name: "referralFee";
          type: "u64";
        },
        {
          name: "solAmountForCustomFee";
          type: "u64";
        },
        {
          name: "fee";
          type: "u64";
        }
      ];
    },
    {
      name: "addLiquidity";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
          docs: ["Pool"];
        },
        {
          name: "mintA";
          isMut: false;
          isSigner: false;
          docs: ["Mint A"];
        },
        {
          name: "srcA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintB";
          isMut: false;
          isSigner: false;
          docs: ["Mint B"];
        },
        {
          name: "srcB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lpMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dstLp";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["System programs"];
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "a";
          type: "u64";
        },
        {
          name: "b";
          type: "u64";
        }
      ];
    },
    {
      name: "removeLiquidity";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
          docs: ["Pool"];
        },
        {
          name: "mintA";
          isMut: false;
          isSigner: false;
          docs: ["Mint A"];
        },
        {
          name: "treasuryA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dstA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintB";
          isMut: false;
          isSigner: false;
          docs: ["Mint B"];
        },
        {
          name: "treasuryB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dstB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lpMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "srcLp";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["System programs"];
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "lp";
          type: "u64";
        }
      ];
    },
    {
      name: "swap";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "platformConfig";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bidMint";
          isMut: false;
          isSigner: false;
          docs: ["Bid Mint"];
        },
        {
          name: "bidSrc";
          isMut: true;
          isSigner: false;
        },
        {
          name: "bidTreasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "askMint";
          isMut: false;
          isSigner: false;
          docs: ["Ask Mint"];
        },
        {
          name: "askTreasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "askDst";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: false;
          isSigner: false;
        },
        {
          name: "taxDst";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["System programs"];
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bidAmount";
          type: "u64";
        },
        {
          name: "limit";
          type: "u64";
        }
      ];
      returns: "u64";
    },
    {
      name: "updateFee";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        }
      ];
      args: [
        {
          name: "fee";
          type: "u64";
        }
      ];
    },
    {
      name: "updateReferralFee";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        }
      ];
      args: [
        {
          name: "fee";
          type: "u64";
        }
      ];
    },
    {
      name: "updateTax";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "platformConfig";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        }
      ];
      args: [
        {
          name: "tax";
          type: "u64";
        }
      ];
    },
    {
      name: "transferOwnership";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        }
      ];
      args: [
        {
          name: "newOwner";
          type: "publicKey";
        }
      ];
    },
    {
      name: "pause";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        }
      ];
      args: [];
    },
    {
      name: "resume";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool"];
        }
      ];
      args: [];
    },
    {
      name: "createPlatformConfig";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
          docs: ["Address to be set as protocol owner."];
        },
        {
          name: "platformConfig";
          isMut: true;
          isSigner: true;
          docs: [
            "Initialize config state account to store protocol owner address and fee rates."
          ];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "tax";
          type: "u64";
        }
      ];
    },
    {
      name: "updatePlatformConfig";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
          docs: ["Address to be set as protocol owner."];
        },
        {
          name: "platformConfig";
          isMut: true;
          isSigner: false;
          docs: [
            "Initialize config state account to store protocol owner address and fee rates."
          ];
        }
      ];
      args: [
        {
          name: "tax";
          type: "u64";
        }
      ];
    },
    {
      name: "distributeLpFee";
      accounts: [
        {
          name: "owner";
          isMut: false;
          isSigner: true;
          docs: ["Only admin or owner can collect fee now"];
        },
        {
          name: "escrow";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
          docs: ["Pool state stores accumulated protocol fee amount"];
        },
        {
          name: "platformConfig";
          isMut: false;
          isSigner: false;
          docs: ["Platform config account stores owner"];
        },
        {
          name: "mintA";
          isMut: false;
          isSigner: false;
          docs: ["Mint B"];
        },
        {
          name: "mintB";
          isMut: false;
          isSigner: false;
          docs: ["Mint B"];
        },
        {
          name: "treasuryA";
          isMut: true;
          isSigner: false;
          docs: ["The address that holds pool tokens for token_a"];
        },
        {
          name: "treasuryB";
          isMut: true;
          isSigner: false;
          docs: ["The address that holds pool tokens for token_b"];
        },
        {
          name: "recipientTokenAAccount";
          isMut: true;
          isSigner: false;
          docs: [
            "The address that receives the collected token_0 protocol fees"
          ];
        },
        {
          name: "recipientTokenBAccount";
          isMut: true;
          isSigner: false;
          docs: [
            "The address that receives the collected token_1 protocol fees"
          ];
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
          docs: ["The SPL program to perform token transfers"];
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amountARequested";
          type: "u64";
        },
        {
          name: "amountBRequested";
          type: "u64";
        }
      ];
    },
    {
      name: "createReferrer";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["Authority"];
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "referrer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "refererAddress";
          type: "publicKey";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "platformConfig";
      docs: ["", "Referrer struct", ""];
      type: {
        kind: "struct";
        fields: [
          {
            name: "tax";
            type: "u64";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "updatedAt";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "pool";
      docs: ["", "Pool struct", ""];
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "lpMint";
            type: "publicKey";
          },
          {
            name: "mintA";
            type: "publicKey";
          },
          {
            name: "mintB";
            type: "publicKey";
          },
          {
            name: "referralFee";
            type: "u64";
          },
          {
            name: "lpFee";
            type: "u64";
          },
          {
            name: "tax";
            type: "publicKey";
          },
          {
            name: "state";
            type: {
              defined: "PoolState";
            };
          },
          {
            name: "lpFeesMintA";
            type: "u64";
          },
          {
            name: "lpFeesMintB";
            type: "u64";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "updatedAt";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "referrer";
      docs: ["", "Referrer struct", ""];
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "referee";
            type: "publicKey";
          },
          {
            name: "pool";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "PoolState";
      docs: ["", "Pool state", ""];
      type: {
        kind: "enum";
        variants: [
          {
            name: "Uninitialized";
          },
          {
            name: "Initialized";
          },
          {
            name: "Paused";
          },
          {
            name: "Canceled";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "AddLiquidityEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "a";
          type: "u64";
          index: false;
        },
        {
          name: "b";
          type: "u64";
          index: false;
        },
        {
          name: "lp";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "CreateReferrerEvent";
      fields: [
        {
          name: "owner";
          type: "publicKey";
          index: false;
        },
        {
          name: "referee";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "InitializeEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "mintA";
          type: "publicKey";
          index: false;
        },
        {
          name: "mintB";
          type: "publicKey";
          index: false;
        },
        {
          name: "lpMint";
          type: "publicKey";
          index: false;
        },
        {
          name: "a";
          type: "u64";
          index: false;
        },
        {
          name: "b";
          type: "u64";
          index: false;
        },
        {
          name: "lp";
          type: "u64";
          index: false;
        },
        {
          name: "referralFee";
          type: "u64";
          index: false;
        },
        {
          name: "lpFee";
          type: "u64";
          index: false;
        },
        {
          name: "tax";
          type: "publicKey";
          index: false;
        },
        {
          name: "createdAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "PauseEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "updatedAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "RemoveLiquidityEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "a";
          type: "u64";
          index: false;
        },
        {
          name: "b";
          type: "u64";
          index: false;
        },
        {
          name: "lp";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "ResumeEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "updatedAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "SwapEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "bidMint";
          type: "publicKey";
          index: false;
        },
        {
          name: "askMint";
          type: "publicKey";
          index: false;
        },
        {
          name: "bidAmount";
          type: "u64";
          index: false;
        },
        {
          name: "askAmount";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "TransferOwnershipEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "newOwner";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "updatedAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "UpdateLPFeeEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "lpFee";
          type: "u64";
          index: false;
        },
        {
          name: "updatedAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "UpdateReferralFeeEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "pool";
          type: "publicKey";
          index: false;
        },
        {
          name: "referralFee";
          type: "u64";
          index: false;
        },
        {
          name: "updatedAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "UpdateTaxEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "newTax";
          type: "u64";
          index: false;
        },
        {
          name: "platformConfig";
          type: "publicKey";
          index: false;
        },
        {
          name: "updatedAt";
          type: "i64";
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "Overflow";
      msg: "Operation overflowed";
    },
    {
      code: 6001;
      name: "Unauthorized";
      msg: "Not have permission";
    },
    {
      code: 6002;
      name: "InvalidParams";
      msg: "Invalid params";
    },
    {
      code: 6003;
      name: "InvalidState";
      msg: "Invalid state";
    },
    {
      code: 6004;
      name: "UnmatchPool";
      msg: "Unmatch pool";
    },
    {
      code: 6005;
      name: "SwapFailed";
      msg: "Swap failed";
    },
    {
      code: 6006;
      name: "LargeSlippage";
      msg: "Large slippage";
    },
    {
      code: 6007;
      name: "InvalidPlatformConfig";
      msg: "Invalid platform config";
    },
    {
      code: 6008;
      name: "InvalidReferer";
      msg: "Invalid referer";
    }
  ];
};

export const IDL: ShieldDexPg = {
  version: "0.1.0",
  name: "shield_dex_pg",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "platformConfig",
          isMut: false,
          isSigner: false,
          docs: ["Which config the pool belongs to."],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: true,
          docs: ["Pool"],
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
          docs: ["Mint A"],
        },
        {
          name: "srcA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintB",
          isMut: false,
          isSigner: false,
          docs: ["Mint B"],
        },
        {
          name: "srcB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lpMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dstLp",
          isMut: true,
          isSigner: false,
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["System programs"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "a",
          type: "u64",
        },
        {
          name: "b",
          type: "u64",
        },
        {
          name: "referralFee",
          type: "u64",
        },
        {
          name: "solAmountForCustomFee",
          type: "u64",
        },
        {
          name: "fee",
          type: "u64",
        },
      ],
    },
    {
      name: "addLiquidity",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
          docs: ["Pool"],
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
          docs: ["Mint A"],
        },
        {
          name: "srcA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintB",
          isMut: false,
          isSigner: false,
          docs: ["Mint B"],
        },
        {
          name: "srcB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lpMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dstLp",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["System programs"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "a",
          type: "u64",
        },
        {
          name: "b",
          type: "u64",
        },
      ],
    },
    {
      name: "removeLiquidity",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
          docs: ["Pool"],
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
          docs: ["Mint A"],
        },
        {
          name: "treasuryA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dstA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintB",
          isMut: false,
          isSigner: false,
          docs: ["Mint B"],
        },
        {
          name: "treasuryB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dstB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lpMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "srcLp",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["System programs"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "lp",
          type: "u64",
        },
      ],
    },
    {
      name: "swap",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "platformConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bidMint",
          isMut: false,
          isSigner: false,
          docs: ["Bid Mint"],
        },
        {
          name: "bidSrc",
          isMut: true,
          isSigner: false,
        },
        {
          name: "bidTreasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "askMint",
          isMut: false,
          isSigner: false,
          docs: ["Ask Mint"],
        },
        {
          name: "askTreasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "askDst",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: false,
          isSigner: false,
        },
        {
          name: "taxDst",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["System programs"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bidAmount",
          type: "u64",
        },
        {
          name: "limit",
          type: "u64",
        },
      ],
      returns: "u64",
    },
    {
      name: "updateFee",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
      ],
      args: [
        {
          name: "fee",
          type: "u64",
        },
      ],
    },
    {
      name: "updateReferralFee",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
      ],
      args: [
        {
          name: "fee",
          type: "u64",
        },
      ],
    },
    {
      name: "updateTax",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "platformConfig",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
      ],
      args: [
        {
          name: "tax",
          type: "u64",
        },
      ],
    },
    {
      name: "transferOwnership",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
      ],
      args: [
        {
          name: "newOwner",
          type: "publicKey",
        },
      ],
    },
    {
      name: "pause",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
      ],
      args: [],
    },
    {
      name: "resume",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool"],
        },
      ],
      args: [],
    },
    {
      name: "createPlatformConfig",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
          docs: ["Address to be set as protocol owner."],
        },
        {
          name: "platformConfig",
          isMut: true,
          isSigner: true,
          docs: [
            "Initialize config state account to store protocol owner address and fee rates.",
          ],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tax",
          type: "u64",
        },
      ],
    },
    {
      name: "updatePlatformConfig",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
          docs: ["Address to be set as protocol owner."],
        },
        {
          name: "platformConfig",
          isMut: true,
          isSigner: false,
          docs: [
            "Initialize config state account to store protocol owner address and fee rates.",
          ],
        },
      ],
      args: [
        {
          name: "tax",
          type: "u64",
        },
      ],
    },
    {
      name: "distributeLpFee",
      accounts: [
        {
          name: "owner",
          isMut: false,
          isSigner: true,
          docs: ["Only admin or owner can collect fee now"],
        },
        {
          name: "escrow",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
          docs: ["Pool state stores accumulated protocol fee amount"],
        },
        {
          name: "platformConfig",
          isMut: false,
          isSigner: false,
          docs: ["Platform config account stores owner"],
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
          docs: ["Mint B"],
        },
        {
          name: "mintB",
          isMut: false,
          isSigner: false,
          docs: ["Mint B"],
        },
        {
          name: "treasuryA",
          isMut: true,
          isSigner: false,
          docs: ["The address that holds pool tokens for token_a"],
        },
        {
          name: "treasuryB",
          isMut: true,
          isSigner: false,
          docs: ["The address that holds pool tokens for token_b"],
        },
        {
          name: "recipientTokenAAccount",
          isMut: true,
          isSigner: false,
          docs: [
            "The address that receives the collected token_0 protocol fees",
          ],
        },
        {
          name: "recipientTokenBAccount",
          isMut: true,
          isSigner: false,
          docs: [
            "The address that receives the collected token_1 protocol fees",
          ],
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["The SPL program to perform token transfers"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amountARequested",
          type: "u64",
        },
        {
          name: "amountBRequested",
          type: "u64",
        },
      ],
    },
    {
      name: "createReferrer",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["Authority"],
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "referrer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "refererAddress",
          type: "publicKey",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "platformConfig",
      docs: ["", "Referrer struct", ""],
      type: {
        kind: "struct",
        fields: [
          {
            name: "tax",
            type: "u64",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "updatedAt",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "pool",
      docs: ["", "Pool struct", ""],
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "lpMint",
            type: "publicKey",
          },
          {
            name: "mintA",
            type: "publicKey",
          },
          {
            name: "mintB",
            type: "publicKey",
          },
          {
            name: "referralFee",
            type: "u64",
          },
          {
            name: "lpFee",
            type: "u64",
          },
          {
            name: "tax",
            type: "publicKey",
          },
          {
            name: "state",
            type: {
              defined: "PoolState",
            },
          },
          {
            name: "lpFeesMintA",
            type: "u64",
          },
          {
            name: "lpFeesMintB",
            type: "u64",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "updatedAt",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "referrer",
      docs: ["", "Referrer struct", ""],
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "referee",
            type: "publicKey",
          },
          {
            name: "pool",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "PoolState",
      docs: ["", "Pool state", ""],
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "Initialized",
          },
          {
            name: "Paused",
          },
          {
            name: "Canceled",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "AddLiquidityEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "a",
          type: "u64",
          index: false,
        },
        {
          name: "b",
          type: "u64",
          index: false,
        },
        {
          name: "lp",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CreateReferrerEvent",
      fields: [
        {
          name: "owner",
          type: "publicKey",
          index: false,
        },
        {
          name: "referee",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "InitializeEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "mintA",
          type: "publicKey",
          index: false,
        },
        {
          name: "mintB",
          type: "publicKey",
          index: false,
        },
        {
          name: "lpMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "a",
          type: "u64",
          index: false,
        },
        {
          name: "b",
          type: "u64",
          index: false,
        },
        {
          name: "lp",
          type: "u64",
          index: false,
        },
        {
          name: "referralFee",
          type: "u64",
          index: false,
        },
        {
          name: "lpFee",
          type: "u64",
          index: false,
        },
        {
          name: "tax",
          type: "publicKey",
          index: false,
        },
        {
          name: "createdAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "PauseEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "updatedAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "RemoveLiquidityEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "a",
          type: "u64",
          index: false,
        },
        {
          name: "b",
          type: "u64",
          index: false,
        },
        {
          name: "lp",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "ResumeEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "updatedAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "SwapEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "bidMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "askMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "bidAmount",
          type: "u64",
          index: false,
        },
        {
          name: "askAmount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "TransferOwnershipEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "newOwner",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "updatedAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "UpdateLPFeeEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "lpFee",
          type: "u64",
          index: false,
        },
        {
          name: "updatedAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "UpdateReferralFeeEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "pool",
          type: "publicKey",
          index: false,
        },
        {
          name: "referralFee",
          type: "u64",
          index: false,
        },
        {
          name: "updatedAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "UpdateTaxEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "newTax",
          type: "u64",
          index: false,
        },
        {
          name: "platformConfig",
          type: "publicKey",
          index: false,
        },
        {
          name: "updatedAt",
          type: "i64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Overflow",
      msg: "Operation overflowed",
    },
    {
      code: 6001,
      name: "Unauthorized",
      msg: "Not have permission",
    },
    {
      code: 6002,
      name: "InvalidParams",
      msg: "Invalid params",
    },
    {
      code: 6003,
      name: "InvalidState",
      msg: "Invalid state",
    },
    {
      code: 6004,
      name: "UnmatchPool",
      msg: "Unmatch pool",
    },
    {
      code: 6005,
      name: "SwapFailed",
      msg: "Swap failed",
    },
    {
      code: 6006,
      name: "LargeSlippage",
      msg: "Large slippage",
    },
    {
      code: 6007,
      name: "InvalidPlatformConfig",
      msg: "Invalid platform config",
    },
    {
      code: 6008,
      name: "InvalidReferer",
      msg: "Invalid referer",
    },
  ],
};

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
  "7xCZgNDZ6da6Rup5eztPfPxuVNwVuvRac3nQK9U5ggEg"
);
