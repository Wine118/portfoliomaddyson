// ====Simulate Admin Mode =====

const isAdmin = false;//Change to false later

const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");

if(isAdmin) {
    editBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
}

editBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const editableElements = document.querySelectorAll(".editable");

    editableElements.forEach(el => {
        el.setAttribute("contenteditable","true");
        el.style.border = "1px dashed #3D405B";
        el.style.padding = "5px";
    });

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
});

saveBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const editableElements = document.querySelectorAll(".editable");

    editableElements.forEach(el => {
        el.removeAttribute("contenteditable");
        el.style.border = "none";
        el.style.padding = "";
    });

    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";

    alert("Changes saved (frontend only for now)");
});

const image = document.getElementById("profile-image");
const upload = document.getElementById("image-upload");

image.addEventListener("click", function() {
    if (image.isContentEditable) {
        upload.click();
    }
});

upload.addEventListener("change", function() {
    const file = this.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
})

