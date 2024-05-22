import { goToPage } from "..";
import {renderUploadImageComponent} from "../components/upload-image-component";
import {renderHeaderComponent} from "../components/header-component";
import { sanitize } from "../helpers";
import { POSTS_PAGE } from "../routes";

export function renderAddPostPageComponent({ appEl, onAddPostClick, imageUrl }) {
  
  const render = () => {
    //const appEl = document.getElementById("app");
    // TODO: Реализовать страницу добавления поста
    const appHtml = `<div class="page-container">
    <div class="header-container"> 
</div>
    <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div id="upload-image-container"class="upload-image-container">
</div>
</div>
        <label>
          Опишите фотографию:
          <textarea id="inputDescription" class="input textarea" type="textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),    // как узнали, что можно так сделать запись?
      });

    renderUploadImageComponent({ 
      element: appEl.querySelector(".upload-image-container"),             //как узнали, что так можно/ почему это не сработало с getElementById
    //   onImageUrlChange(newImageUrl) {                                      //как это функцию одновременно вызыааем и создаем?
    //    imageUrl = newImageUrl;
    //   }
    })


  
  document.getElementById("add-button").addEventListener("click", () => {
    // if (!imageUrl) {
    //   alert('Выберите фото');
    //   return;
    // };
    if (document.getElementById('inputDescription').value.trim() === "") {
      alert('Не заполнено описание фото');
      return;
    };

    const inputDescriptionElement = document.getElementById('inputDescription')
    onAddPostClick ({
      description: sanitize(inputDescriptionElement.value),
      imageUrl: imageUrl,
    })  
  });
};
 render();
};

//     const onAddPostClick = () => {
//     document.getElementById("add-button").addEventListener("click", () => {
//       addPost({
//         description:sanitize(inputDescriptionElement.value),
//         imageUrl: imageUrl
//       })
//       .then(() => {
//         goToPage({POSTS_PAGE});
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   });
// };
 