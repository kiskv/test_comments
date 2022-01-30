export const getUserInitials = (userName: string) =>
    userName
        .split(' ')
        .map((name) => name[0].toUpperCase())
        .join('')
        .slice(0, 2);
