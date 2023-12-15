"use client"

import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Issue } from '@prisma/client'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueFormData = z.infer<typeof issueSchema>

interface Props {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues')
    } catch (error) {
      setError('Something went wrong...')
      setIsSubmitting(false)
    }
  })
  
  return (
    <div className='max-w-xl p-5 space-y-5'>
      {error && <Callout.Root color="red">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form
        className='space-y-3' 
        onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} ref={null} />}
        />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>{issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default IssueForm
