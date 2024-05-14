import { Chart, DollarSquare } from "iconsax-react";

const TVL = () => {
  return (
    <div className="flex justify-center gap-8">
      <div className="rounded-[20px] bg-white p-4 justify-between w-[268px] flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">$782,568.635</p>
          <div className="bg-[#D9EDE5] rounded-lg w-9 h-9 flex items-center justify-center">
            <DollarSquare className="text-[--chart-up]" />
          </div>
        </div>
        <p className="text-[14px] text-secondary">Total value locked</p>
      </div>
      <div className="rounded-[20px] bg-white p-4 justify-between w-[288px] flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">$1,782,568.635</p>
          <div className="bg-[#EAE5FB] rounded-lg w-9 h-9 flex items-center justify-center">
            <Chart color="#7553E6" size={20} />
          </div>
        </div>
        <p className="text-[14px] text-secondary">Volume 24H</p>
      </div>
    </div>
  );
};

export default TVL;
