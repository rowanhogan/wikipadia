import React from 'react'

const Toggle = ({ label, name, checked, onChange }) => (
  <label className='toggle-label' htmlFor={name}>
    <span>{label}</span>
    <div className='toggle'>
      <input
        id={name}
        className='toggle-input'
        type='checkbox'
        name={name}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(name, checked)}
      />
      <span className='toggle-ui' />
    </div>
  </label>
)

export default Toggle
