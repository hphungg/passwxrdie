import Rule from "../Rule";

const quiz = [
    ["Cơn mưa ngang qua", "sontungmtp"],
    ["Em của ngày hôm qua", "sontungmtp"],
    ["Nơi này có anh", "sontungmtp"],
    ["Lạc trôi", "sontungmtp"],
    ["Hãy trao cho anh", "sontungmtp"],
    ["Đừng làm trái tim anh đau", "sontungmtp"],
    ["Chúng ta của hiện tại", "sontungmtp"],
    ["Có chắc yêu là đây", "sontungmtp"],
    ["Sóng gió", "j97"],
    ["Hồng nhan", "j97"],
    ["Bạc phận", "j97"],
    ["Thiên lý ơi", "j97"],
    ["Hoa hải đường", "j97"],
    ["Em gì ơi", "j97"],
    ["Có em chờ", "min"],
    ["Phía sau một cô gái", "soobinhoangson"],
    ["Nếu ngày ấy", "soobinhoangson"],
    ["Đi để trở về", "soobinhoangson"],
    ["Nàng thơ", "hoangdung"],
    ["Bao giờ lấy chồng", "bichphuong"],
    ["Bùa yêu", "bichphuong"],
    ["Đen đá không đường", "amee"],
    ["Sao anh chưa về nhà", "amee"],
    ["Anh nhà ở đâu thế", "amee"],
    ["Yêu một người vô tâm", "amee"],
];

export default class RuleQuiz extends Rule {
    quizNum: number;

    constructor() {
        super("Mật khẩu của bạn phải chứa nghệ danh của ca sĩ thể hiện chính trong bài hát dưới đây (Tên nghệ sĩ viết liền không dấu, ví dụ: soobinhoangson).");
        
        this.quizNum = Math.floor(Math.random() * quiz.length);
        this.renderItem = () => <p className="text-center font-bold text-xl mt-2">{quiz[this.quizNum][0]}</p>;
    }

    check = (t: any) => {
        let answer = quiz[this.quizNum][1];
        let r = RegExp(`${answer}`, "i");
        return r.test(t);
    }
}