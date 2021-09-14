





import React, {useState, useEffect} from 'react';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';
import  {
  
    DoubleImageComponent,
    TrippleImageComponent,
    CommentImageComponent
} from '../ImageComp/imageComp';
import './modalProduct.css'




export default function ModalProduct(props) {
    let [starCount, setStarCount] = useState(0);
    const [starsUserRecieved, setStarsUserRecieved] = useState([]);
    const [starClicked, setStarClicked] = useState(false);
    const { product, ProductPanelClassName} = props;
    const { user } = useAuth();

    useEffect(() => {
        if (user) { 
            setStarOnLoad(user, product, setStarCount);         
        } 
        setStarsUserRecieved(product.starsUserRecieved);
    }, [product, user]);

    const setStarOnLoad = (user, product, callback) => {
        const userEmail = user.userEmail;
        const starsUserRecieved = product.starsUserRecieved ? product.starsUserRecieved: null;
        let starCount = 0;
        if (starsUserRecieved) {
            for (let i = 0; i < starsUserRecieved.length; i++) {
                if (starsUserRecieved[i].starGiverEmail === userEmail) {
                    starCount = starsUserRecieved[i].star;
                    break;
                }
            }
            return callback(starCount);
        }   
    }
  
    const starSeller = (product, user, star) => {   
        if (!star) {
            if(user) {
                const addeStar = {
                    star: star, 
                    starGiverEmail: user.userEmail, 
                    starGiverId: user.id,
                    starGiverFullName: user.fullName
                }
                setStarsUserRecieved(currentState => [...currentState, addeStar]);
            }
            setStarClicked(true);
            setStarCount(++starCount);
            const data = {
                product,
                user,
                starCount: starCount
            }
            socket.emit('starSeller', data );
            return;
        }
        if (user) {
            setStarsUserRecieved(currentState => currentState.filter( star => star.starGiverEmail !== user.userEmail));
        }
        setStarClicked(false);
        setStarCount(--starCount);
        const data = {
            product,
            user,
            starCount: starCount
        }
        socket.emit('starSeller', data );
    }
    
    let imageComponent = null;

    if (product.productImages.length === 1) {
        imageComponent = <CommentImageComponent image={product.productImages}/>
    }
    if (product.productImages.length === 2) {
        imageComponent = <DoubleImageComponent images={product.productImages}/>
    }
    if (product.productImages.length === 3) {
        imageComponent = <TrippleImageComponent images={product.productImages}/>
    }
    return (
        <div className={ProductPanelClassName}>

            <div className="modal-product-image-wrapper">
                { imageComponent }
                <div className="modal-product-image-details">
                    <div className="modal-product-details-name">
                        <span>blue denim close up andre 200 </span>
                    </div>
                    <div className="modal-product-details-price">
                        <p>£300.00 (22% OFF) <span>£320.00</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
