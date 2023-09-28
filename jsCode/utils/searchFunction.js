export function searchFunction() {

    const inputText = document.querySelector(".js-search-bar");

    inputText.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && inputText.value !== "") {
            window.location.href = `search.html?inputText=${inputText.value}`;
        }
    });

    document.querySelector(".js-search-btn").addEventListener("click", () => {
        if (inputText.value !== "") {
            window.location.href = `search.html?inputText=${inputText.value}`;
        }

    });
}
