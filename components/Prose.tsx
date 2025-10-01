// components/Prose.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Prose({ children, className }: Props) {
  return <article className={`prose ${className ?? ""}`}>{children}</article>;
}
