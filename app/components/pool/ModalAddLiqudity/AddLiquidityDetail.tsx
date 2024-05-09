import { ArrowDown2, ArrowUp2, InfoCircle } from "iconsax-react";
import { useState } from "react";

const AddLiquidityDetail = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="p-3 rounded-xl border border-[--stroke-default] flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="text-secondary text-[14px] font-light">Total value</p>
        <p className="text-primary-content font-medium">$1,850</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-secondary text-[14px] font-light">
          Pool liquidity (SOL)
        </p>
        <p className="text-primary-content">43,790 SOL</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-secondary text-[14px] font-light">
          Pool liquidity (FCON)
        </p>
        <p className="text-primary-content">2,866,156.5 FCON</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-secondary text-[14px] font-light">LP supply</p>
        <p className="text-primary-content">988,648 LP</p>
      </div>
      {showMore ? (
        <>
          <div className="flex justify-between items-center">
            <div className="text-secondary relative text-[14px] font-light flex items-center gap-1 ">
              Fees
              <div className=" group z-10 cursor-pointer">
                <InfoCircle size={16} />
                <div className="absolute text-primary-content p-3 w-[236px] rounded-xl bg-[--bg-header] opacity-0 -z-10 group-hover:opacity-100 group-hover:z-[9999] -left-52 -bottom-14 shadow-lg">
                  This fee includes transaction fee + platform fee + creator
                  fee.
                </div>
              </div>
            </div>
            <p className="text-primary-content">0.0003 SOL</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-secondary text-[14px] font-light">
              Referral fee
            </p>
            <p className="text-primary-content">0.0003 SOL</p>
          </div>
        </>
      ) : null}
      <label className="swap text-secondary text-[14px] mb-8">
        <input
          onClick={(e: any) => setShowMore(e.target?.checked)}
          type="checkbox"
        />
        <div className="swap-off flex gap-1 items-center">
          Hide <ArrowUp2 size={12} />
        </div>
        <div className="swap-on flex gap-1 items-center">
          More information <ArrowDown2 size={12} />
        </div>
      </label>
    </div>
  );
};

export default AddLiquidityDetail;
