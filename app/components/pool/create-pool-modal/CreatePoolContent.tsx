"use client";
import React, { useCallback, useMemo, useState } from "react";

import { ArrowDown2, ArrowUp2, Crown } from "iconsax-react";

import ModalTokenSelection from "@/components/modal-token-selection";

import { useShieldDexUiProgram } from "@/hooks/useShieldDexProgram";
import { useInitializePoolGlob } from ".";
import SimpleToken from "@/components/token-info/SimpleToken";
import TokenBalance from "@/components/token-info/TokenBalance";
import { InitializeAccounts, InitializeParams } from "@/types/program";
import { PublicKey } from "@solana/web3.js";
import { useGetTokenInfo } from "@/hooks/useTokenInfo";
import { BN } from "@coral-xyz/anchor";
import toast from "react-hot-toast";
import { decimalize, undecimalize } from "@/helpers/decimals";
import {
  useNativeBalance,
  useTokenAccountBalance,
} from "@/hooks/useAccountData";
import { useAnchorProvider } from "@/solana/solana-provider";
import { CUSTOM_SOL } from "@/constants";

const feeOptions = [
  {
    label: "0.01%",
    subLabel: "2% selected",
    value: 0.01,
  },
  {
    label: "0.02%",
    subLabel: "29% selected",
    value: 0.02,
  },
  {
    label: "0.03%",
    subLabel: "68% selected",
    value: 0.03,
  },
  {
    label: "0.04%",
    subLabel: "100% selected",
    value: 0.04,
  },
];

const customFeeOptions = [
  {
    label: "0.5%",
    subLabel: "0.1% selected",
    value: 0.5,
  },
  {
    label: "1%",
    subLabel: "0.1% selected",
    value: 1,
  },
  {
    label: "5%",
    subLabel: "0.1% selected",
    value: 5,
  },
  {
    label: "10%",
    subLabel: "0.1% selected",
    value: 10,
  },
];

