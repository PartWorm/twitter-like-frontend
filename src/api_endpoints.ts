const root = '/';
export const api_tags = root + 'api/tags.php';
export const api_name = root + 'api/name.php';
export const api_post = (id: string, sort_by: string) =>
	root + `api/post.php?id=${id}&sort-by=${sort_by}`;
export const api_home_posts_with_tag = (tag: string) =>
	root + `api/home-posts.php?tag=${tag}`;
export const api_home_posts = root + 'api/home-posts.php';
