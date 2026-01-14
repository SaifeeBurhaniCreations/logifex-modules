import React, { useState } from 'react'
import { useMode } from '../../modes'
import { emitUIEvent } from '../../events'
import { InputLabel } from './InputLabel'
import { InputMessage } from './InputMessage'
import type { InputProps } from './input.types'

export function Input(props: InputProps) {
  const {
    id,
    label,
    value,
    defaultValue,
    placeholder,
    disabled,
    readOnly,
    mode,
    capability = 'edit',
    intent,
    message,
    children
  } = props

  const modeDef = useMode(mode)
  const canEdit = modeDef.allows(capability)

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')

  const currentValue = isControlled ? value! : internalValue

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value

    if (!isControlled) {
      setInternalValue(next)
    }

    if (intent) {
      emitUIEvent(
        intent(next)
      )
    }
  }

  return (
    <div className="lx-input">
      {label && <InputLabel>{label}</InputLabel>}

      <input
        id={id}
        className="lx-input-field"
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled || !canEdit}
        readOnly={readOnly || !canEdit}
        onChange={handleChange}
      />

      <InputMessage>{message}</InputMessage>

      {/* Pro-only extension zone */}
      {modeDef.allows('advanced-config') && children}
    </div>
  )
}