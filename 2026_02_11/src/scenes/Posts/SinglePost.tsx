import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import type { Post } from "../../types/Post/Post"
import styles from "./SinglePost.module.scss"
import { fetchPostById } from "../../api/posts"

export default function SinglePost() {
    const { id } = useParams()

    const {
        data: post,
        isPending,
        isError,
    } = useQuery<Post>({
        queryKey: ["post", id],
        queryFn: () => fetchPostById(id!),
        enabled: !!id,
    })

    if (isPending) return <>Trwa ładowanie...</>
    if (isError || !post) return <>Nie znaleziono wpisu 😭</>

    return (
        <section className={styles.SinglePost}>
            <div className={styles.SinglePostWrapper}>
                <h1 className={styles.SinglePostTitle}>{post.title}</h1>
                <p className={styles.SinglePostBody}>{post.body}</p>
                <Link to="/wpisy" className={styles.SinglePostBackLink}>
                    ← Wróć do listy
                </Link>
            </div>
        </section>
    )
}
