import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const AboutUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <section className="about-us px-4 md:px-32 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="card">
            <div className="image-card">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/pL9Gt3gZ/job.jpg"
                  alt="Request a Quote"
                />
                <a className="text-white bg-yellow-bg absolute top-10 text-sm py-1 px-6 hover:bg-blue-700">
                  Post a job
                </a>
              </div>
              <div className="relative bg-sky-bg p-6">
                <h2 className="text-2xl text-dark font-bold">Post a Job</h2>
                <p className="text-sm my-2">
                  Find local and approved tradespeople to complete your
                  renovations
                </p>
                <br />
                <button className="uppercase text-sm text-yellow flex gap-2 items-center hover:text-blue-700">
                  <a href="/signin">post a job</a> <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="card">
            <div className="image-card">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/wvPQqQnm/trade-signup.jpg"
                  alt="Request a Quote"
                />
                <a className="text-white bg-yellow-bg absolute top-10 text-sm py-1 px-6 hover:bg-blue-700">
                  Trades sign up
                </a>
              </div>
              <div className="relative bg-sky-bg p-6">
                <h2 className="text-2xl text-dark font-bold">Trades sign up</h2>
                <p className="text-sm my-2">
                  Join our community of approved qualified and experienced
                  trades people
                </p>
                <br />
                <button className="uppercase text-sm text-yellow flex gap-2 items-center hover:text-blue-700">
                  <a href="/register">Trades person sign up</a>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card">
            <div className="image-card">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/Wzp08JG3/request-quote.jpg"
                  alt="Request a Quote"
                />
                <a className="text-white bg-yellow-bg absolute top-10 text-sm py-1 px-6 hover:bg-blue-700">
                  Quote calculator
                </a>
              </div>
              <div className="relative bg-sky-bg p-6">
                <h2 className="text-2xl text-dark font-bold">
                  Quote calculator
                </h2>
                <p className="text-sm my-2">
                  Introducing our quote calculator - the perfect tool for
                  simplifying your quoting process! With just a few click.
                </p>
                <button className="uppercase text-sm text-yellow flex gap-2 items-center hover:text-blue-700">
                  Quote calculator <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
