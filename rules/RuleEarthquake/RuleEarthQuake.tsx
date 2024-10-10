import { clear, time } from "console";
import Rule from "../Rule";
import { useEffect, useRef } from "react";

interface EarthQuakeProps {
    password: string;
    setPassword: (password: string) => void;
    shakePasswordBox: (flag: boolean) => void;
    correct: boolean;
}

function EarthQuake({ password, setPassword, shakePasswordBox, correct }: EarthQuakeProps) {
    const solveOnce = useRef(false);
    const timeRef = useRef<any>(null);
    const replaceCount = useRef(0);

    useEffect(() => {
        timeRef.current = setTimeout(shuffleChars, 1000);
        shakePasswordBox(true);
        solveOnce.current = false;

        return () => clearTimeout(timeRef.current);
    }, []);

    useEffect(() => {
        if (!solveOnce.current) {
            clearTimeout(timeRef.current);
            timeRef.current = setTimeout(shuffleChars, replaceCount.current < 8 ? 1000 : 3000);
        }
    }, [password]);

    useEffect(() => {
        if (!solveOnce.current && correct) {
            solveOnce.current = true;
            clearTimeout(timeRef.current);
            shakePasswordBox(false);
        }
    }, [correct]);

    function shuffleChars () {
        let matches = [...password.matchAll(/[!-~]/g)];
        if (matches.length > 0) {
            let indices = matches.map(m => m.index);
            let i = Math.floor(Math.random() * indices.length);
            i = indices[i];

            const arr = ["\u{1FAA8}", "\u{1FAA8}", "\u{1F342}", "\u{1F343}"];
            const x = arr[Math.floor(Math.random() * arr.length)];

            setPassword(password.substring(0, i) + x + password.substring(i + 1));
            replaceCount.current++;
        }
    }

    return (
        <div className="mt-2 font-bold text-center">
            {"\u{1FA91}"}
        </div>
    )

}

export default class RuleMorse extends Rule {
    constructor() {
        super("Ôi không! Có một trận động đất! Hãy đưa mật khẩu của bạn tới nơi an toàn. Thêm chiếc ghế này vào mật khẩu của bạn và để phần còn lại của mật khẩu bên dưới nó.");

        this.renderItem = ({ password, setPassword, shakePasswordBox, correct }: EarthQuakeProps) => {
            return (
                <EarthQuake
                    password={password}
                    setPassword={setPassword}
                    shakePasswordBox={shakePasswordBox}
                    correct={correct}
                />
            )
        }
    }

    check = (t: any) => {
        return /^[\u{1FA91}]+\n/u.test(t);
    }
}