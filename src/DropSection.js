import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const DropSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });
  const locations = [
    "Bedfordshire",
    "Berkshire",
    "Bristol",
    "Buckinghamshire",
    "Cambridgeshire",
    "Cheshire",
    "Cornwall",
    "Durham",
    "Derbyshire",
    "Devon",
    "Dorset",
    "Essex",
    "Gloucestershire",
    "Hampshire",
    "Herefordshire",
    "Hertfordshire",
    "Huntingdonshire",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "Middlesex",
    "Norfolk",
    "Northamptonshire",
    "Northumberland",
    "Nottinghamshire",
    "Oxfordshire",
    "Shropshire",
    "Somerset",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Sussex",
    "Warwickshire",
    "Wiltshire",
    "Worcestershire",
    "Yorkshire",
  ];

  const handleLocationClick = (location) => {
    console.log(`Selected location: ${location}`);
    // Implement your location selection logic here
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="md:my-6">
        <h2
          className="text-xl font-bold cursor-pointer font-rubik text-center"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
        >
          View local tradespeople in your area
        </h2>
        <div className="">
        {isOpen && (
          <div className="flex flex-wrap">
            {locations.map((location, index) => (
              <div
                key={index}
                className="cursor-pointer p-4 bg-gray-200 rounded shadow hover:bg-gray-300 transition w-[120px] m-3 md:m-6 text-center self-center"
              >
                <span onClick={() => handleLocationClick(location)}>
                  {location}
                </span>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </motion.div>
  );
};

export default DropSection;
