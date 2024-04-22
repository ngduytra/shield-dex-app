import { ReactNode, useId } from "react";

type DrawerProps = {
  open?: boolean;
  onCancel?: () => void;
  children?: ReactNode;
  className?: string;
};
const Drawer = ({
  onCancel = () => {},
  open = false,
  children,
  className,
}: DrawerProps) => {
  const id = useId();
  return (
    <div className="drawer">
      <input
        id={`drawer_${id}`}
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => {}}
      />
      <div className="drawer-side z-50">
        <label className="drawer-overlay" onClick={onCancel} />
        <div
          className={`relative p-4 w-full h-full bg-[--bg-body] ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
