import { VideoPlayer } from "../../components/VideoPlayer";

const Video: React.FC = () => {
    return (
        // <section id="video">

        //     <VideoPlayer src="videos/video.mp4" poster="path/to/poster.jpg" autoPlayOnScroll={true} />

        // </section>

        <section id="video" className="d-flex justify-content-center align-items-center" style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>

            <VideoPlayer
                customerDomain="customer-v8q7z2elb2ftze3o"
                videoId="909e55566b1d73292851d429fa765d0b"
                title="Video explicativo del producto"
            />
        </section>

    );
}

export default Video;