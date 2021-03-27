document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("comment-form").onsubmit = () => {//submit 동작 정의
        const commentInput = document.getElementById("comment-input");

        if (commentInput.value === "") {
            return false;
        }
        //입력한 코멘트 기반으로 li요소 만들기
        const newComment = document.createElement("li");

        newComment.innerText = commentInput.value;//li를 DOM에 넣기
        document.getElementById("comments").appendChild(newComment);

        commentInput.value = "";//내용 지우기
        return false;
    };
});