import { motion } from "framer-motion";
import AppFoundation, {
  AppFoundationProps,
} from "@/components/ui/app-foundation";

function Photos(Props: AppFoundationProps) {
  const PassedData = Props.processData as any;

  return (
    <AppFoundation {...Props}>
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <img
          className="max-w-10/12 max-h-10/12 select-none"
          src={PassedData.openedImage}
        />
      </div>
    </AppFoundation>
  );
}

export default Photos;
