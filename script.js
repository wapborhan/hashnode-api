const blogs = document.getElementById("blogs");

const fetchPostsByUsername = async (username) => {
  const query = JSON.stringify({
    query: `{
                user(username: "${username}") {
                  publication {
                    posts(page: 0) {
                      _id
                      cuid
                      slug
                      title
                      brief
                      coverImage
                      readTime
                      dateAdded
                      contentMarkdown
                      
                    }
                }
            }
        }`,
  });

  const response = await fetch("https://api.hashnode.com/", {
    method: "post",
    body: query,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  jsonResponse.data.user.publication.posts.map((item) => {
    let div = document.createElement("div");
    div.classList = "card";
    div.innerHTML = `
    <div class="card-header">
      <img src="${item.coverImage}" alt="" />
    </div>
    <div class="card-body">
     
         <h4>${item.title}</h4>
      <p>
       ${item.brief}
       <a class="text-blue-500" href="https://blog.wapborhan.com/${item.slug}">
       Read More
      </a>
      </p>
      <div class="user">
        <img src="https://avatars.githubusercontent.com/u/68281712?v=4" alt="" />
        <div class="user-info">
          <h5>Borhan Uddin</h5>
          <small>${item.dateAdded}</small>
        </div>
      </div>
    </div>
  `;
    blogs.appendChild(div);
    console.log(item);
  });
  console.log(jsonResponse.data.user.publication.posts);
};

fetchPostsByUsername("wapborhan");
