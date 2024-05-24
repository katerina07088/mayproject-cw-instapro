import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp, updatePosts, userId } from "../index.js";
import { formatDistanceToNow } from "../node_modules/date-fns/index.js";
import { ru } from "../node_modules/date-fns/locale.js"
import {addLike, removeLike, getPosts, getUserPosts} from "../api.js"


export function renderUserPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  //  <button class="${user?._id === post.user.id ? `delete-button` : `-hide-delete-button`}" data-post-id="${post.id}"></button>  кнопка для удаления
      const appHtml = posts.map((post) => {
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
                          post.likes.length === 0
                            ? 0
                            : post.likes.length === 1
                            ? post.likes[0].name
                            : post.likes[post.likes.length - 1].name +
                              " и еще " +
                              (post.likes.length - 1)
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


//   document.querySelectorAll('.delete-button').forEach(deleteButton => {
//     deleteButton.addEventListener('click', () => {
//         deletePostClick({ postId: deleteButton.dataset.postId })
//     })
// })

  function countLikes() {
    const likeButtonElements = document.querySelectorAll(".like-button");
    for (const likeEl of likeButtonElements) {
      likeEl.addEventListener("click", function (e) {
        e.stopPropagation();
          const id = likeEl.dataset.id;
          const isLiked = likeEl.dataset.liked;
  
          if (isLiked === "true") {
            removeLike( {id,  token: getToken() })
            .then(() => {
              return  getUserPosts({token: getToken(), id: userId})
          })
          .then((posts) => {
            updatePosts(posts)
            renderApp()
          })
          }
          else {
            addLike({ id, token: getToken() })
            .then(() => {
              return  getUserPosts({token: getToken(), id: userId});
          })
          .then((posts) => {
            updatePosts(posts)
            renderApp()
          })
        };
      });
     }
    }


  //         if (isLiked ==="false") {
  //           addLike (id, { token: getToken() })
  //           // .then(() => {
  //           //   })
  //         } else {
  //           removeLike(id, { token: getToken() })
  //           // .then (()=> {
  //         //})
  //       }
  //     });
  //   }
  // }
  countLikes()
}

 
