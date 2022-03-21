
import socket from '../../Components/Socket/socket';
import { getUserStars } from '../../Utils/http.services';

function UserLib() {}

UserLib.prototype.getSellerStars = async function(userId, user, setStarCount, setStarsUserRecieved) {

    const sellerStarsResponse = await getUserStars(userId)
   
    if (sellerStarsResponse.error) return;

    this.setStarCountOnLoad(user, sellerStarsResponse?.data?.starsUserRecieved, setStarCount);

    setStarsUserRecieved(sellerStarsResponse?.data?.starsUserRecieved);

}

UserLib.prototype.starSeller = function(product, user, starCount, setStarsUserRecieved, setStarCount) {
        
    if (!starCount) {

        if (user) {

            const addeStar = {
                star: starCount, 
                userEmail: user.userEmail, 
                userId: user.id,
                userFullName: user.fullName
            }

            setStarsUserRecieved(currentState => [...currentState, addeStar]);

            // setStarClicked(true);

            setStarCount(++starCount);

        }

        const data = {
            product,
            user,
            starCount: starCount
        }

        socket.emit('starSeller', data);

        return;
          
    }
    
    if (user) {

        setStarsUserRecieved(currentState => currentState.filter( star => star.userEmail !== user.userEmail));

        // setStarClicked(false);

        setStarCount(--starCount);

    }

    const data = {
            product,
            user,
            starCount: starCount
        }

        socket.emit('starSeller', data );
   
}

UserLib.prototype.setStarCountOnLoad = function (user, starsUserRecieved, setStarCount) {

    const userEmail = user?.userEmail;

    let starCount = 0;

    if (!starsUserRecieved  || !user) {

        return setStarCount(starCount);
    }

    const len = starsUserRecieved.length;

    let i;
    
    for ( i = 0; i < len; i++) {

        if (starsUserRecieved[i].userEmail === userEmail) {

            starCount = starsUserRecieved[i].star;

            break;
        }

    }

    return setStarCount(starCount);

}

UserLib.prototype.getSellerStarsWhenUserDataChange = function ({mounted, userId, user, setStarCount, setStarsUserRecieved}) {

    socket.on('starUserDataChange', function() {

        if (mounted) {

            this.getSellerStars({userId, user, setStarCount, setStarsUserRecieved})
    
        }
    
    });

}

export default new UserLib();