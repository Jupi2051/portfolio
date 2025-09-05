import { Variants, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
import { Provider } from "react-wrap-balancer";
import SolarSystem from "@/components/apps/about-me/solar-system";
import AppFoundation from "@/components/ui/app-foundation";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
};

const paragraphAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: "30px",
    transition: { duration: 0.8 },
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const ParagraphViewport = {
  amount: 0.3,
};

function AnimatedLettersHeader(props: {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  text: string;
  elementType: "h1" | "h2";
}) {
  const ParentMessageAnimation: Variants = {
    viewed: {
      transition: {
        duration: 1,
        staggerChildren: 0.04,
      },
    },
  };

  const WritingAnimation: Variants = {
    invisible: { opacity: 0 },
    viewed: { opacity: 1, transition: { duration: 0.2 } },
  };

  const nameLetters = props.text.split("");
  const ElementType = props.elementType;

  const ChildrenRender = nameLetters.map((letter, index) => {
    return (
      <motion.span variants={WritingAnimation} key={letter + "-" + index}>
        {letter}
      </motion.span>
    );
  });

  return ElementType === "h1" ? (
    <motion.h1
      className={props.className}
      style={{ ...props.style }}
      variants={ParentMessageAnimation}
      animate="invisible"
      initial="invisible"
      whileInView="viewed"
    >
      {ChildrenRender}
    </motion.h1>
  ) : (
    <motion.h2
      className={props.className}
      style={{ ...props.style }}
      variants={ParentMessageAnimation}
      animate="invisible"
      initial="invisible"
      whileInView="viewed"
    >
      {ChildrenRender}
    </motion.h2>
  );
}

function AboutMe(Props: PropTypes) {
  return (
    <AppFoundation
      AppId={Props.AppId}
      processIcon={Props.processIcon}
      processName={Props.processName}
    >
      <Provider>
        <div className="text-white font-segoe-ui h-full bg-black text-2xs overflow-y-scroll overflow-x-hidden py-12">
          <div className="h-full">
            <div className="flex items-center justify-center gap-4">
              <AnimatedLettersHeader
                text="About Me"
                elementType="h1"
                className="text-5xl text-center"
              />
            </div>

            <SolarSystem />

            <section className="my-28">
              <div className="about-me-heading">
                <AnimatedLettersHeader
                  text="Who am I?"
                  elementType="h2"
                  className="text-4xl"
                />
              </div>
              <div className="relative">
                {/* <motion.p variants={paragraphAnimation} initial="hidden" whileInView="visible" animate="hidden" viewport={{...ParagraphViewport}}>
                                        Hello, You can call me Jupi, I am a software developer with around 5 years of programming expeirence,
                                        I've stepped in so many different fields in programming such as Scripting, Game Development, and Web Development.<br />
                                        Oh and I really like working on big projects.
                                    </motion.p> */}
                <motion.p
                  variants={paragraphAnimation}
                  initial="hidden"
                  whileInView="visible"
                  animate="hidden"
                  viewport={{ ...ParagraphViewport }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cumque consequatur esse hic dolor vero, laborum autem quisquam
                  debitis expedita dicta. Dolores nihil aliquid expedita eius
                  perferendis aspernatur ducimus fugit iste? Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Soluta totam eum
                  reprehenderit voluptatum odio hic fuga, rem sapiente? Fugiat
                  qui ipsa et at vitae sed placeat amet? Vitae, nihil dolorum!
                </motion.p>
              </div>
            </section>

            <section className="about-me-section">
              <div className="about-me-heading">
                <AnimatedLettersHeader
                  text="How it all started?"
                  elementType="h2"
                  className="about-me-mini-header"
                />
              </div>
              <div className="about-me-paragraphs">
                <motion.p
                  variants={paragraphAnimation}
                  initial="hidden"
                  whileInView="visible"
                  animate="hidden"
                  className="relative text-5xl my-8 text-center max-w-7xl mx-auto"
                  viewport={{ ...ParagraphViewport }}
                >
                  Hello, You can call me Jupi, I am a software developer with
                  around 5 years of programming expeirence, I've stepped in so
                  many different fields in programming such as Scripting, Game
                  Development, and Web Development.
                  <br />
                  Oh and I really like working on big projects.
                </motion.p>
                <motion.p
                  variants={paragraphAnimation}
                  initial="hidden"
                  whileInView="visible"
                  animate="hidden"
                  viewport={{ ...ParagraphViewport }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cumque consequatur esse hic dolor vero, laborum autem quisquam
                  debitis expedita dicta. Dolores nihil aliquid expedita eius
                  perferendis aspernatur ducimus fugit iste? Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Soluta totam eum
                  reprehenderit voluptatum odio hic fuga, rem sapiente? Fugiat
                  qui ipsa et at vitae sed placeat amet? Vitae, nihil dolorum!
                </motion.p>
              </div>
            </section>
          </div>
        </div>
      </Provider>
    </AppFoundation>
  );
}

export default AboutMe;
