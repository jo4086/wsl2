import cn from 'classnames'

interface PopButtonProps {
  label: string
  target: string
}

export const PopButton = ({ label = 'label', target }: PopButtonProps) => {
  return (
    <>
      <button className={cn(`${label}-button`)} popoverTarget={target}></button>
    </>
  )
}
