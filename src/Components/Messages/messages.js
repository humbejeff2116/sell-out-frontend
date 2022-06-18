

import React from 'react';
import styles from './Messages.module.css';


export default function Messages() {
    return (
        <div>
           <MessageWrapper/>
        </div>
    )
}

function MessageWrapper({ ...props }) {
    return (
        <div className={ styles.chatContainer }>
            <section className={ styles.leftBar }>
                left side bar
            </section>

            <section className={ styles.chatAreaContainer }>
                <div className={ styles.chatAreaTop }>
                    header
                </div>

                <div className={ styles.chatAreaCenter }>
                    chat body
                    <div className= {styles.mssg}>hfdjfhdjfhdjfh</div>
                    <div className= {styles.mssg}>hfdjfhdjfhdjfh</div>
                    <div className= {styles.mssg}>hfdjfhdjfhdjfh</div>
                    <div className= {styles.mssg}>hfdjfhdjfhdjfh</div>
                </div>

                <div className={ styles.chatAreaBottom }>
                    chat footer
                </div>
            </section>

            <section className={ styles.rightBar }>
                right side bar
            </section>
        </div>
    )
}