import { FC } from "react"
import scss from "./filter-panel.module.scss"

interface IFilterPanel {
  text: string
  onClick: () => void
  disabled: boolean
}

const FilterPanel: FC<IFilterPanel> = ({ text, onClick, disabled }) => {
  return (
    <button disabled={disabled} className={scss.panel} onClick={onClick}>
      <p>{text}</p>
    </button>
  )
}

export default FilterPanel
