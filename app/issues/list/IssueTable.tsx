import React from "react";
import { Table, Avatar } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "../../components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import ArrowIcon from "./ArrowIcon";

interface ExtendedIssue extends Issue {
  assignedToUser?: {
    image: string | null;
  } | null;
}

export interface IssueQuery {
  status: Status;
  orderBy: keyof ExtendedIssue;
  page: string;
  sortOrder: "asc" | "desc";
}

interface Props {
  searchParams: IssueQuery;
  issues: ExtendedIssue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const toggleOrder = () => {
    return !searchParams.sortOrder || searchParams.sortOrder === "desc"
      ? "asc"
      : "desc";
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sortOrder: toggleOrder(),
                  },
                }}
              >
                {column.label}
              <ArrowIcon
                columnVal={column.value}
                orderBy={searchParams.orderBy}
                sortOrder={searchParams.sortOrder}
              />
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              {issue.assignedToUser ? 
                <Avatar
                  src={issue.assignedToUser.image || undefined}
                  fallback='?'
                  size="1"
                  radius="full"
                  referrerPolicy='no-referrer'
                /> : ''}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof ExtendedIssue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  { label: "Assignee", value: "assignedToUserId", className: "hidden sm:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
