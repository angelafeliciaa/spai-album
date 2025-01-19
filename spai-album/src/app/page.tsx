import MasonryGallery from "@/components/masonry";
import '@/styles/globals.css';


export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20">
      <MasonryGallery />
    </div>
  );
}
