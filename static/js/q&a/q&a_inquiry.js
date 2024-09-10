const buttons = document.querySelectorAll(".evaluation-button");
console.log(buttons);
const changeText = document.querySelector(".flex-box > p");
console.log(changeText);
const inputTag = document.querySelector(".flex-box > input");
console.log(inputTag);

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        console.log(e.target);
        buttons.forEach((btn) => {
            btn.style.display = "none";
        });
        if (e.target.value === "good" || e.target.value === "bad") {
            changeText.innerHTML =
                e.target.value === "good"
                    ? "도움이 될 수 있어서 기쁩니다. 더 나은 SW 프로젝트 거래 문화를 만들기 위해 노력하겠습니다."
                    : "도움을 드리지 못해 죄송합니다. 보내주신 소중한 의견으로 도움이 되는 답변을 만들어가겠습니다.";
        } else {
            changeText.innerHTML =
                e.target.parentElement.value === "good"
                    ? "도움이 될 수 있어서 기쁩니다. 더 나은 SW 프로젝트 거래 문화를 만들기 위해 노력하겠습니다."
                    : "도움을 드리지 못해 죄송합니다. 보내주신 소중한 의견으로 도움이 되는 답변을 만들어가겠습니다.";
        }
    });
});
