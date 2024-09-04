document.addEventListener("DOMContentLoaded", () => {
    let sortOrder = {
        "등록일 순": "desc",
        "작성자 순": "asc",
        "이용자 순": "desc",
    };

    document.querySelectorAll(".sort-filter-option").forEach((option) => {
        option.addEventListener("click", () => {
            // 기존에 선택된 필터에서 selected 클래스를 제거
            document.querySelectorAll(".sort-filter-option").forEach((opt) => {
                opt.classList.remove("selected");
            });

            // 현재 클릭된 필터에 selected 클래스 추가
            option.classList.add("selected");

            const sortKey = option.textContent.trim();
            const rows = Array.from(
                document.querySelectorAll(
                    ".ServiceTable_row_wrapper .ServiceTable_row"
                )
            );
            let sortedRows;

            if (sortKey === "등록일 순") {
                sortedRows = rows.sort((a, b) => {
                    const dateA = new Date(
                        a.querySelector(".Join_Date").textContent.trim()
                    );
                    const dateB = new Date(
                        b.querySelector(".Join_Date").textContent.trim()
                    );
                    return sortOrder[sortKey] === "asc"
                        ? dateA - dateB
                        : dateB - dateA;
                });
            } else if (sortKey === "작성자 순") {
                sortedRows = rows.sort((a, b) => {
                    const authorA = a
                        .querySelector(".user_name")
                        .textContent.trim()
                        .toLowerCase();
                    const authorB = b
                        .querySelector(".user_name")
                        .textContent.trim()
                        .toLowerCase();
                    return sortOrder[sortKey] === "asc"
                        ? authorA.localeCompare(authorB)
                        : authorB.localeCompare(authorA);
                });
            } else if (sortKey === "이용자 순") {
                sortedRows = rows.sort((a, b) => {
                    const usersA = parseInt(
                        a.querySelector(".hit-ctn").textContent.trim(),
                        10
                    );
                    const usersB = parseInt(
                        b.querySelector(".hit-ctn").textContent.trim(),
                        10
                    );
                    return sortOrder[sortKey] === "asc"
                        ? usersA - usersB
                        : usersB - usersA;
                });
            }

            const container = document.querySelector(
                ".ServiceTable_row_wrapper"
            );
            container.innerHTML = "";
            sortedRows.forEach((row) => container.appendChild(row));

            // 정렬 순서 반전
            sortOrder[sortKey] = sortOrder[sortKey] === "asc" ? "desc" : "asc";
        });
    });

    // 모달 관련 기능

    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 문자열에서 괄호 앞부분만 가져오고, 줄바꿈과 여분의 공백을 정리하는 함수
    function cleanUpPlaceName(placeName) {
        const cleanedName = placeName.split("(")[0].trim();
        return cleanedName.replace(/\s+/g, " ");
    }

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();

        // 장소명에서 괄호 앞부분만 가져오고 공백 정리
        const rawPlaceName = row
            .querySelector(".PlaceRantalDetail")
            .textContent.trim();
        const cleanedPlaceName = cleanUpPlaceName(rawPlaceName);
        document.getElementById("editPlaceName").value = cleanedPlaceName;

        document.getElementById("editPlaceAddress").value = row
            .querySelector(".placeAddres")
            .textContent.trim();
        document.getElementById("editSportKind").value = row
            .querySelector(".sport_kind")
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
    document.querySelectorAll(".editBtn button").forEach((button) => {
        button.addEventListener("click", function () {
            const row = this.closest(".ServiceTable_row");
            openModal(row);
        });
    });

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        if (currentEditRow) {
            currentEditRow.querySelector(".user_name").textContent =
                document.getElementById("editUserName").value;
            currentEditRow.querySelector(".Join_Date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".PlaceRantalDetail").textContent =
                document.getElementById("editPlaceName").value; // "..." 추가 생략
            currentEditRow.querySelector(".placeAddres").textContent =
                document.getElementById("editPlaceAddress").value;
            currentEditRow.querySelector(".sport_kind").textContent =
                document.getElementById("editSportKind").value;

            closeModal(); // 수정 후 모달 닫기
        }
    });
});
