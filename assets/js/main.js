// For modals
const buttons = document.querySelectorAll(`button[data-modal-trigger]`);

for (let button of buttons) {
  modalEvent(button);
}

function modalEvent(button) {
  button.addEventListener("click", () => {
    const trigger = button.getAttribute("data-modal-trigger");
    const modal = document.querySelector(`[data-modal=${trigger}]`);
    const contentWrapper = modal.querySelector(".content-wrapper");
    const close = modal.querySelector(".close");

    close.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", () => modal.classList.remove("open"));
    contentWrapper.addEventListener("click", e => e.stopPropagation());

    modal.classList.toggle("open");
  });
}

//? For Tags
[].forEach.call(document.getElementsByClassName("tags-input"), function(el) {
  let hiddenInput = document.createElement("input"),
    mainInput = document.createElement("input"),
    tags = [];

  hiddenInput.setAttribute("type", "hidden", "required");
  hiddenInput.setAttribute("name", el.getAttribute("data-name"));

  mainInput.setAttribute("type", "text", "required");
  mainInput.classList.add("main-input");
  mainInput.addEventListener("input", function() {
    let enteredTags = mainInput.value.split(",");
    if (enteredTags.length > 1) {
      enteredTags.forEach(function(t) {
        let filteredTag = filterTag(t);
        if (filteredTag.length > 0) addTag(filteredTag);
      });
      mainInput.value = "";
    }
  });

  mainInput.addEventListener("keydown", function(e) {
    let keyCode = e.which || e.keyCode;
    if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  });

  el.appendChild(mainInput);
  el.appendChild(hiddenInput);

  addTag("Add Document Tag");

  function addTag(text) {
    let tag = {
      text: text,
      element: document.createElement("span")
    };

    tag.element.classList.add("tag");
    tag.element.textContent = tag.text;

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.addEventListener("click", function() {
      removeTag(tags.indexOf(tag));
    });
    tag.element.appendChild(closeBtn);

    tags.push(tag);

    el.insertBefore(tag.element, mainInput);

    refreshTags();
  }

  function removeTag(index) {
    let tag = tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    refreshTags();
  }

  function refreshTags() {
    let tagsList = [];
    tags.forEach(function(t) {
      tagsList.push(t.text);
    });
    hiddenInput.value = tagsList.join(",");
  }

  function filterTag(tag) {
    return tag
      .replace(/[^\w -]/g, "")
      .trim()
      .replace(/\W+/g, "-");
  }
});
