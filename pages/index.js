import Head from 'next/head'
import Layout from '../components/layout'
import FancyLink from '../components/fancyLink'
import { fade, projectImage, reveal } from "../helpers/transitions"
import { AnimatePresence, motion } from 'framer-motion'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import BlockContent from '@sanity/block-content-to-react'
import ProgressBar from '../components/progress-bar'
import SanityPageService from '../services/SanityPageService'
import { useRef, useState } from 'react'
import ImageWrapper from '../components/image-wrapper'
import Teaser from '../components/teaser'
import Logo from '../components/logo'
import EmailReveal from '../components/emailReveal'
import FadeInWhenInView from '../components/fade-in-when-in-view'
import ConditionalWrap from 'conditional-wrap';

const query = `*[_type == "home"][0]{
	title,
  awards[]{
    awardTitle,
    awardWebsite,
    awardTimesWon
  },
  heroImageMobile {
    asset->{
		  ...
    },
	},
  heroImage {
    asset->{
		  ...
    },
	},
  socialLinks[]{
    socialTitle,
    socialUrl
  },
  biography,
  emailAddress,
  footerBlurb,
  'projects': *[_type == "project"] | order(order, asc) {
    title,
    externalUrl,
    thumbnailImage {
      asset->{
        ...
      },
    },
    hoverImage {
      asset->{
        ...
      },
    },
    indexLetter,
    disciplines,
    slug {
	    current
  	}
  },
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const containerRef = useRef(null)
  const [currentHoveredImage, setCurrentHoveredImage] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [hovering, setHovering] = useState(null);
  
  const setCurrent = (image, position) => {
    setHovering(true)
    setCurrentHoveredImage(image)
    setCurrentPosition(position)
  }

  const unSetCurrent = (image, position) => {
    setHovering(null)
    setCurrentHoveredImage(null)
    setCurrentPosition(null)
  }

  const { data: { title, awards, featuredProjects, projects, biography, emailAddress, socialLinks, heroImage, heroImageMobile, footerBlurb }  } = pageService.getPreviewHook(initialData)()
  return (
    <LocomotiveScrollProvider
      options={{ smooth: true, lerp: 0.1 }}
      containerRef={containerRef}
      watch={[]}
    >
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div variants={fade}>
        <ProgressBar />
      </motion.div>
    </motion.div>

      <div className={`block fixed bottom-0 left-0 w-[80%] md:w-[40%] m-4 overflow-hidden z-[100] pointer-events-none ${currentPosition == 'left' ? 'left-auto right-0 origin-bottom-right' : 'left-0 right-auto origin-bottom-left'} ${hovering == true ? 'opacity-100' : 'opacity-100'}`}>
          { currentHoveredImage !== null && (
            <ImageWrapper
              image={projects[currentHoveredImage].hoverImage} 
              layout="responsive"
              className={`w-full transform ease-in-out transition-all duration-500 ${hovering == true ? 'opacity-100' : 'opacity-0'}`}
              widthOverride={1600}
              priority
            />
          )}
      </div>

    <div data-scroll-container ref={containerRef} id="scroll-container">
      <Layout>
        <Head>
          <title>Interaction, Brand, Art Direction - Isaac Powell</title>
        </Head>

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          id="test"
        >
          
          <Logo/>
          <EmailReveal />

          <div className="relative">
            <motion.div variants={fade} className="md:text-right relative md:pt-16 lg:pt-20 bg-white" data-scroll data-scroll-sticky data-scroll-target="#test">
              <div className="absolute top-0 left-0 md:relative z-10 md:mb-3 pt-2 md:pt-0">
                
                <span className="block text-2xl lg:text-3xl font-sans tracking-tighter leading-tight px-2 md:px-4 mb-8 md:mb-0 overflow-hidden"><motion.span className="block" variants={reveal}>Interaction, Brand, Art Direction</motion.span></span>

                <a className="items-center text-2xl lg:text-3xl font-book tracking-tighter leading-tight px-2 md:px-4 flex md:hidden hover:text-red" href="#">
                  <span className="h-3 w-3 mt-[-3px] bg-red block rounded-full mr-1"></span>
                  <span className="block leading-none overflow-hidden">
                    <motion.span className="block" variants={reveal}>Email</motion.span>
                  </span>
                </a>
              </div>

              <div className="relative pb-20 md:pb-0">
                <ImageWrapper
                  image={heroImageMobile}
                  className="w-full block md:hidden"
                  widthOverride={1200}
                  priority
                />
                <div className="relative overflow-hidden">
                  <div data-scroll data-scroll-speed={2} className="w-full hidden md:block md:mb-3">
                    <ImageWrapper
                      image={heroImage}
                      className="w-full transform scale-[1.1]"
                      widthOverride={2000}
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 md:hidden md:top-0 left-0 w-[90%] md:w-[45%] ml-2 md:ml-4 md:mt-4">
                <div className="md:hidden">
                  <div className="w-[50%] block z-[100] h-auto -mt-32 pointer-events-none">
                    <svg className="logo w-full origin-top-left" viewBox="0 0 712.422 360.72"><path data-name="Path 6" d="M77.655 350.7V0H0v350.7Zm8.517-95.19c20.043 70.641 76.653 105.21 140.781 105.21 96.693 0 146.292-63.627 146.292-160.32V0H295.59v200.4c0 53.607-24.048 82.665-67.635 82.665-35.07 0-58.116-21.543-70.641-61.623Zm499.5-21.042c84.168 0 126.753-56.613 126.753-117.735S669.336 0 585.168 0H396.792v350.7h77.655V234.468Zm-111.225-77.655V77.655h112.224c30.06 0 48.1 18.036 48.1 40.08s-18.036 39.078-48.1 39.078Z" fill="#db4623"/></svg>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Logo/>
                </div>
              </div>
            </motion.div>

            <div className="px-2 md:px-4 pb-12 md:pb-16 lg:pb-20 bg-white z-50 relative md:pt-4 overflow-hidden">

              {/* <div className="flex justify-end">
                <a className="items-center justify-end text-2xl lg:text-3xl font-book tracking-tighter leading-tight hidden md:inline-block hover:text-red ml-auto" href="mailto:hello@shiftwalk.studio">
                  <span className="flex flex-wrap items-center">
                    <span className="md:h-3 lg:h-4 md:w-3 lg:w-4 md:mt-[-3px] lg:mt-[-4px] bg-red block rounded-full mr-1"></span>
                    <span className="block leading-none overflow-hidden">
                      <motion.span className="block" variants={reveal}>Email</motion.span>
                    </span>
                  </span>
                </a>
              </div> */}


              <motion.div variants={fade} className="flex flex-wrap border-b items-end border-black mb-8 md:mb-10 lg:mb-16 pb-1 md:pb-0">
                <div className="w-1/2 md:w-1/4">
                  <span className="block uppercase tracking-tight text-xs md:text-base font-serif italic overflow-hidden">
                  <FadeInWhenInView><motion.span variants={reveal} className="block">(1)</motion.span></FadeInWhenInView></span>
                  <span className="block uppercase tracking-tight text-xs md:text-base lg:text-xl font-serif overflow-hidden">
                    <FadeInWhenInView>
                      <motion.span variants={reveal} className="block">Selected Works</motion.span>
                    </FadeInWhenInView>
                  </span>
                </div>

                <span className="hidden md:block w-1/4 uppercase tracking-tight text-xs md:text-base lg:text-xl font-serif overflow-hidden">
                <FadeInWhenInView><motion.span variants={reveal} className="block">2016—{new Date().getFullYear().toString().substr(-2)}</motion.span></FadeInWhenInView></span>

                <span className="block flex-1 text-right uppercase tracking-tight text-xs md:text-base lg:text-xl font-serif overflow-hidden">
                <FadeInWhenInView><motion.span variants={reveal} className="block">52.9548° N, 1.1581° W</motion.span></FadeInWhenInView></span>
              </motion.div>

              
              <motion.div variants={fade} className="pb-8 md:pb-12 lg:mb-0">
              <div className="">
                
                {/* LAYER 1 */}
                <div className={`flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16`}>
                  <ConditionalWrap
                    condition={!!projects[0].externalUrl}
                    wrap={children => (
                      <a 
                        className={`w-9/12 md:w-full md:col-span-1 mb-8 md:mb-12 xl:mb-16 block`}
                        href={projects[0].externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-scroll-speed={-0.8}
                        onMouseEnter={() => setCurrent(0, 'left')}
                        onMouseLeave={unSetCurrent}
                      >
                        {children}
                      </a>
                    )}
                  >
                    <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 0 || currentHoveredImage !== null && 'opacity-down'}`}>
                    {/* 0 */}
                      <Teaser
                        imageSrc={projects[0].thumbnailImage ? projects[0].thumbnailImage : null}
                        imageWidth={900}
                        title={projects[0].title}
                        disciplines={projects[0].disciplines}
                        inverse
                      />
                    </div>
                  </ConditionalWrap>


                  {currentHoveredImage !== 0 ? (
                    <button onClick={() => setCurrent(0, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                  ) : (
                    <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                  )}

                  <div className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-4 xl:col-start-5 mb-8 md:mb-12 xl:mb-1">
                    <ConditionalWrap
                      condition={!!projects[1].externalUrl}
                      wrap={children => (
                        <div 
                          className={`w-full md:col-span-1 block`}
                          // href={projects[1].externalUrl}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          onMouseEnter={() => setCurrent(1, 'right')}
                          onMouseLeave={unSetCurrent}
                        >
                          {children}
                        </div>
                      )}
                    >
                      <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 1 || currentHoveredImage !== null && 'opacity-down'}`}>
                        <Teaser
                          imageSrc={projects[1].thumbnailImage ? projects[1].thumbnailImage : null}
                          imageWidth={900}
                          imageHeight={projects[1].thumbnailImage.asset.metadata.dimensions.height / 2}
                          title={projects[1].title}
                          disciplines={projects[1].disciplines}
                        />
                      </div>
                    </ConditionalWrap>

                    {currentHoveredImage !== 1 ? (
                      <button onClick={() => setCurrent(1, 'left')} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Hide Work</button>
                    )}
                  </div>
                </div>

                
                {/* LAYER 2 */}
                <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <ConditionalWrap
                    condition={!!projects[2].externalUrl}
                    wrap={children => (
                      <a 
                        className={`w-9/12 md:w-full md:col-span-1 md:col-start-2 xl:col-start-3 mb-8 md:mb-12 xl:mb-16`}
                        href={projects[2].externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCurrent(2, 'right')}
                        onMouseLeave={unSetCurrent}
                        data-scroll-speed={1}
                      >
                        {children}
                      </a>
                    )}
                  >
                    <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 2 || currentHoveredImage !== null && 'opacity-down'}`}>
                      <Teaser
                        imageSrc={projects[2].thumbnailImage ? projects[2].thumbnailImage : null}
                        imageWidth={900}
                        imageHeight={projects[2].thumbnailImage.asset.metadata.dimensions.height / 2}
                        title={projects[2].title}
                        disciplines={projects[2].disciplines}
                        inverse
                      />
                    </div>
                  </ConditionalWrap>

                  {currentHoveredImage !== 2 ? (
                    <button onClick={() => setCurrent(2, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                  ) : (
                    <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                  )}

                  <div className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-3 xl:col-start-4 mb-8 md:mb-12 xl:mb-1 inline-block">
                    <div className="w-full block" data-scroll data-scroll-speed={0.5} onMouseEnter={() => setCurrent(3, 'right')}
                    onMouseLeave={unSetCurrent}>
                      <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 3 || currentHoveredImage !== null && 'opacity-down'}`}>
                        <Teaser
                          imageSrc={projects[3].thumbnailImage ? projects[3].thumbnailImage : null}
                          imageWidth={900}
                          imageHeight={projects[3].thumbnailImage.asset.metadata.dimensions.height / 2}
                          title={projects[3].title}
                          disciplines={projects[3].disciplines}
                          negative
                        />
                      </div>
                    </div>

                    {currentHoveredImage !== 3 ? (
                      <button onClick={() => setCurrent(3, 'left')} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Hide Work</button>
                    )}
                  </div>
                </div>

                {/* LAYER 3 */}
                <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <ConditionalWrap
                    condition={!!projects[4].externalUrl}
                    wrap={children => (
                      <a 
                        className={`w-9/12 md:w-full md:col-span-1 md:col-start-2 xl:col-start-2 mb-8 md:mb-12 xl:mb-16`}
                        href={projects[4].externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCurrent(4, 'left')}
                        onMouseLeave={unSetCurrent}
                        data-scroll data-scroll-speed={0.7}
                      >
                        {children}
                      </a>
                    )}
                  >
                    <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 4 || currentHoveredImage !== null && 'opacity-down'}`}>
                      <Teaser
                        imageSrc={projects[4].thumbnailImage ? projects[4].thumbnailImage : null}
                        imageWidth={900}
                        imageHeight={projects[4].thumbnailImage.asset.metadata.dimensions.height / 2}
                        title={projects[4].title}
                        disciplines={projects[4].disciplines}
                        inverse
                      />
                    </div>
                  </ConditionalWrap>

                  {currentHoveredImage !== 4 ? (
                    <button onClick={() => setCurrent(4, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                  ) : (
                    <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                  )}
                  
                  <div className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-4 xl:col-start-5 mb-8 md:mb-12 xl:mb-1">
                      <ConditionalWrap
                        condition={!!projects[4].externalUrl}
                        wrap={children => (
                          <a 
                            className={`block w-full`}
                            href={projects[5].externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCurrent(5, 'right')}
                            onMouseLeave={unSetCurrent}
                            data-scroll data-scroll-speed={0.7}
                          >
                            {children}
                          </a>
                        )}
                      >
                      <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 5 || currentHoveredImage !== null && 'opacity-down'}`}>
                        <Teaser
                          imageSrc={projects[5].thumbnailImage ? projects[5].thumbnailImage : null}
                          imageWidth={900}
                          imageHeight={projects[5].thumbnailImage.asset.metadata.dimensions.height / 2}
                          title={projects[5].title}
                          disciplines={projects[5].disciplines}
                          negative
                        />
                      </div>
                    </ConditionalWrap>

                    {currentHoveredImage !== 5 ? (
                      <button onClick={() => setCurrent(5, 'left')} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Hide Work</button>
                    )}
                  </div>
                </div>

                {/* LAYER 4 */}
                <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <ConditionalWrap
                    condition={!!projects[6].externalUrl}
                    wrap={children => (
                      <a 
                        className={`w-9/12 md:w-full md:col-span-1 md:col-start-1 xl:col-start-1 mb-8 md:mb-12 xl:mb-16 block`}
                        href={projects[6].externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-scroll data-scroll-speed={1.2}
                        
                      >
                        {children}
                      </a>
                    )}
                  >
                    <div onMouseEnter={() => setCurrent(6, 'left')}
                        onMouseLeave={unSetCurrent} className={`ease-in-out duration-[375ms] transition-all w-9/12 md:w-full mb-8 md:mb-0 ${currentHoveredImage == 6 || currentHoveredImage !== null && 'opacity-down'}`}>
                      <Teaser
                        imageSrc={projects[6].thumbnailImage ? projects[6].thumbnailImage : null}
                        imageWidth={900}
                        imageHeight={projects[6].thumbnailImage.asset.metadata.dimensions.height / 2}
                        title={projects[6].title}
                        disciplines={projects[6].disciplines}
                        inverse
                      />
                    </div>
                  </ConditionalWrap>

                  {currentHoveredImage !== 6 ? (
                    <button onClick={() => setCurrent(6, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                  ) : (
                    <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                  )}

                  <div className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-2 xl:col-start-3 mb-8 md:mb-12 xl:mb-1">

                    <ConditionalWrap
                      condition={!!projects[7].externalUrl}
                      wrap={children => (
                        <a 
                          className={`w-full md:w-full md:col-span-1 md:col-start-1 xl:col-start-1 mb-8 md:mb-12 xl:mb-16`}
                          href={projects[7].externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-scroll data-scroll-speed={0.6}
                          onMouseEnter={() => setCurrent(7, 'right')}
                          onMouseLeave={unSetCurrent}
                          
                        >
                          {children}
                        </a>
                      )}
                    >
                      <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 7 || currentHoveredImage !== null && 'opacity-down'}`}>
                        <Teaser
                          imageSrc={projects[7].thumbnailImage ? projects[7].thumbnailImage : null}
                          imageWidth={900}
                          imageHeight={projects[7].thumbnailImage.asset.metadata.dimensions.height / 2}
                          title={projects[7].title}
                          disciplines={projects[7].disciplines}
                          negative
                        />
                      </div>
                    </ConditionalWrap>

                    {currentHoveredImage !== 7 ? (
                      <button onClick={() => setCurrent(7, 'left')} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Hide Work</button>
                    )}
                  </div>
                </div>

                {/* LAYER 5 */}
                <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <div className="w-9/12 md:w-full md:col-span-1 md:col-start-3 xl:col-start-4 mb-8 md:mb-12 xl:mb-16" data-scroll data-scroll-speed={0.8} onMouseEnter={() => setCurrent(8, 'right')}
                  onMouseLeave={unSetCurrent}>
                    <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 8 || currentHoveredImage !== null && 'opacity-down'}`}>
                    <Teaser
                      imageSrc={projects[8].thumbnailImage ? projects[8].thumbnailImage : null}
                      imageWidth={900}
                      imageHeight={projects[8].thumbnailImage.asset.metadata.dimensions.height / 2}
                      title={projects[8].title}
                      disciplines={projects[8].disciplines}
                      inverse
                    />
                    </div>
                  </div>
                  {currentHoveredImage !== 8 ? (
                    <button onClick={() => setCurrent(8, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                  ) : (
                    <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                  )}
                </div>

                {/* LAYER 6 */}
                <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <div className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-1 xl:col-start-2 mb-8 md:mb-12 xl:mb-16" data-scroll data-scroll-speed={0.2} onMouseEnter={() => setCurrent(9, 'left')}
                  onMouseLeave={unSetCurrent}>
                    <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 9 || currentHoveredImage !== null && 'opacity-down'}`}>
                    <Teaser
                      imageSrc={projects[9].thumbnailImage ? projects[9].thumbnailImage : null}
                      imageWidth={900}
                      imageHeight={projects[9].thumbnailImage.asset.metadata.dimensions.height / 2}
                      title={projects[9].title}
                      disciplines={projects[9].disciplines}
                    />
                    </div>
                    
                    {currentHoveredImage !== 9 ? (
                      <button onClick={() => setCurrent(9, 'left')} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-4 focus:border-none focus:outline-none mt-3 ml-3">Hide Work</button>
                    )}
                  </div>

                  <div className="w-9/12 md:w-full md:col-span-1 md:col-start-4 xl:col-start-5 mb-8 md:mb-12 xl:mb-1">
                    <ConditionalWrap
                      condition={!!projects[10].externalUrl}
                      wrap={children => (
                        <a 
                          className={`block w-full`}
                          href={projects[10].externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-scroll data-scroll-speed={1.2}
                          onMouseEnter={() => setCurrent(10, 'right')}
                          onMouseLeave={unSetCurrent}
                          
                        >
                          {children}
                        </a>
                      )}
                    >
                      {/* 10 */}
                      <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 10 || currentHoveredImage !== null && 'opacity-down'}`}>
                        <Teaser
                          imageSrc={projects[10].thumbnailImage ? projects[10].thumbnailImage : null}
                          imageWidth={900}
                          imageHeight={projects[10].thumbnailImage.asset.metadata.dimensions.height / 2}
                          title={projects[10].title}
                          disciplines={projects[10].disciplines}
                          inverse
                          negative
                        />
                      </div>
                    </ConditionalWrap>
                  </div>
                  {currentHoveredImage !== 10 ? (
                      <button onClick={() => setCurrent(10, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                    )}
                </div>

                {/* LAYER 7 */}
                <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <div 
                    // href={projects[11].externalUrl}
                    // target="_blank"
                    // rel="noopener noreferrer"
                    className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-1 xl:col-start-1 mb-8 md:mb-12 xl:mb-16 block" data-scroll data-scroll-speed={0.7} onMouseEnter={() => setCurrent(11, 'left')}
                    onMouseLeave={unSetCurrent}                        
                  >
                    <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 11 || currentHoveredImage !== null && 'opacity-down'}`}>
                      <Teaser
                        imageSrc={projects[11].thumbnailImage ? projects[11].thumbnailImage : null}
                        imageWidth={900}
                        imageHeight={projects[11].thumbnailImage.asset.metadata.dimensions.height / 2}
                        title={projects[11].title}
                        disciplines={projects[11].disciplines}
                        negative
                      />
                    </div>
                  </div>

                  {currentHoveredImage !== 11 ? (
                    <button onClick={() => setCurrent(11, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3 ml-[27.5%]">Preview Work</button>
                  ) : (
                    <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3 ml-[27.5%]">Hide Work</button>
                  )}

                  <div className="w-9/12 md:w-full md:col-span-1 md:col-start-3 xl:col-start-4 mb-8 md:mb-12 xl:mb-1">

                    <ConditionalWrap
                      condition={!!projects[12].externalUrl}
                      wrap={children => (
                        <a 
                          href={projects[12].externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9/12 md:w-full md:col-span-1 md:col-start-3 xl:col-start-4 mb-8 md:mb-12 xl:mb-1" data-scroll data-scroll-speed={0.9} onMouseEnter={() => setCurrent(12, 'right')}
                          onMouseLeave={unSetCurrent}                        
                        >
                          {children}
                        </a>
                      )}
                    >
                      {/* 12 */}
                      <div className={`ease-in-out duration-[375ms] transition-all ${currentHoveredImage == 12 || currentHoveredImage !== null && 'opacity-down'}`}>
                        <Teaser
                          imageSrc={projects[12].thumbnailImage ? projects[12].thumbnailImage : null}
                          imageWidth={900}
                          imageHeight={projects[12].thumbnailImage.asset.metadata.dimensions.height / 2}
                          title={projects[12].title}
                          disciplines={projects[12].disciplines}
                          inverse
                          negative
                        />
                      </div>
                    </ConditionalWrap>

                  </div>                  
                  {currentHoveredImage !== 12 ? (
                      <button onClick={() => setCurrent(12, 'left')} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Preview Work</button>
                    ) : (
                      <button onClick={unSetCurrent} className="block md:hidden w-full text-left mb-8 focus:border-none focus:outline-none -mt-3">Hide Work</button>
                    )}

                  {/* <a hec i */}
                </div>

                {/* LAYER 8 */}
                {/* <div className="flex flex-wrap md:flex-none md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-12 2xl:gap-16">
                  <a href="#" className="w-9/12 ml-auto md:w-full md:col-span-1 md:col-start-3 xl:col-start-4 mb-8 md:mb-12 xl:mb-16" data-scroll data-scroll-speed={1.5} onMouseEnter={() => setCurrent(13, 'right')}
                  onMouseLeave={unSetCurrent}>
                    <Teaser
                      imageSrc={projects[13].thumbnailImage ? projects[13].thumbnailImage : null}
                      imageWidth={projects[13].thumbnailImage.asset.metadata.dimensions.width / 2}
                      imageHeight={projects[13].thumbnailImage.asset.metadata.dimensions.height / 2}
                      title={projects[13].title}
                      disciplines={projects[13].disciplines}
                    />
                  </a>
                </div> */}
              </div>
            </motion.div>










              {/* <motion.div className="flex flex-wrap -mx-2 items-center">
                <div className="hidden md:block w-1/2 px-2">
                  <div className="overflow-hidden relative">
                    <motion.div variants={fade}>
                      <div className={`transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == null ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <img src="/images/ijp@2x.jpg" className="w-full will-change" alt="Change Me!" />
                      </div>

                      <div className={`absolute inset-0 z-100 transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <div className="w-full h-full transform inset-0">
                          <ImageWrapper
                            image={featuredProjects[0].thumbnailImage}
                            className="object-cover object-top absolute inset-0 will-change"
                            fill
                          />
                        </div>
                      </div>

                      <div className={`absolute inset-0 z-100 transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <div className="w-full h-full transform inset-0">
                          <ImageWrapper
                            image={featuredProjects[1].thumbnailImage}
                            className="object-cover object-top absolute inset-0 will-change"
                            fill
                          />
                        </div>
                      </div>

                      <div className={`absolute inset-0 z-100 transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <div className="w-full h-full transform inset-0">
                          <ImageWrapper
                            image={featuredProjects[2].thumbnailImage}
                            className="object-cover object-top absolute inset-0 will-change"
                            fill
                          />
                        </div>
                      </div>

                      <div className={`absolute inset-0 z-100 transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <div className="w-full h-full transform inset-0">
                          <ImageWrapper
                            image={featuredProjects[3].thumbnailImage}
                            className="object-cover object-top absolute inset-0 will-change"
                            fill
                          />
                        </div>
                      </div>

                      <div className={`absolute inset-0 z-100 transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <div className="w-full h-full transform inset-0">
                          <ImageWrapper
                            image={featuredProjects[4].thumbnailImage}
                            className="object-cover object-top absolute inset-0 will-change"
                            fill
                          />
                        </div>
                      </div>

                      <div className={`absolute inset-0 z-100 transition-all ease-in-out duration-[750ms] transform ${ currentHoveredImage == 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-105' }`}>
                        <div className="w-full h-full transform inset-0">
                          <ImageWrapper
                            image={featuredProjects[5].thumbnailImage}
                            className="object-cover object-top absolute inset-0 will-change"
                            fill
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <motion.div variants={fade} className="w-full md:w-1/2 px-2">
                  <nav>
                    <ul className="text-[12vw] md:text-[4.7vw] lg:text-[4.9vw] 2xl:text-[5vw] leading-none tracking-tighter">
                      {featuredProjects.map((item, i) => {
                        return (
                          <li key={i} className="block my-1 pb-0">
                            <div className="overflow-hidden">
                              <motion.div
                                variants={reveal}
                                onMouseOver={() => setCurrentHoveredImage(i)}
                                onMouseOut={() => setCurrentHoveredImage(null)}
                              >
                                <span className={`hover:text-red flex items-start`}>
                                  <span className="block">{item.title}</span>
                                  { item.indexLetter && (<span className="block text-[1.25vw] xl:text-[1.1vw] uppercase ml-1 mt-[0.65vw] tracking-tight font-serif italic">({item.indexLetter})</span>)}
                                </span>
                              </motion.div>
                            </div>
                          </li>
                        )
                      })}
                      <li className="block my-1 pb-0">
                        <div className="overflow-hidden">
                          <motion.div variants={reveal}>
                            <FancyLink 
                              destination={`/projects-index`}
                              label={'All Projects'}
                              a11yText={'All Projects'}
                              index={'A-Z'}
                            />
                          </motion.div>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </motion.div>
              </motion.div> */}
            </div>
          </div>

          <motion.div variants={fade} className="px-2 md:px-4 pb-16 md:pb-24 lg:pb-40 bg-white z-50 relative -mt-2">
            <div className="flex md:hidden flex-wrap border-b items-end border-black mb-3 md:mb-12 lg:mb-16 pb-1 md:pb-0">
              <div className="flex-1">
                <span className="block uppercase tracking-tight text-xs md:text-base font-serif italic overflow-hidden"><motion.span variants={reveal} className="block">(2)</motion.span></span>
                <span className="block uppercase tracking-tight text-xs md:text-base lg:text-xl font-serif overflow-hidden">
                  <motion.span variants={reveal} className="block">Biography</motion.span></span>
              </div>

              <span className="flex-1 uppercase tracking-tight text-xs md:text-base lg:text-xl text-right font-serif overflow-hidden"><motion.span variants={reveal} className="block">2016—{new Date().getFullYear().toString().substr(-2)}</motion.span></span>
            </div>

            <div className="flex flex-wrap">
              <div className="hidden md:block w-1/4">
                <span className="block uppercase tracking-tight text-xs md:text-base font-serif italic overflow-hidden"><FadeInWhenInView><motion.span variants={reveal} className="block">(2)</motion.span></FadeInWhenInView></span>
                <span className="block uppercase tracking-tight text-xs md:text-base lg:text-xl font-serif overflow-hidden"><FadeInWhenInView><motion.span variants={reveal} className="block">Biography</motion.span></FadeInWhenInView></span>
              </div>
              
              {biography && (
                <div className="w-full md:w-1/2 block tracking-tighter font-book leading-tight text-[6.2vw] md:text-[2.9vw] lg:text-[2.6vw] xl:text-[2.45vw] 2xl:text-[2.2vw] 3xl:text-[2vw] indented-text pr-4 md:pr-0 content" data-scroll data-scroll-speed={1.2}>
                  <BlockContent serializers={{ container: ({ children }) => children }} blocks={biography} />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={fade} className="px-2 md:px-4 bg-white z-50 relative -mt-2 pt-8 md:pt-16 xl:pt-24">
            <div className="flex flex-wrap items-end pb-4">
              <div className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1">
                <div className="max-w-sm md:max-w-xs">
                  { footerBlurb && (
                    <p className="text-base md:text-lg tracking-tight font-book leading-tight mb-8 indented-text">{footerBlurb}</p>
                  )}
                  
                  {socialLinks.map((item, i) => {
                    return (
                      <a key={i} href={item.socialUrl} target="_blank" rel="noopener noreferrer" className="underline mb-1 block text-lg md:text-2xl tracking-tight font-serif italic leading-tight hover:text-red overflow-hidden">
                        <FadeInWhenInView delay={( i / 75)}>
                          <motion.span variants={reveal} className="block">
                            {item.socialTitle}
                          </motion.span>
                        </FadeInWhenInView>
                      </a>
                    )
                  })}
                    <a href={`mailto:${emailAddress}`} className="underline block text-lg md:text-2xl tracking-tight font-serif italic leading-tight hover:text-red overflow-hidden">
                      <FadeInWhenInView>
                        <span className="block">Email</span>
                      </FadeInWhenInView>
                    </a>
                </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-2/3 md:ml-auto order-1 md:order-2 mb-16 md:mb-0">
                  <FadeInWhenInView>
                    <div className="w-full h-[1px] border-t border-black"></div>
                  </FadeInWhenInView>
                  <ul className="text-sm md:text-lg tracking-tight font-book leading-none">
                    {awards.map((item, i) => {
                      return (
                        <FadeInWhenInView delay={( i / 75)}>
                          <li key={i} className="mb-0 border-b border-black overflow-hidden">
                            <motion.span variants={reveal} className="flex flex-wrap py-3">
                              <span className="block">{item.awardWebsite}{ item.awardTimesWon && (<>&nbsp;<span className="text-[7px] md:text-2xs align-top">({item.awardTimesWon})</span></>)}</span><span className="block text-right ml-auto font-serif italic">{item.awardTitle}</span>
                            </motion.span>
                          </li>
                        </FadeInWhenInView>
                      )
                    })}
                  </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Layout>
    </div>
    </LocomotiveScrollProvider>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props
  };
}