type DividerProps = {
  className?: string
}

export function Divider({ className = '' }: DividerProps) {
  return <hr className={`border-t border-b-0 border-(--color-border) ${className}`.trim()} />
}
