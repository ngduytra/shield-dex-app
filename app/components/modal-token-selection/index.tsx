import FconIcon from "@/assets/images/fcon-logo.png";
import SolIcon from "@/assets/images/sol-icon.png";
import { TokenSelection } from "@/types/token";
import { ArrowDown2 } from "iconsax-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "../modal";

const RenderToken = ({
  onClick,
  token,
}: {
  onClick: () => void;
  token: TokenSelection;
}) => {
  const { disabled, image, name, symbol } = token;
  return (
    <div
      onClick={onClick}
      className="w-fit rounded-[30px] pl-1 py-[6px] pr-2 border border-[--stroke-default] flex items-center gap-2 cursor-pointer"
    >
      <Image src={image} width={24} height={24} alt="token" />
      <p className="text-primary-content leading-6">{symbol}</p>
    </div>
  );
};

const tokens: TokenSelection[] = [
  {
    name: "SpaceFalcon",
    symbol: "FCON",
    image: FconIcon.src,
    disabled: false,
  },
  {
    name: "Solana",
    symbol: "SOL",
    image: SolIcon.src,
    disabled: false,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    image: SolIcon.src,
    disabled: false,
  },
];

const ModalTokenSelection = () => {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenSelection>(tokens[0]);

  const toggle = () => {
    setOpen(!open);
  };

  const handleSetToken = (t: TokenSelection) => {
    setSelectedToken(t);
    toggle();
  };

  return (
    <>
      <button
        onClick={toggle}
        className="rounded-[30px] text-primary-content p-3 border border-[--stroke-default] inline-flex items-center gap-2"
      >
        <Image
          src={selectedToken?.image}
          width={24}
          height={24}
          alt="selected-token"
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
          />
        </label>
        <div className="pb-6 mb-6 border-b border-[--stroke-default]">
          <p className="mb-2 text-secondary font-light">Popular tokens</p>
          <div className="flex items-center gap-4">
            {tokens.map((token, idx) => (
              <RenderToken
                key={`token-select-${idx}`}
                onClick={() => handleSetToken(token)}
                token={token}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {tokens.map((token, idx) => (
            <div
              onClick={() => handleSetToken(token)}
              className="p-2 rounded-lg flex gap-3 items-center cursor-pointer duration-150 ease-linear transition-all hover:bg-secondary/10"
            >
              <Image
                src={token.image}
                width={36}
                height={36}
                alt="list-token"
              />
              <div>
                <p className="text-primary-content">{token.name}</p>
                <p className="text-secondary text-[14px]">{token.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalTokenSelection;
