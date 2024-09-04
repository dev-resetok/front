document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");
    let currentEditRow = null;

    // 회원 상태에 따른 색상 적용
    function applyUserStatusColors() {
        document.querySelectorAll(".ServiceTable_row").forEach((row) => {
            const statusCell = row.querySelector(".user_status");
            if (statusCell) {
                const statusText = statusCell.textContent.trim();

                switch (statusText) {
                    case "활동중":
                        statusCell.style.color = "green";
                        break;
                    case "탈퇴함":
                        statusCell.style.color = "red";
                        break;
                    default:
                        statusCell.style.color = "black"; // 기본 색상
                        break;
                }
            }
        });
    }

    applyUserStatusColors(); // 페이지 로드 시 색상 적용

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_date")
            .textContent.trim();
        document.getElementById("editEmail").value = row
            .querySelector(".user_email")
            .textContent.trim();
        document.getElementById("editNickname").value = row
            .querySelector(".user_nickname")
            .textContent.trim();
        document.getElementById("editAge").value = row
            .querySelector(".user_age")
            .textContent.trim();
        document.getElementById("editStatus").value = row
            .querySelector(".user_status")
            .textContent.trim();
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
    }

    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            closeModal();
        }
    });

    // 수정 버튼 클릭 시 모달 열기
    function addEditButtonListeners() {
        document.querySelectorAll(".editBtn button").forEach((button) => {
            button.addEventListener("click", function () {
                const row = this.closest(".ServiceTable_row");
                openModal(row);
            });
        });
    }

    addEditButtonListeners(); // 초기 로드 시 이벤트 리스너 추가

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        if (currentEditRow) {
            currentEditRow.querySelector(".user_name").textContent =
                document.getElementById("editUserName").value;
            currentEditRow.querySelector(".Join_date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".user_email").textContent =
                document.getElementById("editEmail").value;
            currentEditRow.querySelector(".user_nickname").textContent =
                document.getElementById("editNickname").value;
            currentEditRow.querySelector(".user_age").textContent =
                document.getElementById("editAge").value;
            currentEditRow.querySelector(".user_status").textContent =
                document.getElementById("editStatus").value;

            applyUserStatusColors(); // 수정 후 색상 적용
            closeModal(); // 수정 후 모달 닫기
        }
    });

    // 선택된 필터 옵션에 'selected' 클래스 추가
    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", function () {
            // 이전에 선택된 옵션에서 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                .classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            this.classList.add("selected");

            // 여기에 필터링 또는 정렬에 대한 추가 코드를 넣을 수 있습니다.
        });
    });
});
