import Rule from "../Rule";

async function getWordle() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let url = `https://www.nytimes.com/svc/wordle/v2/${year}-${("0"+month).slice(-2)}-${("0"+day).slice(-2)}.json`;
    url = 'https://cors-anywhere.herokuapp.com/' + url;

    const options = {
        method: 'GET',
    }

    let response = await fetch(url, options);
    let json = await response.json();

    return json.solution;
}

export default class RuleMorse extends Rule {
    solution?: string;

    constructor() {
        super("Mật khẩu của bạn phải chứa đáp án của câu đố ");

        getWordle().then((solution) => this.solution = solution).catch((e) => console.log(e));
        this.renderItem = () => <span><a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener">Wordle</a> hôm nay.</span>
    }

    check = (t: any) => {
        let r = new RegExp(`${this.solution}`, "i");
        return r.test(t);
    }
}