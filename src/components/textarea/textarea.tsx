import { FC } from "react"

interface ITextarea {
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Textarea: FC<ITextarea> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      className="about"
      placeholder="Текст"
      onChange={(e) => onChange(e)}
    />
  )
}

export default Textarea
