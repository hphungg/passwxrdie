export default class Rule {
    msg: any;
    correct: boolean;
    unlocked: boolean;
    check?: any;
    num?: number;
    renderItem?: any;

    constructor(msg: any, check?: any) {
        this.msg = msg;
        this.correct = false;
        this.unlocked = false;

        if (check !== undefined) {
            this.check = check;
        }
    }

    setRuleNumber(num: number): void {
        this.num = num;
    }
}