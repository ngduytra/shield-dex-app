"use client";
import { useEffect, useMemo, useState } from "react";
import LazyLoad from "react-lazy-load";

import { ArrowDown2 } from "iconsax-react";
import Image from "next/image";
import Modal from "../modal";
import Island from "../island";

import { useMintStore, useSearchMint } from "@/providers/mint.provider";

import { getUnknownToken } from "@/helpers";
import { useRandomMintMetadata } from "@/hooks/useTokenInfo";

const RenderToken = ({
  onClick,
  token,
}: {
  onClick: () => void;
  token: MintMetadata;
}) => {
  const { logoURI, symbol } = token;
  return (
    <div
      onClick={onClick}
      className="w-fit rounded-[30px] pl-1 py-[6px] pr-2 border border-[--stroke-default] flex items-center gap-2 cursor-pointer"
    >
      <Image src={logoURI} width={24} height={24} alt="token" />
      <p className="text-primary-content leading-6">{symbol}</p>
    </div>
  );
};

const RenderCommonToken = ({ mint }: { mint: MintMetadata }) => {
  return (
    <>
      <Image src={mint.logoURI} width={36} height={36} alt="list-token" />
      <div>
        <p className="text-primary-content">{mint.name}</p>
        <p className="text-secondary text-[14px]">{mint.symbol}</p>
      </div>
    </>
  );
};

type ModalTokenSelectionProps = {
  selectedAddress: string;
  onChange: (t: MintMetadata) => void;
};

const ModalTokenSelection = ({
  selectedAddress,
  onChange,
}: ModalTokenSelectionProps) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const metadata = useMintStore(({ metadata }) => Object.values(metadata));
  const [mints, setMints] = useState<MintMetadata[] | undefined>();
  const randMints = useRandomMintMetadata();
  const search = useSearchMint();
  const selectedToken = useMemo(() => {
    const tokenInfo = metadata.find((mint) => mint.address === selectedAddress);
    if (!tokenInfo) return getUnknownToken(selectedAddress);
    return tokenInfo;
  }, [metadata, selectedAddress]);

  useEffect(() => {
    if (!text.length) setMints(undefined);
    else if (text.length <= 2) setMints([]);
    else setMints(search(text).map(({ item }) => item));
  }, [text, search]);

  useEffect(() => {
    if (!open) setText("");
  }, [open]);

  const toggle = () => {
    setOpen(!open);
  };

  const handleSetToken = (t: MintMetadata) => {
    onChange(t);
    toggle();
  };

  return (
    <>
      <button
        onClick={toggle}
        className="rounded-[30px] text-primary-content p-3 border border-[--stroke-default] inline-flex items-center gap-2"
      >
        <Image
          src={selectedToken?.logoURI || ""}
          width={24}
          height={24}
          alt="selected-token"
          className="rounded-full bg-black"
        />
        {selectedToken?.symbol}
        <ArrowDown2 size={10} />
      </button>
      <Modal className="bg-[--bg-header]" open={open} onCancel={toggle}>
        <p className="mb-8 text-xl font-bold leading-7 text-primary-content">
          Select a token
        </p>
        <label className="input flex items-center gap-2 bg-[--oncard-bg-default] rounded-[50px] text-[14px] placeholder:text-secondary-content mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow focus:ring-0"
            placeholder="Search name or paste address"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <Island>
          <div className="pb-6 mb-6 border-b border-[--stroke-default]">
            <p className="mb-2 text-secondary font-light">Popular tokens</p>
            <div className="flex items-center gap-4">
              {[]?.map((token, idx) => (
                <LazyLoad height={64} key={`token-select-${idx}`}>
                  <RenderToken
                    onClick={() => handleSetToken(token)}
                    token={token}
                  />
                </LazyLoad>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {(mints || randMints)?.map((mint, idx) => (
              <div
                key={idx}
                onClick={() => handleSetToken(mint)}
                className="p-2 rounded-lg flex gap-3 items-center cursor-pointer duration-150 ease-linear transition-all hover:bg-secondary/10"
              >
                <LazyLoad height={64}>
                  <RenderCommonToken mint={mint} />
                </LazyLoad>
              </div>
            ))}
          </div>
        </Island>
      </Modal>
    </>
  );
};

export default ModalTokenSelection;
