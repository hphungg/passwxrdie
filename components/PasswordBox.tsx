"use client"

import React, { useEffect } from 'react'

interface PasswordBoxProps {
	password: string;
	setPassword: (password: string) => void;
	textareaRef: React.RefObject<HTMLTextAreaElement>;
}

function PasswordBox({ password, setPassword, textareaRef }: PasswordBoxProps) {
	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setPassword(e.target.value)
	}

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	});

	return (
		<>
			<div className='text-left text-base mb-2 px-1'>
				Nhập mật khẩu
				<span className='text-right float-right'>
					{password.length}
				</span>
			</div>

			<textarea 
				id="passbox" 
				placeholder='Mật khẩu' 
				rows={1}
				value={password}
				onChange={handleChange}
				spellCheck={false} 
				ref={textareaRef}
				className='w-full border-2 p-3 rounded text-black text-left shadow-custom resize-none overflow-y-hidden'
			/>
		</>	
	)
}

export default PasswordBox