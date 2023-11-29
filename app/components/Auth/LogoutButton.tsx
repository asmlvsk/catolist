import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import React from "react";

export default function LogoutButton() {
  return (
    <form action="/auth/signout" method="post">
      <Button
        endContent={<ArrowRightOnRectangleIcon width={20} height={20} />}
        className=""
        type="submit"
        color="primary"
      >
        Sign out
      </Button>
    </form>
  );
}
