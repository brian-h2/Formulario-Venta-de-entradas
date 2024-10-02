import React from 'react'

const InputField = ({img,type,name,value,onChange,placeHolder}) => {
  return (
    <div className="mb-4 px-5">
        {img && <img src={img}  alt="icon" class="w-10 absolute pt-2 py-1 px-2" />}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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