import {useEffect, useState} from "react";
import type {Post} from "../../types/Post/Post";
import {useParams, Link} from "react-router-dom";


import styles from './SinglePost.module.scss'


export default function SinglePost() {
    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!id) return;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(json => setPost(json as Post))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <>Trwa ładowanie...</>;
    if (isError || !post) return <>Nie znaleziono wpisu 😭</>;

    return (
        <div className={styles.SinglePost}>
            <div className={styles.SinglePostWrapper}>
                <h1 className={styles.SinglePostTitle}>{post.title}</h1>
                <p className={styles.SinglePostBody}>{post.body}</p>
                <Link to="/wpisy" className={styles.SinglePostBackLink}>
                    ← Wróć do listy
                </Link>
            </div>
        </div>
    );
}
