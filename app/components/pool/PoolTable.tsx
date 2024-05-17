import PoolRecord from "./PoolRecord";
import ModalCreatePool from "./create-pool-modal";

const PoolTable = () => {
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <p className="text-primary-content text-[38px] leading-[52px] font-bold">
          Liquidity Pools
        </p>
        <ModalCreatePool />
      </div>
      <div className="flex gap-2 items-center mb-2">
        <label className="input flex items-center gap-2 w-[256px] rounded-[50px] bg-[#EEEEEE]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="text" className="grow" placeholder="Search" />
        </label>
        <select className="select rounded-[50px] bg-transparent border focus:border-[--stroke-default] border-[--stroke-default] focus:outline-none focus:ring-0">
          <option selected>1D</option>
          <option>1W</option>
          <option>1M</option>
        </select>
        <label className="cursor-pointer label flex gap-2">
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-accent [--tglbg:#CFD0D0] border-none"
          />
          <span className="label-text text-secondary">Your Liquidity</span>
        </label>
      </div>
      <div>
        {/* table header */}
        <div className="grid pl-4 grid-cols-4 bg-[--bg-header] text-primary-content rounded-2xl mb-1 h-14 items-center">
          <div className="flex-1">Pool</div>
          <div className="flex-1">Liquidity</div>
          <div className="flex-1">Volume 24H</div>
          <div className="flex-1">Fee 24H</div>
        </div>
        <div className="w-full">
          {/* <PoolRecord />
          <PoolRecord />
          <PoolRecord />
          <PoolRecord /> */}
        </div>
      </div>
    </div>
  );
};

export default PoolTable;
