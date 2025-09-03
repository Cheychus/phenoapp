export function showToast(type: string, message: string) {
    const toastContainer = document.querySelector(".toast");

    const div = document.createElement("div");
    div.classList = "alert";

    switch (type) {
        case "success":
            div.classList.add("alert-success");
            break;
        case "info":
            div.classList.add("alert-info");
            break;
        case "error":
            div.classList.add("alert-error");
            break;
    }
    const span = document.createElement("span");
    span.innerHTML = message;
    div.appendChild(span);
    toastContainer?.appendChild(div);

    setTimeout(function () {
        toastContainer?.removeChild(div)
    }, 3000);
}







