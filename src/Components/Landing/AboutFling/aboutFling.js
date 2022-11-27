
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../Formik/formik';
// import { SignUpOnFling } from '../HowItWorks/howItWorks';
import hubNetworkLogo from '../../../Images/Brands/hub-network.svg';
import flutterwaveLogo from '../../../Images/Brands/flutterwave.svg';
import shopifyLogo from '../../../Images/Brands/shopify.svg';
import paystackLogo from '../../../Images/Brands/paystack.svg';
import shoppingg from '../../../Images/Illustrations/draw-kit/SVG/shopping3.svg';
import shopping from '../../../Images/Illustrations/draw-kit/SVG/shopping6.svg';
import styles from './AboutFling.module.css';


export default function AboutFling(props) {
    return (
        <>
            <Brands/>
            <AboutFlingHeadingTemplate
            heading = {` 
                Lorem ispium-ver sucrept dezerck. 
                ouug verk afik praguee importione
                booseh suiet veloctii ack mu mor.
            `}
            />
            <AboutFlingThreeColumn/>
            <AboutFlingTwoColumnWrapper/>
            <AboutFlingHeadingTemplate
            heading = {` 
                Lorem ispium-ver sucrept dezerck. 
                ouug verk afik praguee importione
                booseh suiet veloctii ack mu mor.
            `}
            />
            {/* <AboutFlingThreeColumn/> */}
            <AboutFlingTwoRow/>
            {/* <SignUpOnFling/> */}
            <Subscribe/>
        </>
    )
}

