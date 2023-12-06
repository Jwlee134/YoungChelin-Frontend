import { Input, Select, SelectItem } from "@nextui-org/react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { LoginForm } from "./modals/LoginModal";

interface Props {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<FieldValues>;
}

export default function EmailInputs<T>({ register, errors }: Props) {
  return (
    <div className="flex items-center">
      <Input
        {...register("email", { required: true })}
        autoFocus
        label="이메일"
        variant="bordered"
      />
      <span className="mx-2 text-gray-400">@</span>
      <Select
        {...register("emailAddress", { required: true })}
        variant="bordered"
        label="주소 선택"
        className="w-52"
      >
        {["yu.ac.kr", "ynu.kr"].map((addr) => (
          <SelectItem key={addr} value={addr}>
            {addr}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
