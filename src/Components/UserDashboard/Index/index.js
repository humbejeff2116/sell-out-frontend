
import React from 'react';
import styles from './Index.module.css';
import './index.css';





export default function DashboardIndex(props) {
    return (
        <div className="user-dashboard-container">
            {/* 1 */}
            <div className={`${styles.chartContainer} ${styles.doubleColumn}`}>
                <div className={styles.chartContainerTop}>
                    <div className={styles.chartContainerTopChild}>1</div>
                    <div className={styles.chartContainerTopChild}>2</div>
                </div>
                
                <div className={styles.chartContainerBottom}>
                    <div className={styles.chartContainerBottomChild}>
                        store
                    </div>
                    <div className={styles.chartContainerBottomChild}>
                        payments
                    </div>
                    <div className={styles.chartContainerBottomChild}>
                        Orders
                    </div>
                </div>
            </div>
            {/* 2 */}
            <div className={styles.chartContainer}>
                <div className="user-dashboard-graph">
                    dashboard sales graph2
                </div>
            </div>
            {/* 3 */}
            <div className={styles.chartContainer}>
                <div className="user-dashboard-graph">
                    dashboard sales graph3
                </div>
            </div>
            {/* 4 */}
            <div className={styles.chartContainer}>
                <div className="user-dashboard-graph">
                    dashboard sales graph4
                </div>
            </div>
        </div>
    )
}