export default function CreatePoolContent() {
  const provider = useAnchorProvider();
  const [openCustomFee, setOpenCustomFee] = useState(false);
  const { initialize } = useShieldDexUiProgram();
  const [initializeData, setIntializeData] = useInitializePoolGlob();
  const { getTokenInfo } = useGetTokenInfo();
  const balanceA = useTokenAccountBalance(initializeData.accounts.mintA);
  const balanceB = useTokenAccountBalance(initializeData.accounts.mintB);
  const balanceQuery = useNativeBalance(provider.publicKey?.toString());

  const onInitializePool = useCallback(async () => {
    const mintAInfo = getTokenInfo(initializeData.accounts.mintA);
    const mintBInfo = getTokenInfo(initializeData.accounts.mintB);
    if (!mintAInfo || !mintBInfo) return toast.error("Token is not valid");

    const amountA = decimalize(
      initializeData.params.amountA.toString(),
      mintAInfo?.decimals
    );
    const amountB = decimalize(
      initializeData.params.amountB.toString(),
      mintBInfo?.decimals
    );

    const data: {
      accounts: InitializeAccounts;
      params: InitializeParams;
    } = {
      accounts: {
        platformConfig: new PublicKey(
          initializeData.accounts.platformConfig || ""
        ),
        mintA: new PublicKey(initializeData.accounts.mintA),
        mintB: new PublicKey(initializeData.accounts.mintB),
      },
      params: {
        amountA: amountA,
        amountB: amountB,
        referralFee: new BN(initializeData.params.referralFee),
        solAmountForCustomFee: new BN(
          initializeData.params.solAmountForCustomFee
        ),
        fee: new BN(initializeData.params.fee),
      },
    };
    await initialize.mutateAsync(data);
  }, [
    getTokenInfo,
    initialize,
    initializeData.accounts.mintA,
    initializeData.accounts.mintB,
    initializeData.accounts.platformConfig,
    initializeData.params.amountA,
    initializeData.params.amountB,
    initializeData.params.fee,
    initializeData.params.referralFee,
    initializeData.params.solAmountForCustomFee,
  ]);

  const isDisabled = useMemo(() => {
    if (
      !balanceA.data?.value.uiAmount ||
      !balanceB.data?.value.uiAmount ||
      initializeData.params.amountA === 0 ||
      initializeData.params.amountB === 0
    )
      return true;
    if (
      initializeData.params.fee > 0.04 &&
      balanceQuery.data &&
      Number(undecimalize(new BN(balanceQuery.data?.valueOf()), 9)) < CUSTOM_SOL
    )
      return true;

    return (
      balanceA.data?.value.uiAmount < initializeData.params.amountA ||
      balanceB.data?.value.uiAmount < initializeData.params.amountB
    );
  }, [
    balanceA.data?.value.uiAmount,
    balanceB.data?.value.uiAmount,
    balanceQuery.data,
    initializeData.params.amountA,
    initializeData.params.amountB,
    initializeData.params.fee,
  ]);

  return (
    <div>
      <p className="font-bold text-xl mb-8">Create pool</p>
      <div className="mb-6">
        <p className="font-medium mb-2">Select token pair</p>
        <div className="flex gap-4">
          <ModalTokenSelection
            selectedAddress={initializeData.accounts.mintA}
            onChange={(mintInfo) => {
              setIntializeData((prev) => ({
                ...prev,
                accounts: { ...prev.accounts, mintA: mintInfo.address },
              }));
            }}
          />
          <ModalTokenSelection
            selectedAddress={initializeData.accounts.mintB}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="mb-6">
        <p className="font-medium mb-2">Select fee</p>
        <div className="flex gap-2">
          {feeOptions.map((opt, idx) => (
            <div key={`fee-${idx}`} className="flex-1">
              <input
                type="radio"
                id={opt.value.toString()}
                name="fee"
                value={opt.value}
                className="hidden peer"
                required
                onChange={(e) => {
                  setIntializeData((prev) => ({
                    ...prev,
                    params: { ...prev.params, fee: Number(e.target.value) },
                  }));
                }}
              />
              <label
                htmlFor={opt.value.toString()}
                className="inline-flex items-center peer-checked:text-[--label-active] w-full p-2 text-secondary bg-[--bg-header] border border-[--stroke-default] rounded-lg cursor-pointer peer-checked:border-primary"
              >
                <div className="block flex-1 peer-checked:text-red-500">
                  <div className="w-full mb-1">{opt.label}</div>
                  <div className="w-full h-[22px] flex items-center justify-center text-secondary text-xs rounded-[30px] bg-[--neutral-reverse]">
                    {opt.subLabel}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={openCustomFee ? "" : "hidden"}>
        <div className="flex items-center gap-1">
          <Crown variant="Bold" color="#C28B02" size={16} />
          <p className="text-[#C28B02] font-normal text-[14px]">Custom fee</p>
        </div>
        <p className="text-secondary text-xs leading-5 mb-3">
          You need to pay 5 SOL to use this Premium feature. Protocol fee will
          match the LP creator fee.
        </p>

        <div className={"flex gap-2 mb-3"}>
          {customFeeOptions.map((opt, idx) => (
            <div key={`custom-fee-${idx}`} className="flex-1">
              <input
                type="radio"
                id={opt.value.toString()}
                name="custom-fee"
                value={opt.value}
                className="hidden peer"
                required
                onChange={(e) => {
                  setIntializeData((prev) => ({
                    ...prev,
                    params: { ...prev.params, fee: Number(e.target.value) },
                  }));
                }}
              />
              <label
                htmlFor={opt.value.toString()}
                className="inline-flex items-center peer-checked:text-[--label-active] w-full p-2 text-secondary bg-[--bg-header] border border-[--stroke-default] rounded-lg cursor-pointer peer-checked:border-primary"
              >
                <div className="block flex-1 peer-checked:text-red-500">
                  <div className="w-full mb-1">{opt.label}</div>
                  <div className="w-full h-[22px] flex items-center justify-center text-secondary text-xs rounded-[30px] bg-[--neutral-reverse]">
                    {opt.subLabel}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <label className="swap text-secondary text-[14px] mb-8">
        <input
          onClick={(e: any) => setOpenCustomFee(e.target?.checked)}
          type="checkbox"
        />
        <div className="swap-on flex gap-1 items-center">
          Hide <ArrowUp2 size={12} />
        </div>
        <div className="swap-off flex gap-1 items-center">
          Custom fee <ArrowDown2 size={12} />
        </div>
      </label>
      <div className="mb-8">
        <p className="text-primary-content font-medium">Referral fee</p>
        <p className="text-secondary text-[14px] mb-3">
          This is % of selected fee that goes to community users who add LP.
        </p>
        <label className="input flex items-center gap-2 rounded-[50px] bg-[--oncard-bg-default] focus-within:border-transparent focus-within:ring-0 focus-within:outline-none">
          <input
            max={100}
            min={0}
            type="number"
            className="grow placeholder:text-[14px]"
            placeholder="Input your referral fee"
            onChange={(e) => {
              setIntializeData((prev) => ({
                ...prev,
                params: { ...prev.params, referralFee: Number(e.target.value) },
              }));
            }}
          />
          <span>%</span>
        </label>
      </div>
      <div className="mb-8 space-y-3">
        <p className="text-primary-content font-medium">Deposit amount</p>
        <div className="bg-[--oncard-bg-default] p-3 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <input
              type="number"
              className="bg-transparent placeholder:text-2xl font-bold text-2xl placeholder:text-[--disabled-color] h-[34px] focus:outline-none focus:ring-0 flex-1"
              placeholder="0.00"
              onChange={(e) => {
                setIntializeData((prev) => ({
                  ...prev,
                  params: {
                    ...prev.params,
                    amountA: Number(e.target.value),
                  },
                }));
              }}
            />
            <SimpleToken tokenAddress={initializeData.accounts.mintA} />
          </div>
          <TokenBalance tokenAddress={initializeData.accounts.mintA} />
        </div>
        <div className="bg-[--oncard-bg-default] p-3 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <input
              type="text"
              className="bg-transparent placeholder:text-2xl font-bold text-2xl placeholder:text-[--disabled-color] h-[34px] focus:outline-none focus:ring-0 flex-1"
              placeholder="0.00"
              onChange={(e) => {
                setIntializeData((prev) => ({
                  ...prev,
                  params: {
                    ...prev.params,
                    amountB: Number(e.target.value),
                  },
                }));
              }}
            />
            <SimpleToken tokenAddress={initializeData.accounts.mintB} />
          </div>
          <TokenBalance tokenAddress={initializeData.accounts.mintB} />
        </div>
        <div className="border border-[--stroke-default] flex items-center justify-between py-3 px-4 rounded-xl bg-[--bg-header]">
          <p>Total deposit</p>
          <p>2$</p>
        </div>
      </div>
      <button
        className="container btn rounded-3xl btn-primary"
        onClick={onInitializePool}
        disabled={isDisabled}
      >
        Create
      </button>
    </div>
  );
}
