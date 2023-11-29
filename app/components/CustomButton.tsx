import { Button } from "@nextui-org/react";
import React from "react";

type Props = {
  title: string;
  endIcon?: React.ReactNode;
};

export default function CustomButton({ title, endIcon }: Props) {
  return (
    <Button color="primary" endContent={endIcon}>
      {title}
    </Button>
  );
}
