export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (page: number, filters?: object) =>
      [...queryKeys.posts.lists(), { page, ...filters }] as const,
  },
};
