const tokenBlacklist = new Set<string>()

export function addTokenToBlacklist(token: string) {
    tokenBlacklist.add(token)
}

export function isTokenBlacklisted(token: string): boolean {
    return tokenBlacklist.has(token)
}