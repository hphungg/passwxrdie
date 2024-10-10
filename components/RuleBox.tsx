import React from 'react'

interface RuleBoxProps {
    heading: string;
    msg: string;
    correct: boolean;
    renderItem?: (props: any) => React.ReactNode;
    propsToChild?: any;
}

export default function RuleBox({ heading, msg, correct, renderItem, propsToChild }: RuleBoxProps) {
    return (
        <div className={`
            text-left
            text-base
            rounded
            overflow-hidden
            shadow-custom
            border-2
            border-solid
            my-4
            text-black
            transition-custom
            ${correct ? "bg-[#deffce] border-[#52A22A]" : "bg-[#ffeced] border-[#CE273D]"}
        `}>
            <div className={`
                p-2
                bg-[#fabac4]
                text-[#a11a2c]
                font-bold
                transition-custom
                ${correct ? "bg-[#b4ea99] text-[#32621a]" : ""}
            `}>
                {correct?"\u{2705} ":"\u{274C} "} 
                {heading}
            </div>

            <div className='p-3'>
                {msg}
                {renderItem === undefined ? null : renderItem(propsToChild)}
            </div>
        </div>
    )
}

