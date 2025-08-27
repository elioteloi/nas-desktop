const buttonGoBack = document.getElementById("button-go-back");
const file = document.getElementById("file");
const upload = document.getElementById("upload");
const divImage = document.getElementById("div-image");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const foldername = params.get("foldername");

async function FetchPicture(params) {
  const response = await fetch(`http://server:3000/fetchFile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      folder: foldername,
    }),
  });

  const json = await response.json();
  json.result.forEach((element) => {
    const container = document.createElement("div");
    container.id = "container";
    const img = document.createElement("img");
    img.id = "img";
    const divButton = document.createElement("div");
    divButton.id = "divButton";
    const buttonEdit = document.createElement("button");
    buttonEdit.id = "buttonEdit";
    const buttonDelete = document.createElement("button");
    buttonDelete.id = "buttonDelete";
    img.src = `http://server:3000/path_Of_Drive/${element.userdrive}/${element.foldername}/${element.filename}`;
    img.width = 200;
    img.id = "files";

    buttonEdit.innerHTML = "edit";

    buttonDelete.innerHTML = "delete";

    divImage.appendChild(divButton);
    divButton.appendChild(buttonEdit);
    divButton.appendChild(buttonDelete);
    container.appendChild(img);
    container.appendChild(divButton);
    divImage.appendChild(container);

    // button edit
    buttonEdit.addEventListener("click", () => {
      const modalFolder = document.createElement("div");
      modalFolder.id = "modalFolder";

      const inputFolder = document.createElement("input");
      inputFolder.placeholder = "Change the name for the file";
      inputFolder.id = "inputFolder";

      const buttonCreateFolder = document.createElement("button");
      buttonCreateFolder.textContent = "Update file";
      buttonCreateFolder.id = "buttonCreateFolder";

      const buttonGoBack = document.createElement("button");
      buttonGoBack.textContent = "Go Back";
      buttonGoBack.id = "goBack";

      modalFolder.appendChild(inputFolder);
      divImage.appendChild(modalFolder);
      modalFolder.appendChild(buttonCreateFolder);
      modalFolder.appendChild(buttonGoBack);

      buttonCreateFolder.addEventListener("click", async () => {
        const response = await fetch(`http://server:3000/updateFile`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            id: element.id,
            name: inputFolder.value,
          }),
        });
        const json = response.json();

        console.log(json);
      });

      buttonGoBack.addEventListener("click", () => {
        divImage.style.display = "block";
        modalFolder.style.display = "none";
      });
    });

    // button delete
    buttonDelete.addEventListener("click", () => {
      const modalFolderDelete = document.createElement("div");
      modalFolderDelete.id = "modalFolder";

      const FolderDelete = document.createElement("h3");
      FolderDelete.textContent =
        "Are you sure that you want to delete the file !";
      FolderDelete.id = "FolderDelete";

      const buttonDeleteFolder = document.createElement("button");
      buttonDeleteFolder.textContent = "Delete folder";
      buttonDeleteFolder.id = "buttonCreateFolder";

      const buttonGoBack = document.createElement("button");
      buttonGoBack.textContent = "Go Back";
      buttonGoBack.id = "goBack";

      modalFolderDelete.appendChild(FolderDelete);
      divImage.appendChild(modalFolderDelete);
      modalFolderDelete.appendChild(buttonDeleteFolder);
      modalFolderDelete.appendChild(buttonGoBack);

      buttonDeleteFolder.addEventListener("click", async () => {
        const response = await fetch(
          `http://server:3000/deleteFile/${element.id}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = response.json();
        location.reload();
      });

      buttonGoBack.addEventListener("click", () => {
        divImage.style.display = "block";
        modalFolderDelete.style.display = "none";
      });
    });
  });
}

FetchPicture();

upload.addEventListener("click", () => {
  console.log(foldername);

  const fileUpload = file.files[0];

  const formData = new FormData();
  formData.append("photos", fileUpload);
  formData.append("ID", id);
  formData.append("folder", foldername);

  async function pictures(params) {
    const response = await fetch(`http://server:3000/createFile`, {
      method: "POST",
      body: formData,
    });
    await response.json();

    location.reload();
  }
  pictures();
});

buttonGoBack.addEventListener("click", () => {
  window.location.href = "home.html";
});
