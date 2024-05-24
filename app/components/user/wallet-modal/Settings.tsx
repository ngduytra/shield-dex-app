import { classNames } from "@/utils/string";
import { ArrowLeft } from "iconsax-react";
import { useState } from "react";

const Settings = () => {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-9 text-primary-content">
        <a href="#item1" className="inline-flex items-center gap-1">
          <ArrowLeft /> Back
        </a>
        <p className="text-primary-content text-xl font-bold leaidng-7">
          Settings
        </p>
        <div className="w-5"></div>
      </div>
      <div className="flex justify-between items-center">
        <p className=" text-primary-content">Default explorer</p>
        <select className="select-md w-32 rounded-[50px] border">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="396"
        height="2"
        fill="none"
        viewBox="0 0 396 2"
        className="my-6"
      >
        <path stroke="#E7E8E8" strokeLinecap="round" d="M1 1h394"></path>
      </svg>
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-primary-content">Global Priority Fee</p>
        <input
          checked={checked}
          onChange={toggle}
          type="checkbox"
          className="toggle  checked:[--tglbg:#0EF195] [--tglbg:#CFD0D0] text-secondary border-none"
        />
      </div>
      <p className="text-[14px] text-secondary mb-6">
        This fee is paid to the Solana network. This additional fee helps boost
        how a transaction is prioritized against others, resulting in faster
        transaction execution times.
      </p>
      <div
        className={classNames(
          "transition-all duration-100 ease-linear",
          checked ? "opacity-100 h-fit" : "h-0 opacity-0"
        )}
      >
        <p className="inline-flex gap-6 mb-3">
          <span className="font-medium text-primary-content">Max fee</span>
          <span className="text-secondary">Exact fee</span>
        </p>
        <p className="tecxt-[14px] leading-5 text-secondary mb-6">
          Shield Dex intelligently minimizes and decides the best fee for you.
          Set a max fee to prevent overpaying.
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 text-primary-content h-10 rounded-[10px] px-3 bg-[--oncard-bg-default] focus:border-0 focus:outline-none"
          />
          <button className="text-primary-content bg-primary h-10 w-16 rounded-[100px] text-center">
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
