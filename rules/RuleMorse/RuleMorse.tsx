import Rule from "../Rule";

const morseList = [
    ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", 
    "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", 
    "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.." 
]

export default class RuleMorse extends Rule {
    constructor() {
        super(
            "Mật khẩu của bạn phải chứa mã Morse của 3 kí tự chữ cái latin đầu tiên trong mật khẩu của bạn. (Sử dụng . và - để viết mã Morse)", 
        );
    }

    check = (t: any) => {
        let letters = t.match(/[a-zA-Z]/g)?.slice(0, 3);
        if (letters?.length === 3) {
            let code = `${morseList[letters[0].toLowerCase().charCodeAt(0) - 97]}${morseList[letters[1].toLowerCase().charCodeAt(0) - 97]}${morseList[letters[2].toLowerCase().charCodeAt(0) - 97]}`;
            let exp = `${code}`;
            exp = exp.replaceAll(".", "\\.");

            let r = new RegExp(exp);
            return r.test(t);
        }
        return false;
    }
}