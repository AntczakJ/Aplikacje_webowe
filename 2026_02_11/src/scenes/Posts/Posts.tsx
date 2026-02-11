import type { Post } from "../../types/Post/Post"
import styles from "./Posts.module.scss"
import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../api/posts"

export default function Posts() {
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  return (
      <div className={styles.Posts}>
        {isPending && <>Trwa ładowanie...</>}

        {isError && <>Wystąpił nieoczekiwany błąd 😭</>}

        {!isPending && !isError && (
            <>
              {(posts?.length ?? 0) > 0 && (
                  <>
                    {posts!.map((p) => (
                        <div key={p.id} className={styles.PostsPost}>
                          <h2 className={styles.PostsPostTitle}>{p.title}</h2>
                          <p className={styles.PostsPostBody}>
                            {p.body.substring(0, 50)}...
                          </p>
                          <Link to={`/wpisy/wpis/${p.id}`} className={styles.PostsPostLink}>
                            Przejdź do wpisu
                          </Link>

                        </div>
                    ))}
                  </>
              )}

              {(posts?.length ?? 0) === 0 && <>Brak wpisów...</>}
            </>
        )}
      </div>
  )
}
