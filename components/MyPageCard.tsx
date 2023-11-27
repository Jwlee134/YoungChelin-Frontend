"use client";

import { Card, CardBody } from "@nextui-org/react";

interface Props {
  label: string;
  onPress: () => void;
}

export default function MyPageCard({ label, onPress }: Props) {
  return (
    <Card shadow="sm" radius="sm" isPressable onPress={onPress}>
      <CardBody>
        <div className="text-sm">{label}</div>
      </CardBody>
    </Card>
  );
}
