







import React from 'react';
import { IndexPageTemplate} from '../../Components/Template/template';
import Interests from '../../Components/Interests/interest';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';





 function InterestPageComp() {
    return (
        <IndexPageTemplate>
            <Interests />
        </IndexPageTemplate>
    )
}

const InterestPage = RequireAuthentication(InterestPageComp);
export default InterestPage;