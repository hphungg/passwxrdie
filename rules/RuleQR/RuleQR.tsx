import Rule from "../Rule";
import wordlist from "./random_word_list";

function QRDisplay({ word }: { word: string }) {
    return (
        <div className="flex justify-center items-center my-4">
            <img alt="" src={`https://api.qrserver.com/v1/create-qr-code/?data=${word}&size=200x200`}/>
        </div>
    )
}

function getRandomWord() {
    let words = wordlist;
    return words[Math.floor(Math.random()*(words.length+1))];
}

export default class RuleQR extends Rule {
    word: string;
    url: string = '';

    constructor() {
        super("Mật khẩu của bạn phải chứa từ khóa bạn nhận được khi quét mã QR này.");

        this.word = getRandomWord();
        this.renderItem = () => <QRDisplay word={this.word} />
    }

    check = (password: any) => {
        let r = new RegExp(`(${this.word})`, "i");
        return r.test(password);
    }
}
