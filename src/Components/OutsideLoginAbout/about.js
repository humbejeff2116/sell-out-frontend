import React from 'react';
import { LandingTemplate } from '../Landing/Template/template';
import { 
    AboutFlingThreeColumnChild, 
    threeColumnChildPosition 
} from '../Landing/Partials/partials';
import { 
    TwoColWithIllustration, 
    illustrationPosition 
} from '../OutsideLoginSellProducts/sellProducts';
import shopping from '../../Images/Illustrations/draw-kit/SVG/shopping4.svg';
import shoppingg from '../../Images/Illustrations/draw-kit/SVG/shopping3.svg';
import shoppinggg from '../../Images/Illustrations/draw-kit/SVG/shopping2.svg';
import shoppingggg from '../../Images/Illustrations/draw-kit/SVG/shopping10.svg';
import styles from './About.module.css';

const threeColData = [
    {
        position: threeColumnChildPosition.top, 
        headerText: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer
        `,
        bodyText: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shoppingg,
        imgAlt: '',
        splitIntoTwoEqualRows: true
    },
    {
        position: threeColumnChildPosition.bottom, 
        headerText: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer
        `,
        bodyText: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shoppinggg,
        imgAlt: '',
        splitIntoTwoEqualRows: true
    },
    {
        position: threeColumnChildPosition.top, 
        headerText: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer
        `,
        bodyText: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shoppingggg,
        imgAlt: '',
        splitIntoTwoEqualRows: true
    },
]
const singleColPosition = {
    left: 'left',
    right: 'right'
}
const singleColPositionClass = {
    [singleColPosition.left]: "leftPos",
    [singleColPosition.right]: "rightPos"
}
const singleColData = [
    {
        imgSrc: shopping,
        imgAlt: ''
    },
    {
        imgSrc: shopping,
        imgAlt: '',
        position: singleColPosition.right
    }
]
const twoColWithIllustrationData = [
    {
        illustrationPosition: illustrationPosition.right,
        imgSrc: shoppingg,
        imgAlt: '',
        headerText: `
            heading here and not there
        `,
        bodyText: `
            this is the writeup of this component 
            i am yet to figure out but i am confident i will by tomorrow
            and next or today and so i would like you to keep your fingers crossed
        `
    },
    {
        illustrationPosition: illustrationPosition.left,
        imgSrc: shoppingg,
        imgAlt: '',
        headerText: `
            heading here and not there
        `,
        bodyText: `
            this is the writeup of this component 
            i am yet to figure out but i am confident i will by tomorrow
            and next or today and so i would like you to keep your fingers crossed
        `

    }
]
const firstTwoColWithIllustrationData = twoColWithIllustrationData[0];
const secondTwoColWithIllustrationData = twoColWithIllustrationData[1];

export default function ABout() {
    return (
        <LandingTemplate 
        showCartMenuItem
        stickHeaderToTop
        landingTopChild = { 
            <AboutComponent 
            { ...{firstTwoColWithIllustrationData, secondTwoColWithIllustrationData} }
            /> 
        }
        />
    )
}

function AboutComponent({
    firstTwoColWithIllustrationData,
    secondTwoColWithIllustrationData
}) {
    return (
        // TODO... return cart nav here
        <div className = { styles.container }>
           <div className = { styles.containerChildWrapper }>
                <div className = { styles.containerChild }>
                    <TwoColWithIllustration
                    illustrationPos = { firstTwoColWithIllustrationData.illustrationPosition }
                    { ...firstTwoColWithIllustrationData }
                    />
                </div>
           </div>
           <div className = { styles.containerChildWrapper }>
                <SingleColumnComponent compData = { singleColData }/>
           </div>
           <div className = { styles.containerChildWrapper }>
                <ThreeColumnComponent compData = { threeColData }/>
           </div>
            <div className = { styles.containerChildWrapper }>
                <div className = { styles.containerChild }>
                    <TwoColWithIllustration
                    illustrationPos = { secondTwoColWithIllustrationData.illustrationPosition }
                    { ...secondTwoColWithIllustrationData }
                    />
                </div>
            </div>
        </div>
    )
}

function SingleColumnComponent({ compData }) {
    return (
        <>
            {compData?.map((data, i) => 
                <SingleColChild { ...data } key = { i }/>
            )}
        </>
    )
}

function SingleColChild({
    imgSrc, 
    imgAlt,
    position
}) {
    const childPos = singleColPositionClass[position];

    return (
        <div className = { `${styles.singleColWrapper} ${childPos && styles[childPos]}` }>
            <div className = { styles.singleColChild }>
                <img 
                src = { imgSrc } 
                loading="lazy" 
                alt = { imgAlt } 
                className = { styles.doubleRowTopImage }
                />
            </div>
        </div>
    )
}

function ThreeColumnComponent({ compData }) {
    return (
        <div className = { styles.threeColWrapper }>
        {compData?.map((data, i) => 
            <ThreeColChild { ...data } key = { i }/>
        )}
        </div>
    )
}

function ThreeColChild({
    headerText,
    bodyText,
    imgSrc,
    imgAlt,
    splitIntoTwoEqualRows,
    position
}) {
    return (
        <div className = { styles.threeColChildWrapper }>
            <AboutFlingThreeColumnChild
            splitIntoTwoEqualRows = { splitIntoTwoEqualRows }
            position = { position }
            imgSrc = { imgSrc }
            imgAlt = { imgAlt }
            headerText = { headerText }
            bodyText = { bodyText }
            />
        </div>
    )
}