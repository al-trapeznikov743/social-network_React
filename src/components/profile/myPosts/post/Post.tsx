import React from 'react'
import styles from './Post.module.sass'


type PostPropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PostPropsType> = React.memo((props) => {
    return  <div className={styles.item}>
                <img 
                    src='https://sova.ponominalu.ru/wp-content/uploads/2019/08/ava-max.jpg' 
                    alt='avatar'
                    className={styles.img}
                    />
                {props.message}
                <span>{props.likesCount}</span>
            </div>
})

export default Post