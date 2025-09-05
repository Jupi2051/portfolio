import AppFoundation from "@/components/ui/app-foundation";
import { useApplicationData } from "@/context/app-context";

function Photos() {
  const { processData } = useApplicationData<{ openedImage: string }>();

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <img
        className="max-w-10/12 max-h-10/12 select-none"
        src={processData.openedImage}
      />
    </div>
  );
}

export default Photos;
