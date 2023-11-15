"use client"

import { Button, TextField, Callout } from '@radix-ui/themes'

import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState('')
  
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
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues')
          } catch (error) {
            setError('Something went wrong...')
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
