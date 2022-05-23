import { ReactNode } from "react";

type VisibleProps = {
  children: ReactNode;
  condition: boolean;
};

export const Visible = ({ children, condition }: VisibleProps) => {
  if (!condition) return <></>;

  return <>{children}</>;
};
