import {useEffect, useState} from "react";
import type {Post} from "../../types/Post/Post.ts";

import styles from './Posts.module.scss'
import {Link} from "react-router";

export default function Posts() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [posts, setPosts] = useState<Array<Post>>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(json as Array<Post>))
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  return (
    <div className={styles.Posts}>
      {isLoading && (
        <>Trwa ładowanie...</>
      )}
      {isError && (
        <>Wystąpił nieoczekiwany błąd 😭</>
      )}
      {!isLoading && !isError && (
        <>
          {posts.length > 0 && (
            <>
              {posts.map(p => (
                <div className={styles.PostsPost} key={p.id}>
                  <h5 className={styles.PostsPostTitle}>
                    {p.title}
                  </h5>
                  <p className={styles.PostsPostBody}>
                    {p.body.substring(0, 50)}...
                  </p>
                  <Link
                    to={'/wpisy/wpis/' + p.id}
                    className={styles.PostsPostLink}
                  >
                    Przejdź do wpisu
                  </Link>
                </div>
              ))}
            </>
          )}
          {posts.length === 0 && (
            <>Brak wpisów...</>
          )}
        </>
      )}

    </div>
  )
}
