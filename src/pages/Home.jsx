import React, { useEffect } from 'react'
import StarryBackground from '../components/StarryBackground'
import LaserFlow from '../components/LaserFlow'
import astronaut from '../assets/astronaut.png'
import astronaut2 from '../assets/astronaut2.png'
import astronaut3 from '../assets/astronaut3.png'
import useIsMobile from '../components/useIsMobile'
import { motion } from 'framer-motion';
import rocket2 from '../assets/rocket2.png'
import StarryCluster from '../components/StarryCluster'
import ScrollReveal from '../components/ScrollReveal'
import LocomotiveScroll from 'locomotive-scroll'
import AnimatedText from '../components/AnimatedText'
import Navbar from '../components/Navbar'

const Home = () => {
    const isMobile = useIsMobile();

    return (
        <div>
            <div className='h-screen relative flex flex-col items-center justify-center'>
                <Navbar />
                <p className='text-[4rem] md:text-[9rem] absolute z-0 top-25 md:-top-10 font-bold text-white text-center uppercase'>
                    Welcome
                </p>
                <motion.img
                    src={astronaut3}
                    alt=""
                    className='object-cover h-[55%] md:h-[86%] md:mt-auto relative z-10'
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {isMobile && (
                    <motion.div
                        className='absolute bottom-20'
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <button className='border border-white/50 rounded-full text-white px-14 py-1'>
                            Explore
                        </button>
                    </motion.div>
                )}
            </div>

            <div className='about flex flex-col'>
                <div className='flex flex-col md:flex-row'>
                    <div className="box w-[100%] md:w-[40%] relative text-white flex items-center justify-center">
                        <motion.div className='absolute z-0 md:bottom-26 lg:bottom-18 md:right-10 lg:right-15 h-full md:h-[40%] w-[70%] bg-black border-r-1 border-b-1 rounded-xl border-white'
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}>

                        </motion.div>
                        <motion.div className='relative z-20 border border-white h-full md:h-[40%] w-[70%] rounded-xl flex items-center justify-center'
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
                            <AnimatedText>
                                I'm Shivayan, a code astronaut exploring the universe of algorithms, 3D visuals, and web magic. I build apps that orbit creativity and efficiency, push pixels like rocket fuel, and tackle challenges at warp speed. When I'm not coding or animating, I'm launching ideas, stacking stars in 3D scenes, and making the digital cosmos a little more extraordinary.
                            </AnimatedText>
                            :
                            <p className='text-[1.2rem] leading-10 [word-spacing:0.1rem] text-white/80 font-semibold'>
                                I'm Shivayan, a code astronaut exploring the universe of algorithms, 3D visuals, and web magic. I build apps that orbit creativity and efficiency, push pixels like rocket fuel, and tackle challenges at warp speed. When I'm not coding or animating, I'm launching ideas, stacking stars in 3D scenes, and making the digital cosmos a little more extraordinary.
                            </p>
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-evenly md:flex-row border border-white py-5 mb-10'>
                    <div className="box w-[20%] border border-white relative flex items-center justify-center">
                        <div className="box bg-white/80 rounded-xl h-25 w-25 relative z-10">

                        </div>
                        <div className="box bg-black border border-white rounded-xl h-25 w-25 absolute z-0 top-2 left-21">

                        </div>
                    </div>
                    <div className="box w-[20%] border border-white relative flex items-center justify-center">
                        <div className="box bg-white/80 rounded-xl h-25 w-25 relative z-10">

                        </div>
                        <div className="box bg-black border border-white rounded-xl h-25 w-25 absolute z-0 top-2 left-21">

                        </div>
                    </div>
                    <div className="box w-[20%] border border-white relative flex items-center justify-center">
                        <div className="box bg-white/80 rounded-xl h-25 w-25 relative z-10">

                        </div>
                        <div className="box bg-black border border-white rounded-xl h-25 w-25 absolute z-0 top-2 left-21">

                        </div>
                    </div>
                    <div className="box w-[20%] border border-white relative flex items-center justify-center">
                        <div className="box bg-white/80 rounded-xl h-25 w-25 relative z-10">

                        </div>
                        <div className="box bg-black border border-white rounded-xl h-25 w-25 absolute z-0 top-2 left-21">

                        </div>
                    </div>
                    <div className="box w-[20%] border border-white relative flex items-center justify-center">
                        <div className="box bg-white/80 rounded-xl h-25 w-25 relative z-10">

                        </div>
                        <div className="box bg-black border border-white rounded-xl h-25 w-25 absolute z-0 top-2 left-21">

                        </div>
                    </div>
                </div>
            </div>
            <div className='h-screen border border-white'>
            </div>
        </div>
    )
}

export default Home
