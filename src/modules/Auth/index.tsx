'use client'

import AuthForm from './components/AuthForm'
import { styles } from './tv'

const AuthPage = () => {
  return (
    <div className={styles.FormContainer()}>
      <AuthForm />
    </div>
  )
}

export default AuthPage
