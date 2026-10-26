const blogPostsContainer = document.getElementById("blog-posts");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const resultsCount = document.getElementById("results-count");
const postModalElement = document.getElementById("postModal");
const modalTitle = document.getElementById("postModalLabel");
const modalCategory = document.getElementById("postModalCategory");
const modalBody = document.getElementById("postModalBody");

let allPosts = [];

function showMessage(message, iconClass) {
  const column = document.createElement("div");
  const state = document.createElement("p");
  const icon = document.createElement("i");

  column.className = "col-12";
  state.className = "empty-state";
  icon.className = iconClass;
  icon.setAttribute("aria-hidden", "true");
  state.append(icon, document.createTextNode(message));
  column.append(state);
  blogPostsContainer.replaceChildren(column);
}

function populateCategories(posts) {
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second));

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
}

function createPostCard(post) {
  const column = document.createElement("div");
  const card = document.createElement("article");
  const imageWrap = document.createElement("div");
  const image = document.createElement("img");
  const body = document.createElement("div");
  const category = document.createElement("p");
  const title = document.createElement("h3");
  const excerpt = document.createElement("p");
  const readButton = document.createElement("button");
  const arrow = document.createElement("i");

  column.className = "col-12 col-md-6 col-lg-4";
  card.className = "blog-card";
  imageWrap.className = "blog-card-image-wrap";
  image.className = "blog-card-image";
  image.src = post.image;
  image.alt = post.title;
  image.loading = "lazy";
  imageWrap.append(image);

  body.className = "blog-card-body";
  category.className = "category-tag";
  category.textContent = post.category || "Insights";
  title.className = "blog-card-title";
  title.textContent = post.title;
  excerpt.className = "blog-card-excerpt";
  excerpt.textContent = post.excerpt;
  readButton.className = "btn-read";
  readButton.type = "button";
  readButton.append(document.createTextNode("Read the story"));
  arrow.className = "fa-solid fa-arrow-right";
  arrow.setAttribute("aria-hidden", "true");
  readButton.append(arrow);
  readButton.addEventListener("click", () => openPost(post));

  body.append(category, title, excerpt, readButton);
  card.append(imageWrap, body);
  column.append(card);
  return column;
}

function displayPosts(posts) {
  if (posts.length === 0) {
    resultsCount.textContent = "No stories match your search.";
    showMessage("Try another search or choose a different topic.", "fa-regular fa-face-smile");
    return;
  }

  resultsCount.textContent = `${posts.length} ${posts.length === 1 ? "story" : "stories"}`;
  blogPostsContainer.replaceChildren(...posts.map(createPostCard));
}

function filterPosts() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedCategory = categoryFilter.value;
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const searchableText = `${post.title} ${post.excerpt} ${post.content} ${post.category}`
      .toLocaleLowerCase();
    return matchesCategory && searchableText.includes(query);
  });

  displayPosts(filteredPosts);
}

function openPost(post) {
  modalTitle.textContent = post.title;
  modalCategory.textContent = post.category || "Insights";
  modalBody.replaceChildren();

  const image = document.createElement("img");
  image.className = "modal-post-image";
  image.src = post.image;
  image.alt = post.title;
  image.loading = "lazy";

  const content = document.createElement("p");
  content.className = "modal-post-content";
  content.textContent = post.content;
  modalBody.append(image, content);

  bootstrap.Modal.getOrCreateInstance(postModalElement).show();
}

async function fetchPosts() {
  try {
    const response = await fetch("posts.json");
    if (!response.ok) {
      throw new Error(`Blog posts request failed with status ${response.status}`);
    }

    const posts = await response.json();
    if (!Array.isArray(posts)) {
      throw new Error("Blog posts data must be a JSON array");
    }

    allPosts = posts;
    populateCategories(allPosts);
    filterPosts();
  } catch (error) {
    console.error("Unable to load blog posts:", error);
    resultsCount.textContent = "";
    showMessage("We couldn’t load the stories just now. Please refresh and try again.", "fa-solid fa-triangle-exclamation");
  }
}

searchInput.addEventListener("input", filterPosts);
categoryFilter.addEventListener("change", filterPosts);
fetchPosts();
