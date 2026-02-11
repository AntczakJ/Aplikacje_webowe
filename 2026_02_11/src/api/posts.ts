import type { Post } from "../types/Post/Post"

export async function fetchPosts(): Promise<Post[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!res.ok) {
        throw new Error("Network response was not ok")
    }
    return res.json()
}

export async function fetchPostById(id: string): Promise<Post> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if (!res.ok) {
        throw new Error("Network response was not ok")
    }
    return res.json()
}
