import ScrollView from "../../components/util/ScrollView";
import PhotoViewer from "../../components/util/PhotoViewer";
import { useState, useRef } from 'react'
import PropTypes from 'prop-types';


function About({ clubGallery, stats, learnMore }) {
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
    const galleryRef = useRef(null);

    return (
        <div>
            <p className="text-tertiary text-[14px] font-bold uppercase pt-3">
                About Us
            </p>
            <p className="font-playfair text-primary text-[48px] font-medium leading-[1] py-2">
                The magic of moments, <br /> preserved in pixels.
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <p className="text-primary text-[18px] font-light leading-[1.5] py-4 md:max-w-[60%]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    <br /><br />
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief
                </p>
                <div className="flex flex-col gap-2 text-primary">
                    {stats.map((value, index) => (
                        <div key={index} className="flex gap-2 border-b border-secondary pb-2">
                            <span className="w-[40px] text-right text-xl font-bold">{value.value}</span>
                            <span className="grow font-playfair text-lg font-medium italic">{value.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="mt-10 w-[130px] rounded-[8px] bg-primary px-4 py-2 
                text-[14px] text-complementPrimary 
                transition-all duration-200
                hover:bg-red-400 hover:drop-shadow-xl
                md:mt-3"
                onClick={learnMore}
            >
                Learn More
            </button>
            <div className="flex flex-col gap-4 pt-12">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-tertiary text-[14px] font-bold uppercase pt-3">
                        Club Gallery
                    </p>
                    <ScrollView
                        currentIndex={currentGalleryIndex}
                        setCurrentIndex={setCurrentGalleryIndex}
                        totalImages={clubGallery.length}
                        scrollType="view"
                        containerRef={galleryRef}
                        imageWidth={200}
                        imageGap={16}
                        speed={1.5}
                    />
                </div>
                <div
                    style={{ scrollbarWidth: "none" }}
                    className="overflow-x-auto overflow-y-hidden"
                    ref={galleryRef}
                >
                    <div className="flex flex-row items-start gap-[16px]">
                        {clubGallery.map((image, index) => (
                            <img
                                onClick={() => {
                                    setCurrentPhotoIndex(index);
                                    setIsPhotoViewerOpen(true);
                                }}
                                src={image.image}
                                alt="club-gallery"
                                key={index}
                                className="w-[200px] max-h-[250px] rounded-[8px] object-contain
                                    hover:cursor-pointer hover:drop-shadow-lg transition-all duration-100"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <PhotoViewer
                isOpen={isPhotoViewerOpen}
                onClose={() => setIsPhotoViewerOpen(false)}
                photo={clubGallery[currentPhotoIndex].image}
                caption={clubGallery[currentPhotoIndex].caption + " - " + currentPhotoIndex}
                date={clubGallery[currentPhotoIndex].date}
                itemsInPhoto={clubGallery[currentPhotoIndex].itemsInPhoto}
            />
        </div>
    )
}

About.propTypes = {
    clubGallery: PropTypes.array.isRequired,
    stats: PropTypes.array.isRequired,
    learnMore: PropTypes.func.isRequired,
};

export default About