import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Flex, Heading, Text, Card } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  if (typeof parseInt(params.id) !== 'number') notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  })

  if (!issue) notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  )
}
