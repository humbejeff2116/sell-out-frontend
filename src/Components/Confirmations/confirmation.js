




import React, {useEffect, useState} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg'
import image2 from '../../Images/product.webp'
import './confirmation.css';




export default function Confirmations() {
   
    const [confirmations, setConfirmations] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        let mounted = true;
        if (user && mounted) {
            socket.emit('getConfirmations', user);
        }
        socket.on('getConfirmationsSuccess', function (response) {
            const { data } = response;
            if (mounted) {
                setConfirmations(data);   
            }
        });
        return () => {
            mounted = false;
        }
    }, [user]);

    const removeInterest = (interestId) => {

    }
    return (
        <div className="confirmations-container">

        <div className="confirmations-header">
            header
        </div>

        <div className="confirmations-panel">
            <div className="confirmations-profile" >
                <div  className="confirmations-profile-image">
                    <img src={image} alt="avatar" />
                </div>

                <div className="confirmations-profile-info">
                    <span>user name</span>
                </div>

                <div className="confirmations-profile-remove">
                    <div className="confirmations-profile-remove-icon" onClick={()=> removeInterest()}>
                        <i>X</i>
                        <div className="confirmations-profile-remove-title">
                            <span>Delete </span>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="confirmations-images-panel">
                <div className="confirmations-images-header">
                    <span>user said you bought this product</span>
                </div>

                <div className="confirmations-images">
                    <div className="confirmations-image-group">
                    <img src={image2} alt="avatar" />
                    </div>
                    <div className="confirmations-image-group">
                    <img src={image2} alt="avatar" />
                    </div>
                    <div className="confirmations-image-group">
                    <img src={image2} alt="avatar" />
                    </div>
                </div>
            </div>

            <div className="confirmations-buttons" >
                <div className="confirmations-button-group">
                    <div className="confirmations-button"><button>True</button></div>
                </div>
                <div className="confirmations-button-group">
                    <div className="confirmations-button"><button>False</button></div>
                </div>
            </div>
        </div>   

        </div>
    )
}