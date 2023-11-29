"use client";

import { updateUserPrivatness } from "@/actions/update-user-privatness";
import { updateUserProfile } from "@/actions/update-user-profile";
import { Button, Input, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  profile: Profile | null;
};

export default function ProfileFields({ profile }: Props) {
  const [lastCallTime, setLastCallTime] = useState(0);
  const [nickname, setNickname] = useState<string>(profile?.nickname!);
  const nicknameMinLength = 3;
  const nicknameMaxLength = 100;
  const nickErrors =
    nickname.length < nicknameMinLength && nickname.length > nicknameMaxLength;
  const nicknameErros = nickErrors && "Nickname is too short or too long";

  const handleUpdatePrivateStatus = async (e: boolean) => {
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= 1000) {
      const response = await updateUserPrivatness(e).then((val) => {
        val?.status === 200 || 201
          ? toast.success(val?.message)
          : toast.error(val?.error);
      });
      setLastCallTime(currentTime);
    } else {
      toast.message("Don't spam!");
    }
  };

  const handleUpdateProfile = async () => {
    if (nickErrors) return;
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= 1000) {
      const response = await updateUserProfile({ nickname }).then((val) => {
        val?.status === (200 || 201)
          ? toast.success(val?.message)
          : val?.status === 400
          ? toast.error(val?.message)
          : toast.error("Something goes wrong");
      });
      setLastCallTime(currentTime);
    } else {
      toast.message("Don't spam!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="nickname">Nickname</label>
        <Input
          id="nickname"
          type="text"
          className="max-w-xs"
          value={nickname}
          errorMessage={nicknameErros}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button color="primary" onClick={handleUpdateProfile}>
          Update
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <p>Private profile</p>
        <Switch
          isSelected={profile?.private}
          onValueChange={(e) => handleUpdatePrivateStatus(e)}
        ></Switch>
      </div>
    </div>
  );
}
