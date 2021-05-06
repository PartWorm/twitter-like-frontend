const make_sort_by = (display_name: string, key: string): SortBy =>
	({ display_name, key });

export type SortBy = {
	display_name: string;
	key: string;
};

export const SortBy = {
	Hot: make_sort_by('인기', 'hot'),
	New: make_sort_by('최신', 'new'),
	Old: make_sort_by('오래된', 'old'),
};
export const SortByValues = Object.values(SortBy);
