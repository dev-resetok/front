document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 임시 게시글 데이터
    const postData = {
        content: "이것은 게시글 내용입니다. 여기에 게시글 내용이 표시됩니다.",
        images: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/100",
        ],
        comments: ["댓글1", "댓글2", "댓글3"],
    };

    // 이미지를 렌더링하는 함수
    function renderImages(images) {
        const imageContainer = document.getElementById("imageContainer");
        imageContainer.innerHTML = ""; // 기존 이미지를 초기화

        images.forEach((imageUrl, index) => {
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("imageWrapper");

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = `첨부 이미지 ${index + 1}`;
            img.classList.add("postImage");

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "이미지 삭제";
            deleteButton.classList.add("deleteImageBtn");
            deleteButton.addEventListener("click", () => deleteImage(index));

            imageDiv.appendChild(img);
            imageDiv.appendChild(deleteButton);

            imageContainer.appendChild(imageDiv);
        });
    }

    // 이미지 삭제 함수
    function deleteImage(index) {
        if (confirm("이 이미지를 삭제하시겠습니까?")) {
            postData.images.splice(index, 1);
            renderImages(postData.images);
        }
    }

    // 댓글을 렌더링하는 함수
    function renderComments(comments) {
        const commentList = document.getElementById("commentList");
        commentList.innerHTML = ""; // 기존 댓글 초기화

        comments.forEach((comment, index) => {
            const commentItem = document.createElement("li");
            commentItem.style.display = "flex";
            commentItem.style.justifyContent = "space-between";
            commentItem.style.alignItems = "center";
            commentItem.style.padding = "10px 0";
            commentItem.style.borderBottom = "1px solid #ccc";

            const commentText = document.createElement("span");
            commentText.textContent = comment;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.classList.add("deleteCommentBtn");
            deleteButton.style.marginLeft = "20px";
            deleteButton.addEventListener("click", () => deleteComment(index));

            commentItem.appendChild(commentText);
            commentItem.appendChild(deleteButton);

            commentList.appendChild(commentItem);
        });
    }

    // 댓글 삭제 함수
    function deleteComment(index) {
        if (confirm("이 댓글을 삭제하시겠습니까?")) {
            postData.comments.splice(index, 1);
            renderComments(postData.comments);
        }
    }

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // HTML의 게시글 제목을 가져와 모달에 표시
        const postTitle = row.querySelector(".post_title").textContent.trim();
        document.getElementById("editPostTitle").value = postTitle;

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editPostContent").value = postData.content;

        renderImages(postData.images);
        renderComments(postData.comments);

        editModal.style.display = "block";
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
        postData.content = document.getElementById("editPostContent").value;

        // 실제로는 서버에 저장하는 코드가 여기 들어가야 합니다.

        alert("변경 사항이 저장되었습니다.");
        closeModal();
    });
});
