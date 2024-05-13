
import ModalTokenSelection from "../modal-token-selection";

export default function Pay() {
  return (
    <div className="bg-[--bg-header] p-4 rounded-2xl flex justify-between">
      <div className=" space-y-3">
        <div className="text-primary-content">
          <span>You Pay</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary-content leading-[34px]">
            10.5
          </p>
          <p className="text-secondary text-sm font-light leading-[22px]">
            $1,942.5
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <p className="text-secondary text-sm">Balance: 10.5</p>
        </div>
        <div>
          <ModalTokenSelection />
        </div>
      </div>
    </div>
  );
}
