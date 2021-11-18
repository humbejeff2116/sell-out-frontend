




import React from 'react';
import './index.css';





export default function DashboardIndex(props) {
    return (
        <div className="user-dashboard-container">
            <div className="user-dashboard-graph-container">
                <div className="user-dashboard-graph">
                    dashboard sales graph
                </div>
            </div>

            <div className="user-dashboard-navigation-container">
                <div className="user-dashboard-navigation-child">
                store
                </div>
                <div className="user-dashboard-navigation-child">
                payments
                </div>
                <div className="user-dashboard-navigation-child">
                Orders
                </div>
            </div>
        </div>
    )
}