import React from 'react'

const InputField = ({label,type,name,value,onChange,placeHolder}) => {
  return (
    <div className="mb-4">
        <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
        />
  
    </div>
  )
}

export default InputField