import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RiUserAddLine } from 'react-icons/ri';
import { TextInput } from '../../Formik/formik';
import hubNetworkLogo from '../../../Images/Brands/hub-network.svg';
import flutterwaveLogo from '../../../Images/Brands/flutterwave.svg';
import shopifyLogo from '../../../Images/Brands/shopify.svg';
import paystackLogo from '../../../Images/Brands/paystack.svg';
import shoppingg from '../../../Images/Illustrations/draw-kit/SVG/shopping3.svg';
import shopping from '../../../Images/Illustrations/draw-kit/SVG/shopping6.svg';
import bubblesBackground from '../../../Images/Illustrations/IRA/bg-2.svg';
import styles from './Partials.module.css';


export const threeColumnChildPosition = {
    top: "top",
    bottom: "bottom"
}
const AboutFlingThreeColData = [
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
        imgSrc: shoppingg,
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
        imgSrc: shoppingg,
        imgAlt: '',
        splitIntoTwoEqualRows: true
    },
]
const illustrationPosition = {
    right: 'right',
    left: 'left'
}
const AboutFlingTwoRowData = [
    {
        illustrationPos: illustrationPosition.left, 
        headerText: `
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        bodyText: `
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shoppingg,
        imgAlt: ''
    },
    {
        illustrationPos: illustrationPosition.right, 
        headerText: `
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        bodyText: `
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
            Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shoppingg,
        imgAlt: ''
    },
]
const brands = [
    {
        imgSrc: paystackLogo,
        imgAlt: 'Paystack',
    },
    {
        imgSrc: shopifyLogo,
        imgAlt: 'Shopify',
    },
    {
        imgSrc: flutterwaveLogo,
        imgAlt: 'FlutterWave',
    },
    {
        imgSrc: hubNetworkLogo,
        imgAlt: 'Hub Network',
    }
]
const subscribeComponentData = {
    headerText: `
        Lorem ispium decor duje vse sec la trup dusec latrup
    `,
    bodyText: `
        Lorem ispium decor du je vse sec la trup du
        Lorem ispium decor du je vse sec la trup du
        Lorem ispium decor du je vse sec la trup du
        Lorem ispium decor du je vse sec la trup du
    `,
    imgSrc: bubblesBackground,
    imgAlt: ''
}
const AboutFlingTwoColData = [
    {
        text: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shopping,
        imgAlt: '',
        getMore(e) {

        }
    },
    {
        text: `
            Gittuib Aczions automatetes builz a, ters, ander 
            deployion workifer lorem suim bukhui repetionz.
        `,
        imgSrc: shopping,
        imgAlt: '',
        getMore(e) {
            
        }
    }
]

export default function LandingChildren() {
    return (
        <>
            <Brands brands = { brands}/>
            <AboutFlingHeadingTemplate
            heading = {` 
                Lorem ispium-ver sucrept dezerck. 
                ouug verk afik praguee importione
                booseh suiet veloctii ack mu mor.
            `}
            />
            <AboutFlingThreeColumn compData = { AboutFlingThreeColData }/>
            <AboutFlingTwoColumnWrapper>
                <AboutFlingTwoColumn compData = { AboutFlingTwoColData }/>
            </AboutFlingTwoColumnWrapper>
            <AboutFlingHeadingTemplate
            heading = {` 
                Lorem ispium-ver sucrept dezerck. 
                ouug verk afik praguee importione
                booseh suiet veloctii ack mu mor.
            `}
            />
            <AboutFlingTwoRow compData = { AboutFlingTwoRowData }/>
            <Subscribe { ...subscribeComponentData }/>
        </>
    )
}

function Brands({ brands }) {
    return (
        <div className = { styles.brandsContainer }>
            <div className = { styles.brandsWrapper }>
            {brands.map((data, i) => 
                <Brand { ...data } key = { i }/>
            )}
            </div>
        </div>
    )
}

function Brand({ imgSrc, imgAlt }) {
    return (
        <div className = { styles.brand }>
            <img 
            src = { imgSrc } 
            loading="lazy" 
            alt = { imgAlt } 
            className = { styles.brandImage }
            />
        </div>
    )
}

export function AboutFlingHeadingTemplate({ heading }) {
    return (
        <div className={ styles.headerContainer }>
            <div className={ styles.headerText }>
               { heading }
            </div>
        </div>
    )
}

