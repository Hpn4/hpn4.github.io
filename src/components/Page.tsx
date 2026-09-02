import type { ReactNode } from "react";
import "./Page.css";

export default function Page({ children }: { children: ReactNode }) {
  return <div className="page">{children}</div>;
}
