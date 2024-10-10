import Rule from "./Rule";
import RuleQR from "./RuleQR/RuleQR";
import RuleSum from "./RuleSum/RuleSum";

var rules = [
    new Rule(
        "Mật khẩu phải chứa ít nhất 6 kí tự.", 
        (t: any) => t?.length >= 6
    ),

    new Rule(
        "Mật khẩu phải chứa ít nhất 1 kí tự in hoa và 1 kí tự in thường.", 
        (t: any) => /[A-Z]/.test(t) && /[a-z]/.test(t)
    ),

    new Rule(
        "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt.",
        (t: any) => /\W/.test(t)
    ),

    new Rule(
        "Mật khẩu phải chứa tất cả kí tự nguyên âm trong tiếng Anh (a, e, i, o, u).",
        (t: any) => /a/i.test(t) && /e/i.test(t) && /i/i.test(t) && /o/i.test(t) && /u/i.test(t)
    ),

    new Rule(
        "Mật khẩu phải chứa ít nhất một số âm",
        (t: any) => /-\d/.test(t)
    ),

    new RuleSum(),

    new Rule(
        "Mật khẩu của bạn phải chứa ít nhất 1 số nguyên tố có 2 chữ số.",
        (t: any) => /(?:11)|(?:13)|(?:17)|(?:19)|(?:23)|(?:29)|(?:31)|(?:37)|(?:41)|(?:43)|(?:47)|(?:53)|(?:59)|(?:61)|(?:67)|(?:71)|(?:73)|(?:79)|(?:83)|(?:89)|(?:97)/.test(t)
    ),

    new RuleQR(),

    new Rule(
        "Mật khẩu của bạn phải có số lượng kí tự nguyên âm bằng số lượng kí tự phụ âm trong tiếng Anh.",
        (t: any) => (t.match(/[aeiou]/ig) || []).length === (t.match(/[bcdfghjklmnpqrstvwxys]/ig) || []).length
    ),

    new Rule(
        "Mật khẩu của bạn phải chứa độ dài của mật khẩu của bạn.",
        (t: any) => {
            let l = t.length;
            let r = new RegExp(`${l}`);
            return r.test(t);
        }
    )

]

function sort_rules(a: any, b: any) {
    if (a.correct == b.correct) {
        return b.num - a.num;
    } else if (!a.correct && b.correct) {
        return -1;
    } else {
        return 1;
    }
}

export default rules;
export { sort_rules };