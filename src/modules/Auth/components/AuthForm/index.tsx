'use client'
import Button from '@/common/components/base/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/components/base/Form/form'
import Input from '@/common/components/base/Input'
import userStore from '@/common/store/user/user-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const AuthForm = () => {
  const login = userStore((state) => state.login)
  const [error, setError] = useState('')

  const formSchema = z.object({
    username: z.string().min(4).max(15),
    password: z.string().min(4).max(20),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (await login(values.username, values.password)) window.location.href = '/'
      else setError('Username or password is incorrect')
    } catch (e) {
      setError('Username or password is incorrect')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[15px]" method="post">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>*{error}</FormMessage>}
        <div className="flex flex-row">
          <div className="w-full" />
          <Button type="submit" className="min-w-[90px]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AuthForm
