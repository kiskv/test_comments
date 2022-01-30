export const getUserInitials = (userName: string) =>
    userName
        .split(' ')
        .map((name) => name[0])
        .join('');
