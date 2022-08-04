
import React from 'react';
import { MainNavigation } from '../Header/header';
import styles from './BottomNavigation.module.css';


export default function BottomNavigation() {
    return (
        <div className={styles.container}>
            <MainNavigation/>
        </div>
    )
}