'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Spinner } from '@/app/components'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteIssue = async () => {
    try {
      setIsDeleting(true)
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues/list')
      router.refresh()
      setIsDeleting(false)
    } catch (error) {
      setIsDeleting(false)
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            Delete Issue
            { isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={deleteIssue} variant="solid" color="red">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button mt='2' onClick={() => setError(false)} variant="soft" color="gray">
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton