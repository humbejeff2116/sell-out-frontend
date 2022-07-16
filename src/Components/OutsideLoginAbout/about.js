
import React from 'react';
import { LandingTemplate } from '../Landing/Template/template';
import { 
    OutsideloginChildTemplateIllustrationLeft,
    OutsideloginChildTemplateIllustrationRight 
} from '../OutsideLoginSellProducts/sellProducts'
import styles from './About.module.css';


export default function ABout() {
    return (
        <LandingTemplate 
        showCartMenuItem
        stickHeaderToTop
        landingTopChild = { <AboutComponent/> }
        />
    )
}


function AboutComponent(props) {
    return (
        // TODO... return cart nav here
        <div className = { styles.container }>
           <div className = { styles.top }>
                <OutsideloginChildTemplateIllustrationRight
                leftChild={"illustration here"}
                heading="heading here and not there"
                writeup="this is the writeup of this component 
                 i am yet to figure out but i am confident i will by tomorrow
                 and next or today and so i would like you to keep your fingers crossed"
                />
           </div>

           <div className = { styles.containerChild }>
                middle
           </div>

           <div className = { styles.containerChild }>
                <OutsideloginChildTemplateIllustrationLeft
                leftChild={"illustration here"}
                heading="heading here and not there"
                writeup="this is the writeup of this component 
                 i am yet to figure out but i am confident i will by tomorrow
                 and next or today and so i would like you to keep your fingers crossed"
                />
           </div>
        </div>
    )
}