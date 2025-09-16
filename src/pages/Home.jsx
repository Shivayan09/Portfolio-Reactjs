import React, { useEffect } from 'react'
import StarryBackground from '../components/StarryBackground'
import LaserFlow from '../components/LaserFlow'
import astronaut from '../assets/astronaut.png'
import astronaut2 from '../assets/astronaut2.png'
import astronaut3 from '../assets/astronaut3.png'
import astronaut4 from '../assets/astronaut4.png'
import astronaut5 from '../assets/astronaut5.png'
import astronaut6 from '../assets/astronaut6.png'
import astronaut7 from '../assets/astronaut7.png'
import useIsMobile from '../components/useIsMobile'
import { motion } from 'framer-motion';
import rocket2 from '../assets/rocket2.png'
import StarryCluster from '../components/StarryCluster'
import ScrollReveal from '../components/ScrollReveal'
import LocomotiveScroll from 'locomotive-scroll'
import AnimatedText from '../components/AnimatedText'
import Navbar from '../components/Navbar'
import CountUp from '../components/CountUp'

const Home = () => {
    const isMobile = useIsMobile();

    return (
        <div>
            <div>
                <Navbar/>
                <p className='text-white text-center text-[2rem] md:text-[5rem] font-bold uppercase -mb-3 md:-mb-10 lg:-mb-15 mt-10 md:mt-0'>Welcome to my</p>
                <p
                    className="text-transparent text-[4rem] md:text-[8rem] lg:text-[11rem] font-bold uppercase text-center tracking-widest relative -z-50"
                    style={{ WebkitTextStroke: "2px white" }}
                >
                    universe
                </p>
            </div>
            <div className='about relative flex flex-col'>
                <motion.img
                    src={astronaut3}
                    alt=""
                    className='object-cover scale-65 md:mt-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-50'
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <div className='flex flex-col md:flex-row'>
                    <div className="box w-[100%] md:w-[40%] relative text-white flex items-center justify-center">
                        <motion.div className='absolute z-0 md:bottom-26 lg:bottom-18 md:right-10 lg:right-16 h-full md:h-[40%] w-[70%] bg-black border-r-1 border-b-1 rounded-xl border-white'
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}>

                        </motion.div>
                        <motion.div className='relative z-20 border border-white h-full md:h-[40%] w-[70%] bg-black rounded-xl flex items-center justify-center'
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <p className='text-[2.1rem] text-white font-bold'>
                                Who am I ?
                            </p>
                        </motion.div>
                    </div>
                    <div className="box w-[100%] md:w-[60%] flex items-center justify-center p-10 text-white text-center md:text-left">
                        {!isMobile ?
                            <p className='text-[1.2rem] leading-10 [word-spacing:0.1rem] text-white/80 font-semibold'>
                                I'm Shivayan, a code astronaut exploring the universe of algorithms, 3D visuals, and web magic. I build apps that orbit creativity and efficiency, push pixels like rocket fuel, and tackle challenges at warp speed. When I'm not coding or animating, I'm launching ideas, stacking stars in 3D scenes, and making the digital cosmos a little more extraordinary.
                            </p>
                            :
                            <p className='text-[1.2rem] leading-10 [word-spacing:0.1rem] text-white/80 font-semibold'>
                                I'm Shivayan, a code astronaut exploring the universe of algorithms, 3D visuals, and web magic. I build apps that orbit creativity and efficiency, push pixels like rocket fuel, and tackle challenges at warp speed. When I'm not coding or animating, I'm launching ideas, stacking stars in 3D scenes, and making the digital cosmos a little more extraordinary.
                            </p>
                        }
                    </div>
                </div>
                <div className='flex flex-col items-center justify-evenly md:flex-row py-5 gap-5 md:gap-0'>
                    <motion.div className="box w-[90%] md:w-[27%] border border-white/20 rounded-2xl bg-white/5 text-white"
                        animate={{ y: [0, -1, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}>
                        <div className='flex gap-1 my-3 items-center justify-center text-white text-[1.5rem] font-bold'>
                            <CountUp
                                from={0}
                                to={20}
                                separator=","
                                direction="up"
                                duration={3}
                                className="count-up-text"
                            />
                            <p>+</p>
                        </div>
                        <p className='text-center text-[1.2rem] text-white/80 font-semibold mb-5'>Pending projects</p>
                    </motion.div>
                    <motion.div className="box w-[90%] md:w-[27%] border border-white/20 rounded-2xl bg-white/5 text-white"
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}>
                        <div className='flex gap-1 my-3 items-center justify-center text-white text-[1.5rem] font-bold'>
                            <CountUp
                                from={0}
                                to={50}
                                separator=","
                                direction="up"
                                duration={3}
                                className="count-up-text"
                            />
                            <p>+</p>
                        </div>
                        <p className='text-center text-[1.2rem] text-white/80 font-semibold mb-5'>GitHub Repos</p>
                    </motion.div>
                    <motion.div className="box w-[90%] md:w-[27%] border border-white/20 rounded-2xl bg-white/5 text-white"
                        animate={{ y: [0, -1, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}>
                        <div className='flex gap-1 my-3 items-center justify-center text-white text-[1.5rem] font-bold'>
                            <CountUp
                                from={0}
                                to={100}
                                separator=","
                                direction="up"
                                duration={3}
                                className="count-up-text"
                            />
                            <p>+</p>
                        </div>
                        <p className='text-center text-[1.2rem] text-white/80 font-semibold mb-5'>Doubts and confusions</p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Home
