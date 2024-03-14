import { tv } from 'tailwind-variants'

const FormContainer = tv({
  base: 'w-fit h-fit min-w-[350px] max-w-[90vw] max-h-[90vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[1px] p-[24px] rounded-md',
})

export const styles = {
  FormContainer,
}
