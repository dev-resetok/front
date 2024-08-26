document.addEventListener("DOMContentLoaded", function () {
    // 모달 관련 요소들 선택
    var modal = document.getElementById("profileModal");
    var btn = document.querySelector(".user-img-box img"); // 이미지를 선택
    var span = document.getElementsByClassName("close")[0];
    var resetBtn = document.getElementById("resetBtn");
    const defaultImage =
        "https://www.wishket.com/static/img/default_avatar_c.png"; // 기본 이미지 경로

    // 이미지 클릭 시 모달 열기
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // 모달의 닫기 버튼 클릭 시 모달 닫기
    span.onclick = function () {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // 사진 업로드 폼 처리
    document
        .getElementById("uploadForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            var fileInput = document.getElementById("fileInput");
            var file = fileInput.files[0];

            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    btn.src = e.target.result; // 이미지를 업로드된 파일로 변경
                    modal.style.display = "none"; // 모달 닫기
                };
                reader.readAsDataURL(file);
            }
        });

    // 기본 이미지로 변경 버튼 클릭 시
    resetBtn.onclick = function () {
        btn.src = defaultImage; // 기본 이미지로 변경
        modal.style.display = "none";
    };
});
