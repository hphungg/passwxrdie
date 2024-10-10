"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import PasswordBox from '@/components/PasswordBox';
import RuleBox from '@/components/RuleBox';

import { useAutoAnimate } from '@formkit/auto-animate/react'
import ruleList, { sort_rules } from '@/rules/rules';
import Rule from '@/rules/Rule';

export default function Home() {
	const [password, setPassword] = useState('');
	const passwordRef = useRef<any>(null);
	const [solved, setSolved] = useState(false);
	const [ruleState, setRuleState] = useState<Rule[]>([]);
	const [ruleBoxRef, ruleBoxAnimation] = useAutoAnimate();
	const ruleCount = useRef(0);

	useEffect(() => {
        for (let i = 0; i < ruleList.length; i++) {
            ruleList[i].num = i + 1;
        }
        ruleCount.current = 0;

        setRuleState(ruleList);
    }, []);

	function shakePasswordBox(flag: boolean) {
		if (passwordRef.current) {
			if (flag) {
				passwordRef.current.classList.add('shake');
			} else {
				passwordRef.current.classList.remove('shake');
			}
		}
	}	

	function checkRule(password: string) {
		if (ruleState.length === 0) {
			return;
		}

		let rules = ruleState;

		if (!rules[0].unlocked && password.length > 0) {
			rules[0].unlocked = true;
			ruleCount.current++;
		}

		let solve_count = 0;
		for (let i = 0; i < rules.length; i++) {
			if (i === ruleCount.current) {
				if (solve_count === ruleCount.current) {
					rules[i].unlocked = true;
					ruleCount.current++;
				}
				else {
					break;
				}
			} 

			rules[i].correct = rules[i].check(password);
			if (rules[i].correct) {
				solve_count++;
			}
		}

		setRuleState(rules);
		if (solve_count === rules.length) {
			setSolved(true);
		} else {
			setSolved(false);
		}
	}

	function regenerateRule(num: number) {
		num--;
		let rules = ruleState;
		if ("regenerate" in rules[num]) {
			setRuleState(rules);
		}
	}


	function setPassAndCheckRules(newPass: string) {
		setPassword(newPass);
		checkRule(newPass);
	}

	return (
		<>
			<div className="w-[576px] max-w-[calc(100%-20px)] min-h-[calc(100vh - 50px)] m-auto p-1">
				<div className='flex flex-col justify-center text-center items-center gap-1 mt-5 mb-10'>
					<Image src="/wxrdie_logo.png" width={55} height={55} alt=''></Image>
					<div className='text-3xl font-bold '>passwxrdie</div>
				</div>

				<PasswordBox password={password} setPassword={setPassAndCheckRules} textareaRef={passwordRef} />
				<div ref={ruleBoxRef}>
					{
						solved && <div>Chiến thắng</div>
					}
					{
						ruleState.filter(r => r.unlocked).sort(sort_rules).map(r => {
							return (
								<RuleBox 
									key={r.num}
									heading={`Quy tắc ${r.num}`}
									msg={r.msg}
									correct={r.correct}
									renderItem={r.renderItem}
									propsToChild={{password, setPassword: setPassAndCheckRules, shakePasswordBox, regenerateRule, correct: r.correct}}/>
							)
						})
					}
				</div>
			</div>
		</>
	);
}