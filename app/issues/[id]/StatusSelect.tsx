"use client";

import { Issue, Status } from "@prisma/client";
import { IssueStatusBadge } from "@/app/components";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const assignStatus = async (status: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      router.refresh();
    } catch {
      toast.error("Changes could not be saved");
    }
  };

  return (
    <>
      <Select.Root value={issue.status} onValueChange={assignStatus}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Current Status</Select.Label>
            {Object.values(Status).map((status) => (
              <Select.Item value={status} key={status}>
                <IssueStatusBadge status={status} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
