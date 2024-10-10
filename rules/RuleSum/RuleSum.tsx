import Rule from "../Rule";

export default class RuleSum extends Rule {
    target: number;

    constructor() {
        super("Tổng các chữ số (tính cả chữ số âm) trong mật khẩu của bạn phải bằng ");
        this.target = Math.ceil(Math.random()*6)*5;
        this.renderItem = () => <span>{this.target}</span>
    }

    check = (password: any) => {
        let s = (password.match(/-?\d/g)?.map((x: any) => +x).reduce((acc: number, v: number) => acc+v, 0))
        console.log("sum" + s)
        return s === this.target;
    }
}