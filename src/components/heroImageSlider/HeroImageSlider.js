import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Autoplay} from 'swiper';
import 'swiper/swiper.scss'
import 'swiper/components/effect-fade/effect-fade.scss';
import SliderImageOne from '../../assets/hero-image-slider-three.png'
import SliderImageTwo from '../../assets/hero-image-slider-one.png'
import SliderImageThree from '../../assets/hero-image-slider-two.png'

SwiperCore.use([Autoplay]);

const useStyle = makeStyles((theme) => ({

    root: {
        width: "40%",
        height: "auto"
    },
    image: {
        width: "100%",
        height: "auto"

    }
}))

export default function HeroImageSlider() {

    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Swiper
                autoplay={{delay: "1000"}}
                speed={1200}
                loop={true}
                simulateTouch={false}
                controller={{inverse: false}}
                >
                    <SwiperSlide>
                        <img className={classes.image} src={SliderImageOne} alt="hero slider one" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className={classes.image} src={SliderImageTwo} alt="hero slider two" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className={classes.image} src={SliderImageThree} alt="hero slider three" />
                    </SwiperSlide>
            </Swiper>
        </div>
    )
}
