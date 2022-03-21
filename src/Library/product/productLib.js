
import socket from '../../Components/Socket/socket';
import { getProductLikes } from '../../Utils/http.services';


function ProductLib() {}

ProductLib.prototype.likeProduct = async function(product, user, likeCount, setLikesProductRecieved, setLikeCount) {

    if (!likeCount) {

        if (user) {

            const addedLike = {
                like: likeCount, 
                userEmail: user.userEmail, 
                userId: user.id,
                userFullName: user.fullName
            }

            setLikesProductRecieved(currentState => [...currentState, addedLike]);

            setLikeCount(++likeCount);

        }

        const data = {
            product,
            user,
            likeCount: likeCount
        }

        socket.emit('likeProduct', data);

        return;
            
    }
    
    if (user) {

        setLikesProductRecieved(currentState => currentState.filter( like=> like.userEmail !== user.userEmail));

        setLikeCount(--likeCount);

    }

    const data = {
            product,
            user,
            likeCount: likeCount
    }

    socket.emit('likeProduct', data);

}

ProductLib.prototype.getAllProductLikes = async function(productId, user, setLikeCount, setLikesProductRecieved){

    const productLikesResponse = await getProductLikes(productId)
   
    if (productLikesResponse.error) return;

    this.setLikeCountOnLoad(user, productLikesResponse?.data, setLikeCount);

    setLikesProductRecieved(productLikesResponse?.data);

}

ProductLib.prototype.setLikeCountOnLoad = function(user, likesProductRecieved, setLikeCount) {

    const userEmail = user?.userEmail;

    let likeCount = 0;

    if (!likesProductRecieved || !likesProductRecieved.length > 0 || !user) {

        return setLikeCount(likeCount);

    }

    const likesProductRecievedLen = likesProductRecieved.length;

    let i;
    
    for ( i = 0; i < likesProductRecievedLen; i++) {

        if (likesProductRecieved[i].userEmail === userEmail) {

            likeCount = 1;

            break;
        }

    }

    return setLikeCount(likeCount);

}

ProductLib.prototype.getProductLikesWhenProductDataChange = function({mounted, productId, user, setLikeCount, setLikesProductRecieved}) {

    socket.on('likeProductDataChange', function() {

        if (mounted) {
    
            this.getAllProductLikes({productId, user, setLikeCount, setLikesProductRecieved});
    
        }
    
    });

}

export default new ProductLib();