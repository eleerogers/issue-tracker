"use client";

import { Issue, Status } from "@prisma/client";
import { IssueStatusBadge } from "@/app/components";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<Status>(issue.status);

  useEffect(() => {
    setSelectedStatus(issue.status)
  }, [issue.status])

  const assignStatus = async (newStatus: Status) => {
    const previousStatus = selectedStatus;
    setSelectedStatus(newStatus);
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      router.refresh();
    } catch {
      setSelectedStatus(previousStatus)
      toast.error("Changes could not be saved");
    }
  };

  return (
    <>
      <Select.Root value={selectedStatus} onValueChange={assignStatus}>
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
