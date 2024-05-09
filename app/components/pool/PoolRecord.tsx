import { ArrowSwapHorizontal } from "iconsax-react";
import ModalAddLiquidity from "./ModalAddLiqudity";
import RemoveLiquidity from "./RemoveLiquidity";

const PoolRecord = () => {
  return (
    <div className="collapse collapse-arrow bg-[--bg-header] mb-1 text-primary-content">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title grid grid-cols-4 pr-0">
        <div className="col-span-1">
          <div className="flex">
            <div className="flex-1 flex gap-1 items-center">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar border-transparent">
                  <div className="w-9">
                    <img src="https://s3-alpha.figma.com/hub/file/2204229748/ad1d22a9-445a-4a9d-8ad2-117c2ae9a299-cover.png" />
                  </div>
                </div>
                <div className="avatar border-transparent">
                  <div className="w-9">
                    <img src="https://s3-alpha.figma.com/hub/file/2204229748/ad1d22a9-445a-4a9d-8ad2-117c2ae9a299-cover.png" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium leading-6">SOL/FCON</p>
                <p className="bg-[--shadow] text-[#9FA1A0] h-[22px] rounded-[50px] text-center text-[14px]">
                  0.05%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">$54,449,290</div>
        <div className="col-span-1">$449,290</div>
        <div className="col-span-1">$290</div>
      </div>
      <div className="collapse-content grid grid-cols-4 py-2 pr-0">
        <div className="col-span-1">
          <p className="text-[#6E7271] text-[14px] mb-1">Your Liquidity</p>
          <p className="font-bold">$925</p>
          <p className="text-[#6E7271] text-[14px]">988,648 LP</p>
        </div>
        <div className="col-span-1">
          <p className="text-[#6E7271] text-[14px] mb-1">Assets pooled</p>
          <p>5 SOL</p>
          <p>1,988,648 FCON</p>
        </div>
        <div className="col-span-1">
          <p className="text-[#6E7271] text-[14px] mb-1">Your shared</p>
          <p>5%</p>
        </div>
        <div className="col-span-1 flex gap-2">
          <button className="w-10 h-10 rounded-full border border-[--stroke-default] flex items-center justify-center">
            <ArrowSwapHorizontal size={20} />
          </button>
          <RemoveLiquidity />
          <ModalAddLiquidity />
        </div>
      </div>
    </div>
  );
};

export default PoolRecord;