const threeColumnChildPositionValue = {
    [threeColumnChildPosition.top]: "topPos",
    [threeColumnChildPosition.bottom]: "bottomPos"
}

function AboutFlingThreeColumn({ compData }) {
    return (
        <div className={ styles.threeColumnContainer }>
            {compData?.map((data, i) =>
                <div className = { styles.threeColumnChildWrapper } key = { i }>
                    <AboutFlingThreeColumnChild {...data}/>
                </div> 
            )}
        </div>
    )
}

export function AboutFlingThreeColumnChild({ 
    position,
    splitIntoTwoEqualRows,
    imgSrc,
    imgAlt,
    headerText,
    bodyText
}) {
    const childPos =  threeColumnChildPositionValue[position];

    return (
        <div className = { `${styles.threeColumnChild} ${childPos && styles[childPos]}` }>
        {splitIntoTwoEqualRows ? (
            <TwoRowTemplate
            imgSrc = { imgSrc }
            imgAlt = { imgAlt }
            headerText = { headerText  }
            bodyText = { bodyText }
            />
        ) : (
            <div className={ styles.childSingleRow }>

            </div>
        )}
        </div>
    )
}

function TwoRowTemplate({ 
    imgSrc,
    imgAlt,
    headerText,
    bodyText 
}) {
    return (
        <>
            <div className = { `${styles.childDoubleRow} ${styles.doubleRowTop}` }>
                {/* { topComponent } */}
                <img 
                src = { imgSrc } 
                loading="lazy" 
                alt = { imgAlt }
                className = { styles.doubleRowTopImage }
                />
            </div>
            <div className = { `${styles.childDoubleRow} ${styles.doubleRowBottom}` }>
                {/* { bottomComponent } */}
                <div className = { styles.doubleRowHeading }>
                    { headerText }
                </div>
                <div className = { styles.doubleRowBody }>
                    { bodyText } 
                </div>
            </div>
        </>
    )
}

function AboutFlingTwoColumnWrapper({
    children
}) {
    return (
        <div className = { styles.twoColumnWrapper }>
            <div className = { styles.twoColumnHeading }>
                Lorem ispium-ver sucrept dezerck. 
                ouug verk.
            </div>
            { children }
        </div>
    )
}

function AboutFlingTwoColumn({ 
    compData 
}) {
    return (
        <div className = { styles.twoColumnContainer }>
        {compData?.map(({getMore, ...data}, i) => 
            <div className = { styles.twoColumnChildWrapper } key = { i }>
                <TwoColumnChild 
                { ...data }
                handleButtonClick = { getMore }
                />
            </div>
        )}
        </div>
    )
}

function TwoColumnChild({
    text,
    imgSrc,
    imgAlt,
    handleButtonClick = f => f
}) {
    return (
        <div className = { styles.twoColumnChild }>
            <div className = { styles.twoColumnChildTop }>
                { text }
                <div>
                    <button 
                    className = { styles.twoColumnChildTopButton }
                    onClick = { (e) => handleButtonClick(e) }
                    >
                        Get More
                    </button>
                </div>
            </div>
            <div className = { styles.twoColumnChildBottom }>
                <img 
                src = { imgSrc } 
                loading="lazy" 
                alt= { imgAlt } 
                className = { styles.doubleRowTopImage }
                />
            </div>
        </div>
    )
}

function Subscribe({
    headerText, 
    bodyText, 
    imgSrc, 
    imgAlt
}) {
    const handleSubscription = (values) => {
        // TODO... send details to server and subscribe user
    }

    return (
        <div className = { styles.subscribeContainer }>
            <div className = { styles.subscribeTop }>
                <div className = { styles.subscribeTopChildWrapper }>
                    <SubscribeTop { ...{headerText, bodyText} }/>
                </div>
                <SubscribeBackgroundImages/>
            </div>
            <div className = { styles.subscribeWrapper }>
                <div className = { `${styles.subscribeChildWrapper} ${styles.subscribeChildWrapperLeft}` }>
                    <SignupOnFlingWrapper { ...{imgSrc, imgAlt} }/>
                </div>
                <div className = { styles.subscribeChildWrapper }>
                    <SubscribeForm handleSubmit = { handleSubscription }/>
                </div>
            </div>
        </div>    
    )
}

