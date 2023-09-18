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
                      coverImage
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
  console.log(jsonResponse.data.user.publication.posts);
};

fetchPostsByUsername("wapborhan");
