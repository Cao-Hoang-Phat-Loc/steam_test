const API_KEY = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";


const getFeaturedGames = async () => {
  try {
    const url = `${API_KEY}/features`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("features", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getAllGames = async () => {
  try {
    const url = `${API_KEY}/games`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("all-games", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getGenresList = async () => {
  try {
    const url = `${API_KEY}/genres`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("genres", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getTagsList = async () => {
  try {
    const url = `${API_KEY}/steamspy-tags`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("steamspy-tags", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getSingleGameDetail = async (id) => {
  try {
    const url = `${API_KEY}/single-game/${id}`;
    const url1 = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/20`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("single-game", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};



const renderFeatureGame = async () => {
  try {
    const data = await getFeaturedGames();
    const gameList = document.getElementById("display_game");
    gameList.innerHTML = "";
    data.data.forEach((game) => {
      const x = document.createElement("div");
      x.innerHTML = `
        <div>
          <div class="game_wrapper">
            <div class="cover" onclick="appDetail(${game.appid})">
              <img src="${game.header_image}"
                data-id="${game.appid}">
              <div class="game_info">
                <p>${game.name}</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>`;


      gameList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
}
const appDetail = async (id) => {
  try {
    const gameList = document.getElementById("display_game");
    gameList.innerHTML = `<div class="loader"></div>`;
    const data1 = await getSingleGameDetail(id);
    const data = data1.data;
    if (!data) {
      console.log("err", err);
    } else {
      gameList.innerHTML = "";
      const x = document.createElement("div");
      x.innerHTML = `<div class="showing_game show_detail">
    <div class="title_contain ">
    <div class="title">${data.name}</div>
    <div class="price">${data.price}</div>
    </div>
    <div class="img_detail">
    <img
    src="${data.header_image}"
    alt="${data.name}"
    />
    <div class="game_details">
    <div class="game_description">${data.description}</div>
    <div class="game_informations">
    <p>RELEASE DATE:  ${data.released}</p>
    <p>DEVELOPER:  <a href="${data.developer[0]}">${data.developer[1]}</a></p>
    </div>
    </div>
    </div>
    <div class="tags_contain">
    Popular user-defined tags for this product:
    <div class="tags">
    <div class="tag">${data.steamspy_tags[0]}</div>
    <div class="tag">${data.steamspy_tags[1]}</div>
    <div class="tag">${data.steamspy_tags[2]}</div>
    <div class="tag">${data.steamspy_tags[3]}</div>
    <div class="tag">${data.steamspy_tags[4]}</div>
    <div class="tag">${data.steamspy_tags[5]}</div>
    <div class="tag">${data.steamspy_tags[6]}</div>
    
    </div>
    </div>
    </div>
    `;
      gameList.appendChild(x);
    }
  } catch (err) {
    console.log("err", err);
  }
}

const renderCateGame = async (cateName,cateTitle) => {
  try {
     let gameFound=0;
    const data = await getAllGames();
    const gametitle=document.getElementById("displayTitle");
    gametitle.innerHTML = `${cateTitle}`;
    const gameList = document.getElementById("display_game");
    gameList.innerHTML = "";
    data.data.forEach((game) => {

      game.steamspy_tags.forEach((cate) => {
        // console.log(cate,cateName);
        if (cate === cateName) {
           gameFound+=1;
          const x = document.createElement("div");
          x.innerHTML = `
        <div>
          <div class="game_wrapper">
            <div class="cover" onclick="appDetail(${game.appid})">
              <img src="${game.header_image}"
                data-id="${game.appid}">
              <div class="game_info">
                <p>${game.name}</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>`;
          gameList.appendChild(x);
        }
      });
    });
    if (gameFound===0) {
      const x = document.createElement("h3");
      x.innerHTML = `
      <h3>
        Sorry, there are no games in the category you selected.
      </h3>`;
      gameList.appendChild(x);
    }
  } catch (err) {
    console.log("err", err);
  }
}
document.querySelector(".game_categories").addEventListener("click", (event) => {
  if (event.target.classList.contains("category")) {
    const categoryValue = event.target.dataset.value;
    const categoryTitle= event.target.innerText;
    renderCateGame(categoryValue,categoryTitle);
  }
});

const renderSearchGame = async (searchValue) => {
  try {
    const data = await getAllGames();
    const gameList = document.getElementById("display_game");
    gameList.innerHTML = "";
    const lowerCaseSearchValue = searchValue.toLowerCase();

    let gameFound = false;

    data.data.forEach((game) => {
      const lowerCaseGameName = game.name.toLowerCase();
      if (lowerCaseGameName.includes(lowerCaseSearchValue)) {
        gameFound = true;
        const x = document.createElement("div");
        x.innerHTML = `
            <div>
              <div class="game_wrapper">
                <div class="cover" onclick="appDetail(${game.appid})">
                  <img src="${game.header_image}" data-id="${game.appid}">
                  <div class="game_info">
                    <p>${game.name}</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>`;
        gameList.appendChild(x);
      }
    });

    // Nếu không tìm thấy game nào, hiển thị thông báo
    if (!gameFound) {
      const x = document.createElement("h3");
      x.innerHTML = `
              <h3>
                 Sorry, there are no games in the category you selected
              </h3>`;
      gameList.appendChild(x);
    }
  } catch (err) {
    console.log("err", err);
  }
};

document.querySelector("#search_btn").addEventListener("click", (event) => {
  const searchValue = document.querySelector("#searchForm").value;
  renderSearchGame(searchValue);
});

document.querySelector("#searchForm").addEventListener("keyup", (event) => {
  const searchValue = event.target.value;
  renderSearchGame(searchValue);
});




// renderLoad().then((result) => console.log(result));
// getFeaturedGames().then((result) => console.log(result));
//  getAllGames().then((result) => console.log(result));
//  getGenresList().then((result) => console.log(result));
//  getTagsList().then((result) => console.log(result));
//  getSingleGameDetail().then((result) => console.log(result));
renderFeatureGame().then((result) => console.log(result));