function SubscribeTop({ 
    headerText,
    bodyText 
}) {
    return (
        <>
            <div className = { styles.subscribeTopHeading }>
                { headerText }
            </div>
            <div className = { styles.subscribeTopTabsContainer }>
                <button className = { styles.subscribeTopTab }>
                    
                </button>
                <button className = { styles.subscribeTopTab }>
                    
                </button>
                <button className = { styles.subscribeTopTab }>
                    
                </button>
            </div>
            <div className = { styles.subscribeTopTabContent }>
                { bodyText }
            </div>
        </>
    )
}

function SignupOnFlingWrapper({ 
    imgSrc, 
    imgAlt 
}) {
    return (
        <>
            <div className = { styles.subscribeChildImageWrapper }>
                <img 
                className = { styles.subscribeChildImage }
                loading="lazy" 
                src = { imgSrc } 
                alt = { imgAlt }
                />
            </div>
            <SignUpOnFling/>
        </>
    )
}

export function SignUpOnFling() {
    return (
        <div className = { styles.signUpContainer }>
            <a href="/signup" className = { styles.signUpButton }>
                <RiUserAddLine className = { styles.signUpButtonIcon }/>
                Signup on Fling
            </a>
        </div>
    )
}

function SubscribeForm({ handleSubmit }) {
    return (
        <div className = { styles.subscribeChildContainer }>
            <div className = { `${styles.subscribeChild} ${styles.subscribeChildTop}` }>
                Be the first to get updates.
            </div>
            <div className = { `${styles.subscribeChild} ${styles.subscribeChildBottom}` }>
            <Formik
            initialValues = {{
                email: '',
                fullname: '', 
            }}
            validationSchema = {Yup.object({
                email: Yup.string().email('Invalid').required('Required'),
                fullname: Yup.string().required('Required')
            })}
            onSubmit = { handleSubmit }
            >
                <Form>
                    <TextInput
                    // useOnlyTextInput
                    name="fullname"
                    type="text"
                    placeholder="Full name"
                    errorClass="form-error-text"
                    />
                    <TextInput
                    // useOnlyTextInput
                    name="email"
                    type="email"
                    placeholder="Your email"
                    errorClass="form-error-text"
                    />
                    <div className="signup-button">
                        <button type="submit">
                            Subscribe
                        </button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
    )
}

function SubscribeBackgroundImages() {
    return (
        <div className = { styles.subscribeTopBackgroundImages }>
            <img 
            src = { bubblesBackground } 
            loading="lazy" 
            alt= "" 
            className = { styles.subscribeTopBackgroundImageLeft }
            />
        </div>
    )
}

function AboutFlingTwoRow({ compData }) {
    return (
        <div className = { styles.twoRowContainer }>
        {compData?.map((data, i) =>
            <div className = { styles.twoRowChildWrapper } key = { i }>
                <AboutFlingTwoRowChild { ...data }/>
            </div> 

        )}
        </div>
    )
}

function AboutFlingTwoRowChild({ 
    illustrationPos, 
    headerText, 
    bodyText,
    imgSrc,
    imgAlt, 
}) {
    return (
        <div className={ styles.twoRowChild }>
            {illustrationPos === illustrationPosition.right ? (
                <>
                    <div className = { styles.twoRowChildRight }>
                        <div className = { styles.twoRowChildRightHeading }>
                            { headerText }
                        </div>
                        <div className = { styles.twoRowChildRightBody }>
                            { bodyText }
                        </div>
                    </div>
                    <div className = { styles.twoRowChildLeft }>
                        <img 
                        src = { imgSrc } 
                        loading="lazy" 
                        alt = { imgAlt } 
                        className = { styles.doubleRowTopImage }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className = { styles.twoRowChildLeft }>
                        <img 
                        src = { imgSrc } 
                        loading="lazy" 
                        alt = { imgAlt } 
                        className = { styles.doubleRowTopImage }
                        />
                    </div>
                    <div className = { styles.twoRowChildRight }>
                        <div className = { styles.twoRowChildRightHeading }>
                            { headerText }
                        </div>
                        <div className = { styles.twoRowChildRightBody }>
                            { bodyText }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}