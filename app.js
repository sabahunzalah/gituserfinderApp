// Select DOM elements
const input = document.querySelector("input");
const btn = document.querySelector(".searchBtn");

const user = document.querySelector(".githubUser");
const login = document.querySelector(".githubUserName");
const joined = document.querySelector(".githubJoinedDate");
const bio = document.querySelector(".githubBio");
const repo = document.querySelector(".repoTotal");
const follower = document.querySelector(".followerTotal");
const followings = document.querySelector(".followingTotal");
const locations = document.querySelector(".locations");
const twit = document.querySelector(".twit");
const websites = document.querySelector(".websites");
const companies = document.querySelector(".companies");

// Function to fetch user data from GitHub API
const fetchUserData = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.ok) {
      // Update DOM with user data
      user.textContent = data.name || "No name provided";
      login.innerHTML = `<a href="${data.html_url}" target="_blank">@${data.login}</a>`;
      joined.textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
      repo.textContent = data.public_repos;
      follower.textContent = data.followers;
      followings.textContent = data.following;
      locations.textContent = data.location || "Not available";
      twit.textContent = data.twitter_username || "Not available";
      websites.textContent = data.blog || "Not available";
      companies.textContent = data.company || "Not available";
      bio.textContent = data.bio || "Not available";

      // Display the user’s avatar
      const img = document.querySelector(".mainImg");
      img.innerHTML = `<img src="${data.avatar_url}" alt="${data.login}">`;
    } else {
      // Show error for invalid username
      Swal.fire({
        icon: "error",
        title: "User Not Found",
        text: "The GitHub username you entered does not exist. Please try again.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error Fetching Data",
      text: "An error occurred while fetching data. Please try again later.",
    });
    console.error(error);
  }
};

// Event listener for the search button
btn.addEventListener("click", () => {
  const username = input.value.trim();
  if (!username) {
    // Show error for empty input
    Swal.fire({
      icon: "warning",
      title: "Empty Field",
      text: "Please enter a GitHub username before searching.",
    });
  } else {
    fetchUserData(username);
  }
});
