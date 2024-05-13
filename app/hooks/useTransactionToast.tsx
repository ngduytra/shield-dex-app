import toast from "react-hot-toast";
import { ExplorerLink } from "@/components/explorer-link";

export function useTransactionToast() {
  return (signature: string, text?: string) => {
    toast.success(
      <div className={"text-center"}>
        <div className="text-lg">{text || "Transaction sent"}</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={"View Transaction"}
          className="btn btn-xs btn-primary"
        />
      </div>
    );
  };
}