function Brands() {
    return (
        <div className = { styles.brandsContainer }>
            {/* <div className={ styles.brandsHeader }>
                Trusted by these top organizations and many more
            </div> */}
            <div className = { styles.brandsWrapper }>
                <div className = { styles.brand }>
                    <img 
                    src = { paystackLogo } 
                    loading="lazy" 
                    alt="Paystack" 
                    className = { styles.brandImage }
                    />
                </div>
                <div className = { styles.brand }>
                    <img 
                    src = { shopifyLogo }
                    loading="lazy" 
                    alt="Shopify" 
                    className = { styles.brandImage }
                    />
                </div>
                <div className = { styles.brand }>
                    <img 
                    src= { flutterwaveLogo } 
                    loading="lazy" 
                    alt="FlutterWave" 
                    className = { styles.brandImage }
                    />
                </div>
                <div className = { styles.brand }>
                    <img 
                    src = { hubNetworkLogo } 
                    loading="lazy" 
                    alt="Google" 
                    className = { styles.brandImage }
                    />
                </div>
            </div>

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

const threeColumnChildPosition = {
    top: "top",
    bottom: "bottom"
}

const threeColumnChildPositionValue = {
    [threeColumnChildPosition.top]: "topPos",
    [threeColumnChildPosition.bottom]: "bottomPos"
}

function AboutFlingThreeColumn(props) {
    return (
        <div className={ styles.threeColumnContainer }>
            <div className={ styles.threeColumnChildWrapper }>
                <AboutFlingThreeColumnChild
                splitIntoTwoEqualRows
                position = { threeColumnChildPosition.top }
                />
            </div>
            <div className={ styles.threeColumnChildWrapper }>
                <AboutFlingThreeColumnChild 
                splitIntoTwoEqualRows
                position = { threeColumnChildPosition.bottom }
                />
            </div>
            <div className={ styles.threeColumnChildWrapper }>
                <AboutFlingThreeColumnChild 
                splitIntoTwoEqualRows
                position = { threeColumnChildPosition.top }
                />
            </div>
        </div>
    )
}

function AboutFlingThreeColumnChild({ 
    position,
    splitIntoTwoEqualRows
}) {
    const childPos =  threeColumnChildPositionValue[position];

    return (
        <div className = { `${styles.threeColumnChild} ${ childPos ? styles[childPos] : ""}` }>
        {splitIntoTwoEqualRows ? (
            <TwoRowTemplate/>
        ) : (
            <div className={ styles.childSingleRow }>

            </div>
        )}
        </div>
    )
}

function TwoRowTemplate({ 
    topComponent, 
    bottomComponent 
}) {
    return (
        <>
            <div className={ `${styles.childDoubleRow} ${styles.doubleRowTop}` }>
                {/* { topComponent } */}
                <img 
                src = { shoppingg } 
                loading="lazy" 
                alt="Paystack" 
                className = { styles.doubleRowTopImage }
                />
            </div>
            <div className={ `${styles.childDoubleRow} ${styles.doubleRowBottom}` }>
                {/* { bottomComponent } */}
                <div className={ styles.doubleRowHeading }>
                    Gittuib Aczions automatetes builz a, ters, ander 
                    deployion workifer
                </div>
                <div className={ styles.doubleRowBody }>
                    Gittuib Aczions automatetes builz a, ters, ander 
                    deployion workifer lorem suim bukhui repetionz. 
                </div>
            </div>
        </>
    )
}

function AboutFlingTwoColumnWrapper() {
    return (
        <div className={ styles.twoColumnWrapper }>
            <div className={ styles.twoColumnHeading }>
                Lorem ispium-ver sucrept dezerck. 
                ouug verk.
            </div>
            <AboutFlingTwoColumn/>
        </div>
    )
}

function AboutFlingTwoColumn({ 
    firstColComponent, 
    secColComponent 
}) {
    return (
        <div className={ styles.twoColumnContainer }>
            <div className={ styles.twoColumnChildWrapper }>
                <div className={ styles.twoColumnChild }>
                    <div className={ styles.twoColumnChildTop }>
                        Gittuib Aczions automatetes builz a, ters, ander 
                        deployion workifer lorem suim bukhui repetionz.
                        <div>
                            <button className={ styles.twoColumnChildTopButton }>
                                Get More
                            </button>
                        </div>
                    </div>
                    <div className={ styles.twoColumnChildBottom }>
                        <img 
                        src = { shopping } 
                        loading="lazy" 
                        alt="Paystack" 
                        className = { styles.doubleRowTopImage }
                        />
                    </div>
                </div>
            </div>
            <div className={ styles.twoColumnChildWrapper }>
                <div className={ styles.twoColumnChild }>
                    <div className={ styles.twoColumnChildTop }>
                        Gittuib Aczions automatetes builz a, ters, ander 
                        deployion workifer lorem suim bukhui repetionz.
                        <div>
                            <button className={ styles.twoColumnChildTopButton }>
                                Get More
                            </button>
                        </div>
                    </div>
                    <div className={ styles.twoColumnChildBottom }>
                        <img 
                        src = { shopping } 
                        loading="lazy" 
                        alt="Paystack" 
                        className = { styles.doubleRowTopImage }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Subscribe() {
    const handleSubscription = (values) => {
        // TODO... send details to server and subscribe user
    }

    return (
        <div className={ styles.subscribeWrapper }>
            <div className={ styles.subscribeContainer }>
                <div className={ `${styles.subscribeChild} ${styles.subscribeChildLeft}` }>
                    Be the first to get updates about deals
                </div>
                <div className={ `${styles.subscribeChild} ${styles.subscribeChildRight}` }>
                <Formik
                    initialValues = {{
                        email: '',
                        fullname:'', 
                    }}
                    validationSchema = {Yup.object({
                        fullname: Yup.string().required('Full name is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required')
                    
                    })}
                    onSubmit = { handleSubscription }
                    >
                    <Form>
                        <TextInput
                        useOnlyTextInput
                        name="fullname"
                        type="text"
                        placeholder="Full name"
                        errorClass="signup-form-error"
                        />
                        <TextInput
                        useOnlyTextInput
                        name="email"
                        type="email"
                        placeholder="Your email"
                        errorClass="signup-form-error"
                        />
                        <div className="signup-button">
                            <button type="submit">
                            {/* {creatingAccount ? (
                                <span>
                                    <LoaderSmall unsetMarginTop/>
                                </span>
                            ) : creatingAccountError ? (
                                <>
                                    <RiErrorWarningLine className="signup-button-icon"/>
                                    <span>
                                        Create account
                                    </span>
                                </>
                            ) : (
                                <span>
                                    Create account
                                </span>
                            )} */}
                            Subscribe
                            </button>
                        </div>
                    </Form>
                    </Formik>
                </div>
            </div>
        </div>    
    )
}


function AboutFlingTwoRow() {
    return (
        <div className={ styles.twoRowContainer }>
            <div className={ styles.twoRowChildWrapper }>
                <div className={ styles.twoRowChild }>
                    <div className={ styles.twoRowChildLeft }>
                        <img 
                        src = { shoppingg } 
                        loading="lazy" 
                        alt="Paystack" 
                        className = { styles.doubleRowTopImage }
                        />
                    </div>
                    <div className={ styles.twoRowChildRight }>
                        <div className={ styles.twoRowChildRightHeading }>
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                        </div>
                        <div className={ styles.twoRowChildRightBody }>
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                        </div>
                    </div>
                </div>
            </div>
            <div className={ styles.twoRowChildWrapper }>
                <div className={ styles.twoRowChild }>
                <div className={ styles.twoRowChildRight }>
                        <div className={ styles.twoRowChildRightHeading }>
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                        </div>
                        <div className={ styles.twoRowChildRightBody }>
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                            Aczions automatetes builz a, ters, ander 
                            deployion workifer lorem suim bukhui repetionz.
                        </div>
                    </div>
                    <div className={ styles.twoRowChildLeft }>
                        <img 
                        src = { shoppingg } 
                        loading="lazy" 
                        alt="Paystack" 
                        className = { styles.doubleRowTopImage }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}