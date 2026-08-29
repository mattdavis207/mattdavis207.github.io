import { MagneticField } from "@/components/magnetic-field/magnetic-field";
import { BinarySparks } from "@/components/binary-sparks/binary-sparks";

export default function Home() {
  
  return(
    <div className="relative">
      <div className="absolute left-0 top-0 w-100% h-100%">
        <MagneticField/>
      </div>
      
      <BinarySparks/>
    </div>
  )

}
