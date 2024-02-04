import React from "react";
import { motion, useScroll } from "framer-motion";
function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.h1
        animate={{
          scale: [3, 2, 3, 2, 3],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",

          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="text-4xl font-bold capitalize text-white"
      >
        404 not Found
      </motion.h1>
    </div>
  );
}

export default NotFound;
