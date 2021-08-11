





import React, {useEffect, useState} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';
import image2 from '../../Images/product3.webp';
import './interest.css';

const mockGotInterestData = [
    {
        userProfileImage:'',
        userName: 'jeffrey humbe',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""},{src:""},{src:""}]
    },
    {
        userProfileImage:'',
        userName: 'jude afah',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""},{src:""},{src:""}]
    },
    {
        userProfileImage:'',
        userName: 'mercy josh ',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""},{src:""},{src:""}]
    },
];

const mockInterestedInData =[
    {
        productOrServiceId: '',
        productOrServiceName: 'black panther',
        productOrServiceImages: [{src:""},{src:""},{src:""}]
    },
    {
        productOrServiceId: '',
        productOrServiceName: 'black panther',
        productOrServiceImages: [{src:""},{src:""},{src:""}]
    },
    {
        productOrServiceId: '',
        productOrServiceName: 'black panther',
        productOrServiceImages: [{src:""},{src:""},{src:""}]
    }
]



export default function Interests() {
    const [interestRecived, setInterestRecived] = useState([]);
    const [productsInterestedIn, setProductsInterestedIn] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        let mounted = true;
        if (user && mounted) {
            socket.emit('getInterests', user);
        }
        socket.on('getInterestsSuccess', function (response) {
            const { interestRecived, productsInterestedIn } = response.data;
            if (mounted) {
                setInterestRecived(interestRecived);
                setProductsInterestedIn(productsInterestedIn);
            }
        });
        return () => {
            mounted = false;
        }
    }, [user])

    const removeInterest = (interestId) => {

    }
    return (
        <div className="interest-container">
            <div className="interest-header">
            header
            </div>


            {
                mockGotInterestData.length && (
                    mockGotInterestData.map((interest, i) =>
                        <GotInterest key={i} {...interest} />
                    )
                )
            }





            {
               mockInterestedInData.length && (
                mockInterestedInData.map((interest, i) =>
                        <InterestedIn key={i} {...interest} />
                    )
                )
            }
            {/* {
                interestRecived.length && (
                    interestRecived.map((interest, i) =>
                        <GotInterest key={i} {...interest} />
                    )
                )
            } */}

            {/* {
                productsInterestedIn.length && (
                    productsInterestedIn.map((interest, i) =>
                    <Interest key={i} {...interest} />
                    )
                )
            } */}
        </div>
    )
}




function GotInterest(props) {
    return (
        <>
        

        <div className="interest-panel">
            <div className="interest-profile" >
                <div  className="interest-profile-image">
                    <img src={props.userProfileImage || image} alt="avatar" />
                </div>

                <div className="interest-profile-info">
                    <div> <span>{props.userName || 'unknown'}</span></div>
                </div>

                <div className="interest-profile-remove">
                    <div className="interest-profile-remove-icon" onClick={()=> props.removeInterest()}>
                        <i>X</i>
                        {/* <div className="interest-profile-remove-title">
                            <span>Delete </span>
                        </div> */}
                    </div>
                    
                </div>
            </div>

            <div className="interest-images-panel">
                <div className="interest-images-header">
                    <span>Got interest from <b>{` ${props.userName || 'unknown'}`}</b>{' '}
                    on <b>{` ${props.productOrServiceName || 'unknown'}`}</b>
                    </span> 
                   
                </div>

                <div className="interest-images">
                {
                    props.productOrServiceImages.map((image, i) =>
                        <div key={i} className="interest-image-group">
                        <img src={image.src || image2} alt="product" />
                        </div>
                    )
                }
                </div>
            </div>

            <div className="interest-buttons" >
                <div className="interest-button-group">
                    <div className="interest-button"><button>{`Sold to ${props.userName ||'unkonwn'}?`}</button></div>
                </div>
                <div className="interest-button-group">
                    <div className="interest-button"><button>{`Didn't sell to ${props.userName ||'unkonwn'}?`}</button></div>
                </div>
            </div>
        </div>
        
        </>
    )
}


function InterestedIn(props) {
    const { user } = useAuth();
    return (
        <>
        <div className="interest-panel">
            <div className="interest-profile" >
                <div  className="interest-profile-image">
                    <img src={user?.profileImage || image} alt="avatar" />
                </div>

                <div className="interest-profile-info">
                    <span>{user?.fullName}</span>
                </div>

                <div className="interest-profile-remove">
                    <div className="interest-profile-remove-icon" onClick={()=> props.removeInterest()}>
                        <i>X</i>
                        {/* <div className="interest-profile-remove-title">
                            <span>Delete </span>
                        </div> */}
                    </div>
                    
                </div>
            </div>

            <div className="interest-images-panel">
                <div className="interest-images-header">
                    <span>showed interest in<b> {props.productOrServiceName } </b></span>
                </div>

                <div className="interest-images">
                    {
                        props.productOrServiceImages.map((image, i) =>
                            <div key={i} className="interest-image-group">
                            <img src={image.src || image2} alt="product"/>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="interest-buttons" >
                <div className="interest-button-group">
                    <div className="interest-button"><button>Bought product?</button></div>
                </div>
                <div className="interest-button-group">
                    <div className="interest-button"><button>Declined?</button></div>
                </div>
            </div>
        </div>
        
        </>
    )
}