const IMAGES_CACHE_KEY = "shop-image-files";
const octokit = new Octokit();

const repoConfig = {
  owner: "wmik",
  repo: "shop"
};

function fetchLatestCommitSHA() {
  return octokit.repos.getCommits(repoConfig).then(result => {
    if (result.status === 200) {
      return result.data[0].sha;
    }
  });
}

function fetchTree(tree_sha, recursive) {
  const config = Object.assign(repoConfig, { tree_sha, recursive });
  return octokit.gitdata.getTree(config).then(result => {
    if (result.status === 200) {
      return result.data.tree;
    }
  });
}

function fetchBlob(file_sha) {
  const config = Object.assign(repoConfig, { file_sha });
  return octokit.gitdata.getBlob(config).then(blob => blob.content);
}

if (!localStorage.getItem(IMAGES_CACHE_KEY)) {
  fetchLatestCommitSHA()
    .then(sha => fetchTree(sha))
    .then(rootTree => rootTree.find(node => node.path === "images"))
    .then(imageTree => fetchTree(imageTree.sha, 1))
    .then(tree =>
      tree
        .filter(node => node.type === "blob")
        .map(node => pick(node, "path", "sha"))
    )
    .then(data =>
      localStorage.setItem(
        IMAGES_CACHE_KEY,
        JSON.stringify({ data, created_at: Date.now() })
      )
    );
}
