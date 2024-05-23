import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { formatDistanceToNow } from "../node_modules/date-fns";
import { ru } from "../node_modules/date-fns/locale"
import {addLike, removeLike} from "../api.js"


export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  
      const appHtml = posts.map((post, index) => {
        return  `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  <li class="post">
                    <div class="post-header" data-user-id=${post.user.id}>
                        <img src= ${post.user.imageUrl} class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src=${post.imageUrl}>
                    </div>
                    <div class="post-likes">
                      <button data-id=${post.id}  data-liked="${post.isLiked}"  class="like-button">
                       ${post.isLiked
                        ?`<img src="./assets/images/like-active.svg">`
                        :`<img src="./assets/images/like-not-active.svg">`
                         } 
                      </button>
                      <p class="post-likes-text">
                        Нравится:<strong>
                         ${
                          post.isLiked
                          ?` ${post.likes.name} и еще <span class="likes-counter"> <strong> ${post.likes} </strong> </span>`
                          :` ${post.likes} `
                           } 
                           </strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">${formatDistanceToNow( new Date(post.createdAt), { locale: ru })} назад </p>
                  </li>`;}).join("");

  appEl.innerHTML = appHtml;
      
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  countLikes()
}

export function countLikes() {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeEl of likeButtonElements) {
    likeEl.addEventListener("click", function (e) {
      e.stopPropagation();
        const id = likeEl.dataset.id;
        const isLiked = likeEl.dataset.liked;

        if (isLiked ==="false") {
          addLike (id, { token: getToken() })
          // .then (()=> {

          // })
          // comments[index].likeButton = false;
          // comments[index].likeCounter--;
        } else {
          removeLike(id, { token: getToken() })
          // .then (()=> {
            
          // })
          // comments[index].likeButton = true;
          // comments[index].likeCounter++;
        }
      })
    };
  }




